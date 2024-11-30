import { useEffect, useState } from "react";
import { getRecords } from "../../api/getRecords";

const ResultsListPage = (): JSX.Element => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRecords().then(setData);
  }, []);

  getRecords();

  return (
    <div>
      結果の一覧を見るページ
      {data && data.map(({ point }, idx) => <div key={idx}>{point}</div>)}
    </div>
  );
};

export default ResultsListPage;
