import CurrencyDropdownList from "./currency-dropdown-list";
import CurrencyIcon from "../components/icons/currency.svg";
import { Control, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { IPrice } from "../interfaces/fancy-form";

interface CurrencyCardProps {
    name: "form" | "to";
    currency: IPrice;
    prices: IPrice[];
    setCurrency: React.Dispatch<React.SetStateAction<IPrice | null>>;
    readOnly?: boolean;
    isLoading: boolean;
    control: Control<
        {
            form: string;
            to?: string | undefined;
        },
        any
    >;
}
const CurrencyCard = ({ name, currency, prices, isLoading, setCurrency, control, readOnly = false }: CurrencyCardProps) => {
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = CurrencyIcon;
    };

    return (
        <div className="bg-[#252528] flex flex-col gap-3 rounded-lg p-2">
            <div className="flex gap-3 items-center">
                <img
                    onError={handleImageError}
                    alt="icon"
                    id="icon"
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency.currency}.svg`}
                />
                <span id="currency">{currency.currency}</span>
                <CurrencyDropdownList isLoading={isLoading} selectCurrency={setCurrency} prices={prices} />
            </div>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, name, value } }) => (
                    <NumericFormat
                        readOnly={readOnly}
                        className="bg-[#343434] read-only:cursor-default px-3 h-10 rounded outline-none"
                        value={value}
                        onChange={onChange}
                        allowNegative={false}
                        allowLeadingZeros
                        maxLength={13}
                        name={name}
                        thousandSeparator=","
                    />
                )}
            />
        </div>
    );
};

export default CurrencyCard;
