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
} from "@mui/material";
import { useMahjongScore } from "../../utils/useMahjongScore";

const MahjongScoreBoard = (): JSX.Element => {
  const {
    playerNames,
    rounds,
    results,
    addRound,
    handleNameChange,
    handleBaseScoreChange,
    handleYakitoriChange,
    handleYakumanChange,
    handleFourthPlayerFocus,
  } = useMahjongScore();

  return (
    <Container>
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
                        inputProps={{
                          maxLength: 3,
                          style: { textAlign: "center" },
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
                      label="焼き鳥"
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
                      label="役満"
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
                            score > 0 ? "red" : score < 0 ? "blue" : "black",
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
            <TableCell align="center">合計スコア</TableCell>
            {results.map((score, index) => (
              <TableCell key={index} align="center">
                <Typography
                  variant="body1"
                  style={{
                    color: score > 0 ? "red" : score < 0 ? "blue" : "black",
                  }}
                >
                  {score}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default MahjongScoreBoard;
