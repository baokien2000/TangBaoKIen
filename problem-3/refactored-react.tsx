//better move interface and type to an external file
const MBlockchainPriority = new Map<string, number>([
    ["Osmosis", 100],
    ["Ethereum", 50],
    ["Arbitrum", 30],
    ["Zilliqa", 20],
    ["Neo", 20],
]);
type TBlockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: TBlockchain;
}
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = MBlockchainPriority.get(balance.blockchain) ?? -99;
                if (balancePriority > -99 && balance.amount <= 0) return true;
                return false;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = MBlockchainPriority.get(lhs.blockchain) ?? -99;
                const rightPriority = MBlockchainPriority.get(lhs.blockchain) ?? -99;
                return rightPriority - leftPriority;
            });
    }, [balances]);

    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
        const formatted = balance.amount
            .toFixed(3)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            .replace(".", ",");
        const usdValue = prices[balance.currency] * balance.amount;
        return <WalletRow key={`${balance.blockchain}-${index}`} amount={balance.amount} usdValue={usdValue} formattedAmount={formatted} />;
    });

    return <div {...rest}>{rows}</div>;
};

export default WalletPage;
