interface WalletBalance {
    currency: string;
    amount: number;
}
// FormattedWalletBalance should extend WalletBalance
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    // blockchain type should be string
    // can use a map instead of a switch statement
    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case "Osmosis":
                return 100;
            case "Ethereum":
                return 50;
            case "Arbitrum":
                return 30;
            case "Zilliqa":
                return 20;
            case "Neo":
                return 20;
            default:
                return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain); // Get the priority of the blockchain but not used
                if (lhsPriority > -99) {
                    // lhsPriority is not defined
                    if (balance.amount <= 0) {
                        // create too many redundant if statements
                        return true;
                    }
                }
                return false;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain); // blockchain is not defined in WalletBalance
                const rightPriority = getPriority(rhs.blockchain); // blockchain is not defined in WalletBalance
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    // unnecessary else if statement
                    return 1;
                }
            });
    }, [balances, prices]); // prices is not used in the memoized function

    // Redundant mapping, formattedBalances is not used
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed(),
        };
    });

    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        // classes is not defined
        return <WalletRow className={classes.row} key={index} amount={balance.amount} usdValue={usdValue} formattedAmount={balance.formatted} />;
    });

    return <div {...rest}>{rows}</div>;
};
