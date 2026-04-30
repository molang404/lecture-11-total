import type { CoinType } from "./CoinPage.";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FaArrowDown, FaArrowUp, FaBitcoin } from "react-icons/fa";

const ListSection = styled.aside`
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    overflow: hidden;
`;

const ListHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    font-size: 18px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
    display: flex;
    align-items: center;
    gap: 10px;
`;

const LoadingMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: ${props => props.theme.colors.text.disabled};
`;

const CoinUl = styled.ul`
    list-style: none;
    flex: 1;
    overflow-y: auto;  // Y 방향으로 넘치게 될 경우 스크롤바를 통해 표현하겠다
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props => props.theme.colors.divider};
    }
`;

const CoinLi = styled.li<{ $isSelected: boolean }>`
    padding: 15px 20px;
    border-bottom: ${props => props.theme.colors.divider};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-content: center;
    transition: all 0.5s;
    border-left: 4px solid ${props => props.$isSelected ? props.theme.colors.primary : "transparent"};
    background-color: ${props => props.$isSelected ? props.theme.colors.background.default : "transparent"};

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
`;

const CoinNameBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        font-size: 16px;
        color: ${props => props.theme.colors.text.default};
    }

    span {
        font-size: 12px;
        color: ${props => props.theme.colors.text.disabled};
    }
`;

const CoinPriceBox = styled.div<{ $isPositive: boolean }>`
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        font-size: 14px;
        color: ${props => props.theme.colors.text.default};
    }

    span {
        font-size: 12px;
        font-weight: 600;
        color: ${props =>
            props.$isPositive ? props.theme.colors.success : props.theme.colors.error};
    }
`;

type Props = {
    coins: CoinType[];
    loading: boolean;
    selectedCoin: CoinType | null;
    setSelectedCoin: Dispatch<SetStateAction<CoinType | null>>;
};

function CoinList({ coins, loading, selectedCoin, setSelectedCoin }: Props) {
    return (
        <ListSection>
            <ListHeader>
                <FaBitcoin /> Top 50 Coins
            </ListHeader>
            {loading ? (
                <LoadingMessage>데이터를 불러오는 중</LoadingMessage>
            ) : (
                <CoinUl>
                    {coins.map((coin, index) => {
                        // 데이터 가공이 필요해서 바로 컴포넌트로 빼지 않고 함수 몸통으로 함
                        // Number(문자열) -> 모든 숫자, parseInt(문자열) -> 정수에 대해서만 처리 가능, 소수면 버림, parseFloat(문자열) -> 소수까지 처리 가능
                        // Number => 문자열에 문자가 포함 되어있으면 무조건 에러(NaN) / parse => 집어넣는 문자열의 앞부터 문자를 만날 때까지 읽어내고, 숫자만 골라서 변환
                        const percentChange = parseFloat(coin.percent_change_24h);
                        const isPositive = percentChange > 0; // 오늘 하루 +가 났는지

                        return (
                            <CoinLi
                                key={index}
                                $isSelected={selectedCoin?.id === coin.id}
                                onClick={() => {
                                    setSelectedCoin(coin);
                                }}>
                                <CoinNameBox>
                                    <strong>{coin.name}</strong>
                                    <span>{coin.symbol}</span>
                                </CoinNameBox>
                                <CoinPriceBox $isPositive={isPositive}>
                                    <strong>$ {parseFloat(coin.price_usd).toLocaleString()}</strong>
                                    <span>
                                        {isPositive ? <FaArrowUp size={10} /> : <FaArrowDown />}
                                        {percentChange}%
                                    </span>
                                </CoinPriceBox>
                            </CoinLi>
                        );
                    })}
                </CoinUl>
            )}
        </ListSection>
    );
}

export default CoinList;
