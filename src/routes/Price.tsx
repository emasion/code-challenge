import styled from "styled-components";
import {useQuery} from "react-query";
import {fetchCoinTickers} from "../api";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const ListRow = styled.li<{ isBold: boolean }>`
  display: flex;
  justify-content: right;
  font-weight: ${props => props.isBold ? "bold" : "normal"};
  color: ${props => props.isBold ? props.theme.activeColor : props.theme.textColor}
`;

interface PriceProps {
    coinId: string;
}

interface InfoPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Price({coinId}: PriceProps) {
    const {
        isLoading,
        data
    } = useQuery<InfoPriceData>(
        ['tickers', coinId],
        () => fetchCoinTickers(coinId),
        {
            refetchInterval: 10000
        }
    )

    return (
        <div>{isLoading ? "Loading price..." : (
            <>
                <List>
                    <ListRow isBold={true}>Price</ListRow>
                    <ListRow isBold={false}>{data?.quotes.USD.price}</ListRow>
                </List>
                <List>
                    <ListRow isBold={true}>Market Cap</ListRow>
                    <ListRow isBold={false}>{data?.quotes.USD.market_cap}</ListRow>
                </List>
                <List>
                    <ListRow isBold={true}>Volume 24Hours</ListRow>
                    <ListRow isBold={false}>{data?.quotes.USD.volume_24h}</ListRow>
                </List>
            </>
        )}</div>
    )
}

export default Price;