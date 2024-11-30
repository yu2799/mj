import { useParams } from "react-router";
import ScoreBoard from "./ScoreBoard";
import { dummyData } from "../../data/dammyData";
import { GameResult } from "../../types/types";

const ResultDetail = () => {
  const { id } = useParams<{ id: string }>();
  const index = parseInt(id || "0", 10);
  const data: GameResult | undefined = dummyData[index];

  if (!data) {
    return <div>データが見つかりませんでした。</div>;
  }

  return <ScoreBoard data={data} isReadOnly={true} />;
};

export default ResultDetail;
