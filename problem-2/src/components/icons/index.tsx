import React from "react";
interface IconProps {
    className?: string;
}
export const ChervonDoubleDown = ({ className }: IconProps) => {
    return (
        <svg
            className={className}
            height={16}
            width={16}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg>
    );
};

export const SwapVertical = ({ className }: IconProps) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="1.5"
                d="M9.01 20.5l-5.02-5.01M9.01 3.5v17M14.99 3.5l5.02 5.01M14.99 20.5v-17"
            ></path>
        </svg>
    );
};
export const CurrencyChange = ({ className }: IconProps) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
                d="M23 15.97c0 3.87-3.13 7-7 7l1.05-1.75M1 7.97c0-3.87 3.13-7 7-7L6.95 2.72"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6.62 13.07h2.81c.62 0 1.13.56 1.13 1.13 0 .62-.5 1.13-1.13 1.13H6.62v-2.26ZM6.62 15.33h3.22c.71 0 1.29.5 1.29 1.13 0 .62-.58 1.13-1.29 1.13H6.62v-2.26ZM8.42 17.58v1.12M8.42 11.95v1.12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M14.85 15.33c0 3.41-2.76 6.17-6.17 6.17s-6.17-2.76-6.17-6.17 2.76-6.17 6.17-6.17c.16 0 .31.01.48.02 3.03.23 5.45 2.65 5.68 5.68 0 .15.01.3.01.47Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M21.5 8.67c0 3.41-2.76 6.17-6.17 6.17h-.49a6.174 6.174 0 0 0-5.68-5.68v-.49c0-3.41 2.76-6.17 6.17-6.17s6.17 2.76 6.17 6.17Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    );
};
