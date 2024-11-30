import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GameResult } from "../../types/types";
import { calculateMahjongScores } from "../../utils/calculateMahjongScores";
import React from "react";

interface ScoreBoardProps {
  data: GameResult;
}

const ScoreBoard = ({ data }: ScoreBoardProps): JSX.Element => {
  const { date, participant } = data;

  const roundsCount = participant[0].data.length;
  const roundsFinalScores: number[][] = [];

  for (let gameIndex = 0; gameIndex < roundsCount; gameIndex++) {
    const baseScores = participant.map((p) => p.data[gameIndex].soten);
    const yakitoriFlags = participant.map((p) => p.data[gameIndex].yakitori);
    const yakumanFlags = participant.map((p) => p.data[gameIndex].yakuman);

    try {
      const finalScores = calculateMahjongScores(
        baseScores,
        yakitoriFlags,
        yakumanFlags,
      );
      roundsFinalScores.push(finalScores);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
      roundsFinalScores.push([0, 0, 0, 0]);
    }
  }

  const totalScores = [0, 0, 0, 0];
  roundsFinalScores.forEach((scores) => {
    scores.forEach((score, index) => {
      totalScores[index] += score;
    });
  });

  const tips = participant.map((p) => p.tip);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {date}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">半荘</TableCell>
            {participant.map((p, index) => (
              <TableCell key={index} align="center">
                {p.userId}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {participant[0].data.map((_, gameIndex) => (
            <React.Fragment key={gameIndex}>
              <TableRow>
                <TableCell align="center">{gameIndex + 1}</TableCell>
                {participant.map((p, index) => (
                  <TableCell key={index} align="center">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">
                        {p.data[gameIndex].soten}点
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          style={{
                            color: p.data[gameIndex].yakitori ? "red" : "gray",
                          }}
                        >
                          鳥
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color: p.data[gameIndex].yakuman ? "red" : "gray",
                          }}
                        >
                          役
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">スコア</TableCell>
                {roundsFinalScores[gameIndex].map((score, index) => (
                  <TableCell key={index} align="center">
                    <Typography
                      variant="body1"
                      style={{
                        color: score > 0 ? "blue" : score < 0 ? "red" : "black",
                      }}
                    >
                      {score}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </React.Fragment>
          ))}
          <TableRow>
            <TableCell align="center">合計スコア</TableCell>
            {totalScores.map((score, index) => (
              <TableCell key={index} align="center">
                <Typography
                  variant="body1"
                  style={{
                    color: score > 0 ? "blue" : score < 0 ? "red" : "black",
                  }}
                >
                  {score}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="center">チップ</TableCell>
            {tips.map((tip, index) => (
              <TableCell key={index} align="center">
                <Typography
                  variant="body1"
                  style={{
                    color: tip > 0 ? "blue" : tip < 0 ? "red" : "black",
                  }}
                >
                  {tip}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="center">ポイント</TableCell>
            {totalScores.map((score, index) => (
              <TableCell key={index} align="center">
                <Typography
                  variant="body1"
                  style={{
                    color: score > 0 ? "blue" : score < 0 ? "red" : "black",
                  }}
                >
                  {score * 50 + Number(tips[index]) * 100}P
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default ScoreBoard;
