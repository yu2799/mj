import { useEffect, useState } from "react";
import { getRecords } from "../../api/getRecords";

const ResultsListPage = (): JSX.Element => {
  const [, setData] = useState<Array<object>>([]);

  useEffect(() => {
    getRecords().then((res) => setData(res));
  }, []);

  return <div>結果の一覧を見るページ</div>;
};

export default ResultsListPage;
