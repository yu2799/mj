import styles from "./Home.module.scss";
import MahjongScoreBoard from "../MahjongScoreBoard";

export const Home = () => {
  return (
    <div className={styles.title}>
      <MahjongScoreBoard></MahjongScoreBoard>
    </div>
  );
};
