import React from "react";
import { CurrencyChange } from "./icons";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import CurrencyIcon from "../components/icons/currency.svg";
import { IPrice } from "../interfaces/fancy-form";
const CurrencyDropdownList = ({
    prices,
    selectCurrency,
    isLoading,
}: {
    isLoading: boolean;
    prices: IPrice[];
    selectCurrency: (currency: IPrice) => void;
}) => {
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = CurrencyIcon;
    };

    return (
        <Menu>
            <MenuButton disabled={isLoading} className="ml-auto size-5 text-white/70 hover:text-white">
                <CurrencyChange className="size-5" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-fit min-w-[300px] mt-3 custo-scrol-bar !max-h-[200px] origin-top-right rounded border border-white/5 bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                {prices.map((price) => (
                    <div className="" key={price.currency}>
                        <MenuItem>
                            <button
                                onClick={() => selectCurrency(price)}
                                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                            >
                                <img
                                    alt={price.currency}
                                    id="icon"
                                    onError={handleImageError}
                                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${price.currency}.svg`}
                                />
                                <span id="currency">{price.currency}</span>
                                <span id="price" className="ml-auto">
                                    {price.price.toFixed(10)}
                                </span>
                            </button>
                        </MenuItem>
                    </div>
                ))}
            </MenuItems>
        </Menu>
    );
};

export default CurrencyDropdownList;
