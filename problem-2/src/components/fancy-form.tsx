import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CurrencyCard from "./currency-card";
import { SwapVertical } from "./icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { IPrice } from "../interfaces/fancy-form";
import Loading from "./loading";

export const formSchema = z.object({
    form: z.string().min(1, { message: "Enter your currency" }),
    to: z.optional(z.string()),
});
const FancyForm = () => {
    const [fromCurrency, setFromCurrency] = useState<IPrice | null>(null);
    const [toCurrency, setToCurrency] = useState<IPrice | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [prices, setPrices] = useState<IPrice[]>([]);

    const {
        reset,
        watch,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            form: "0",
            to: "0",
        },
    });
    // ============ Watching input value =============
    const amount = watch("form");

    // ============ Fetch token prices =============
    useEffect(() => {
        const fetchTokens = async () => {
            const tokenPrices = await axios.get("https://interview.switcheo.com/prices.json");
            setPrices(tokenPrices.data);
            setFromCurrency(tokenPrices.data[0]);
            setToCurrency(tokenPrices.data[1]);
        };
        fetchTokens();
    }, []);

    const convertCurrency = (amount: string, fromCurrency: IPrice, toCurrency: IPrice) => {
        const formatValue = (amount?.toString()?.replaceAll(",", "") as unknown as number) || 0;
        if (fromCurrency.price && toCurrency.price) {
            setValue("to", ((formatValue * fromCurrency.price) / toCurrency.price).toString());
            return;
        }
        setValue("to", "0");
    };
    const debounceFn = useCallback(debounce(convertCurrency, 200), []);

    useEffect(() => {
        if (!fromCurrency || !toCurrency || amount === "0") return;
        debounceFn(amount, toCurrency, fromCurrency);
    }, [amount, fromCurrency?.currency, toCurrency?.currency]);

    const handleReset = async (value: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        // Settimeout 3s - Fake loading
        setTimeout(() => {
            reset();
            setValue("form", "0");
            setValue("to", "0");
            setIsLoading(false);
            toast.success("Currency Swapped Successfully");
        }, 3000);
    };

    const handleSwapCurrency = () => {
        if (isLoading) return;
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };
    if (!fromCurrency || !toCurrency) return <Loading />;
    return (
        <div className="flex flex-col mx-4  rounded-lg gap-3 bg-[#12141D] text-white p-5 h-fit w-[500px]">
            <h1 className="text-2xl sm:text-4xl text-center mb-3 font-bold">Currency Swap</h1>
            <form onSubmit={handleSubmit((value) => handleReset(value))} className="flex gap-3 flex-col">
                <CurrencyCard
                    readOnly={isLoading}
                    isLoading={isLoading}
                    prices={prices.filter((price) => price.currency !== toCurrency.currency)}
                    setCurrency={setFromCurrency}
                    name="form"
                    control={control}
                    currency={fromCurrency}
                />
                <button disabled={isLoading} type="button" onClick={handleSwapCurrency} className="size-6 mx-auto ">
                    <SwapVertical className="size-6" />
                </button>
                <CurrencyCard
                    readOnly
                    setCurrency={setToCurrency}
                    isLoading={isLoading}
                    prices={prices.filter((price) => price.currency !== fromCurrency.currency)}
                    name="to"
                    control={control}
                    currency={toCurrency}
                />
                <button
                    type="submit"
                    disabled={amount === "0" || isLoading}
                    className="w-full rounded-lg h-10 bg-black/70 disabled:bg-black/50 disabled:hover:bg-black/50 hover:bg-black mt-3"
                >
                    {isLoading ? "SWAPPING..." : "CONFIRM SWAP"}
                </button>
            </form>
        </div>
    );
};

export default FancyForm;
