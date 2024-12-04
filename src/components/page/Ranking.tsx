/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

interface PlayerRanking {
  userId: string;
  totalScore: number | string; // 総スコア
  totalSoten: number | string; // 総素点
  gamesPlayed: number | string; // 総半荘数
  sotenDelta: number | string; // 素点の±
}

const availableNames = [
  "oden",
  "longpuffer",
  "t_taiki",
  "maru",
  "kawrbe",
  "tago",
  "kanekyo",
];

export const Ranking = () => {
  const [ranking, setRanking] = useState<PlayerRanking[]>([]);

  useEffect(() => {
    // ローカルストレージから保存されたデータを取得
    const existingData = localStorage.getItem("mahjongResults");
    const mahjongResults = existingData ? JSON.parse(existingData) : [];

    // 各プレイヤーのデータを計算
    const scoresMap: {
      [key: string]: {
        totalScore: number;
        totalSoten: number;
        gamesPlayed: number;
      };
    } = {};
    mahjongResults.forEach((game: any) => {
      game.participant.forEach((player: any) => {
        if (!player.userId) return; // 名前が空のプレイヤーは除外

        if (!scoresMap[player.userId]) {
          scoresMap[player.userId] = {
            totalScore: 0,
            totalSoten: 0,
            gamesPlayed: 0,
          };
        }

        scoresMap[player.userId].totalScore += player.totalScore;
        scoresMap[player.userId].gamesPlayed += player.data.length;

        player.data.forEach((round: any) => {
          scoresMap[player.userId].totalSoten += round.soten; // 素点を加算
        });
      });
    });

    // 配列形式に変換して素点の±を計算
    const rankingData = availableNames.map((userId) => {
      if (scoresMap[userId]) {
        const stats = scoresMap[userId];
        const sotenDelta = stats.totalSoten - 25000 * stats.gamesPlayed;
        return {
          userId,
          totalScore: stats.totalScore,
          totalSoten: stats.totalSoten,
          gamesPlayed: stats.gamesPlayed,
          sotenDelta,
        };
      } else {
        // データが存在しない場合
        return {
          userId,
          totalScore: "-",
          totalSoten: "-",
          gamesPlayed: "-",
          sotenDelta: "-",
        };
      }
    });

    // 総スコアでソート
    rankingData.sort((a, b) => {
      if (a.totalScore === "-" && b.totalScore === "-") return 0;
      if (a.totalScore === "-") return 1;
      if (b.totalScore === "-") return -1;
      const totalScoreA = typeof a.totalScore === "number" ? a.totalScore : 0;
      const totalScoreB = typeof b.totalScore === "number" ? b.totalScore : 0;
      return totalScoreB - totalScoreA;
    });

    setRanking(rankingData);
  }, []);

  return (
    <Box
      sx={{
        paddingBottom: "56px",
        overflow: "hidden",
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom sx={{marginTop:"20px"}}>
          ランキング
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">順位</TableCell>
                <TableCell align="center">プレイヤー</TableCell>
                <TableCell align="center">総スコア</TableCell>
                <TableCell align="center">素点</TableCell>
                <TableCell align="center">ゲーム数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranking.map((player, index) => (
                <TableRow key={player.userId}>
                  <TableCell align="center">
                    {player.totalScore === "-"
                      ? availableNames.length
                      : index + 1}
                  </TableCell>
                  <TableCell align="center">{player.userId}</TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color:
                        player.totalScore === "-"
                          ? "black"
                          : typeof player.totalScore === "number" &&
                              player.totalScore > 0
                            ? "blue"
                            : "red",
                    }}
                  >
                    {player.totalScore}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color:
                        player.totalScore === "-"
                          ? "black"
                          : typeof player.sotenDelta === "number" &&
                              player.sotenDelta > 0
                            ? "blue"
                            : "red",
                    }}
                  >
                    {player.sotenDelta}
                  </TableCell>

                  <TableCell align="center">{player.gamesPlayed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};
