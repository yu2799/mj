import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useMahjongScore } from "../../utils/useMahjongScore";

const MahjongScoreBoard = (): JSX.Element => {
  const {
    date,
    setDate,
    playerNames,
    rounds,
    results,
    tips,
    handleChipChange,
    handleFourthChipFocus,
    addRound,
    handleNameChange,
    handleBaseScoreChange,
    handleYakitoriChange,
    handleYakumanChange,
    handleFourthPlayerFocus,
    saveData,
  } = useMahjongScore();

  return (
    <Container>
      <TextField
        label="日付"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        style={{ marginBottom: "20px" }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">半荘</TableCell>
            {playerNames.map((name, index) => (
              <TableCell key={index} align="center">
                <TextField
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  variant="standard"
                  inputProps={{ style: { textAlign: "center" } }}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round, roundIndex) => (
            <React.Fragment key={roundIndex}>
              <TableRow>
                <TableCell align="center">{roundIndex + 1}</TableCell>
                {round.baseScores.map((score, playerIndex) => (
                  <TableCell key={playerIndex} align="center">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TextField
                        type="number"
                        value={score}
                        onChange={(e) =>
                          handleBaseScoreChange(
                            roundIndex,
                            playerIndex,
                            e.target.value,
                          )
                        }
                        onFocus={
                          playerIndex === 3
                            ? () => handleFourthPlayerFocus(roundIndex)
                            : undefined
                        }
                        slotProps={{
                          input: {
                            style: { textAlign: "center" },
                          },
                        }}
                        style={{ width: "40%" }}
                      />
                      <Typography variant="body2">00</Typography>
                    </div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={round.yakitoriFlags[playerIndex]}
                          onChange={(e) =>
                            handleYakitoriChange(
                              roundIndex,
                              playerIndex,
                              e.target.checked,
                            )
                          }
                          color="primary"
                        />
                      }
                      label="鳥"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={round.yakumanFlags[playerIndex]}
                          onChange={(e) =>
                            handleYakumanChange(
                              roundIndex,
                              playerIndex,
                              e.target.checked,
                            )
                          }
                          color="secondary"
                        />
                      }
                      label="役"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {round.isComplete && (
                <TableRow>
                  <TableCell align="center">スコア</TableCell>
                  {round.finalScores.map((score, index) => (
                    <TableCell key={index} align="center">
                      <Typography
                        variant="body1"
                        style={{
                          color:
                            score > 0 ? "blue" : score < 0 ? "red" : "black",
                        }}
                      >
                        {score}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </React.Fragment>
          ))}
          <TableRow>
            <TableCell colSpan={5} align="center">
              <Button
                variant="contained"
                onClick={addRound}
                fullWidth
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                半荘を追加
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">チップ</TableCell>
            {tips.map((tip, index) => (
              <TableCell key={index} align="center">
                <TextField
                  type="number"
                  value={tip}
                  onChange={(e) => handleChipChange(index, e.target.value)}
                  onFocus={index === 3 ? handleFourthChipFocus : undefined}
                  slotProps={{
                    htmlInput: {
                      style: { textAlign: "center" },
                    },
                  }}
                  style={{ width: "60px" }}
                />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="center">合計スコア</TableCell>
            {results.map((score, index) => (
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
            <TableCell align="center">ポイント</TableCell>
            {results.map((score, index) => (
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
      <Box display="flex" alignItems="right" justifyContent="right">
        <Button
          variant="contained"
          color="primary"
          onClick={saveData}
          style={{ marginTop: "20px" }}
        >
          保存
        </Button>
      </Box>
    </Container>
  );
};

export default MahjongScoreBoard;
