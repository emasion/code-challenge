import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexCharts from "react-apexcharts";
import {isDarkAtom} from "../atoms";
import {useRecoilValue} from "recoil";

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId}: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <div>{isLoading ? "Loading chart..." : (
            <ApexCharts
                type="candlestick"
                options={{
                    chart: {
                        width: 500,
                        height: 500,
                        toolbar: {
                            show: false
                        },
                        background: "transparent"
                    },
                    grid: {
                      show: true
                    },
                    stroke: {
                        width: 1
                    },
                    xaxis: {
                        type: 'datetime',
                        axisTicks: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        labels: {
                            show: true
                        }
                    },
                    yaxis: {
                        tooltip: {
                            enabled: true
                        },
                        labels: {
                            show: false
                        }
                    },
                    theme: {
                        mode: isDark? "dark" : "light"
                    },
                    tooltip: {
                        x: {
                            format: 'yyyy-MM-dd HH:mm'
                        }
                    }
                }}
                series={[{
                    data: data?.map(price => {
                        return {
                            x: new Date(price.time_close),
                            y: [
                                price.open.toFixed(3),
                                price.high.toFixed(3),
                                price.low.toFixed(3),
                                price.close.toFixed(3)
                            ]
                        }
                    })
                }]}/>
        )}</div>
    )
}

export default Chart;