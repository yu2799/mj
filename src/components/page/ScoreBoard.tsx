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

interface MahjongScoreBoardProps {
  data: GameResult;
  isReadOnly?: boolean;
}

const MahjongScoreBoard = ({
  data
}: MahjongScoreBoardProps): JSX.Element => {
  const { date, participant } = data;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        麻雀スコア結果
      </Typography>

      <Typography variant="h6" gutterBottom>
        日付: {date}
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
            <TableRow key={gameIndex}>
              <TableCell align="center">{gameIndex + 1}</TableCell>
              {participant.map((p, index) => (
                <TableCell key={index} align="center">
                  <div>
                    <Typography variant="body1">
                      素点: {p.data[gameIndex].soten}
                    </Typography>
                    <Typography variant="body2">
                      焼き鳥: {p.data[gameIndex].yakitori ? "あり" : "なし"}
                    </Typography>
                    <Typography variant="body2">
                      役満: {p.data[gameIndex].yakuman ? "あり" : "なし"}
                    </Typography>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* チップの表示 */}
          <TableRow>
            <TableCell align="center">チップ</TableCell>
            {participant.map((p, index) => (
              <TableCell key={index} align="center">
                {p.tip}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default MahjongScoreBoard;
