import { useParams } from "react-router";
import ScoreBoard from "./ScoreBoard";
import { GameResult } from "../../types/types";

const ResultDetail = () => {
  const { id } = useParams<{ id: string }>();
  const existingData = localStorage.getItem("mahjongResults");
  const mahjongResults: GameResult[] = existingData
    ? JSON.parse(existingData)
    : [];
  const data: GameResult | undefined = mahjongResults.find(
    (item) => item.id === Number(id),
  );

  if (!data) {
    return <div>データが見つかりませんでした。</div>;
  }

  return <ScoreBoard data={data} />;
};

export default ResultDetail;
