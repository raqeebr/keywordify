import { KeywordIdea } from "@/types/api";
import { CategoryScale, ChartData, Chart as ChartJS, ChartOptions, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Props = {
    keywordSuggestions: KeywordIdea[] | undefined
}

const KeywordsGraph = ({ keywordSuggestions }: Props): React.ReactElement => {
    const avgMonthlySales = getChartData("Avg. Monthly Searches", "avgMonthlySearches", keywordSuggestions);
    const competitionIndexes = getChartData("Competition Level", "competiitionIndex", keywordSuggestions);
    const minBids = getChartData("Min. Bid", "minBid", keywordSuggestions);
    const maxBids = getChartData("Max. Bid", "maxBid", keywordSuggestions);

    return <article style={{ background: "#F0F0F0" }}>
        <table role="grid">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Text</th>
                    <th scope="col">Competition</th>
                    <th scope="col">Competition Index</th>
                    {/* <th scope="col">Avg. CPC</th> */}
                    <th scope="col">Avg. Monthly Searches</th>
                    <th scope="col">Min Bid</th>
                    <th scope="col">Max Bid</th>
                    {/* <th scope="col">Related Concepts</th> */}
                </tr>
            </thead>
            <tbody>
                {keywordSuggestions?.map((k, i) => (
                    <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{k.text}</td>
                        <td>{k.competition}</td>
                        <td>{k.competiitionIndex}</td>
                        {/* <td>{k.avgCPCMicros}</td> */}
                        <td>{k.avgMonthlySearches}</td>
                        <td>{k.minBid}</td>
                        <td>{k.maxBid}</td>
                        {/* <td>{k.relatedConcepts?.join(", ")}</td> */}
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="grid">
            <div>
                <Line options={avgMonthlySales.options} data={avgMonthlySales.data} />
                <Line options={minBids.options} data={minBids.data} />
            </div>
            <div>
                <Line options={competitionIndexes.options} data={competitionIndexes.data} />
                <Line options={maxBids.options} data={maxBids.data} />
            </div>
        </div>
    </article>;
};

function getChartData<TKey extends keyof KeywordIdea>(
    label: string,
    prop: TKey,
    keywordSuggestions: KeywordIdea[] | undefined
): { options: ChartOptions<"line">, data: ChartData<"line"> } {
    const bgColor = randomRGB();
    return {
        options: getChartOptions(label),
        data: {
            labels: keywordSuggestions?.map(k => k.text),
            datasets: [{
                label: label,
                data: keywordSuggestions?.map(k => k[prop]),
                backgroundColor: bgColor,
            }]
        } as ChartData<"line">
    };
}

function getChartOptions(label: string): ChartOptions<"line"> {
    return {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: label,
            },
        }
    } as ChartOptions<"line">;
}

const randomNum = (): number => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = (): string => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

export default KeywordsGraph;