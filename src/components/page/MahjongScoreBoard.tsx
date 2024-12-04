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
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMahjongScore } from "../../utils/useMahjongScore";

const MahjongScoreBoard = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    alertMessage,
    showAlert,
    setShowAlert,
    successMessage,
    showSuccess,
    setShowSuccess,
  } = useMahjongScore();

  const availableNames = [
    "oden",
    "longpuffer",
    "t_taiki",
    "maru",
    "kawrbe",
    "tago",
    "kanekyo",
  ];

  return (
    <Box
      sx={{
        paddingBottom: "56px",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <TextField
          label="日付"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginTop: "20px", marginBottom: "20px" }}
          fullWidth={isMobile}
        />
        <Box>
          <Table size="small" sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ width: isMobile ? "50px" : "auto" }}
                ></TableCell>
                {playerNames.map((name, index) => (
                  <TableCell key={index} align="center">
                    <TextField
                      value={playerNames[index] || availableNames[index]}
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
                    <TableCell
                      align="center"
                      sx={{ width: isMobile ? "50px" : "auto" }}
                    >
                      {roundIndex + 1}
                    </TableCell>
                    {round.baseScores.map((score, playerIndex) => (
                      <TableCell key={playerIndex} align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
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
                            InputProps={{ style: { textAlign: "center" } }}
                            fullWidth
                            size="small"
                          />
                        </div>
                        <Typography variant="body2">00点</Typography>
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
                      <TableCell
                        align="center"
                        sx={{ width: isMobile ? "50px" : "auto" }}
                      >
                        スコア
                      </TableCell>
                      {round.finalScores.map((score, index) => (
                        <TableCell key={index} align="center">
                          <Typography
                            variant="body1"
                            style={{
                              color:
                                score > 0
                                  ? "blue"
                                  : score < 0
                                    ? "red"
                                    : "black",
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
                <TableCell
                  align="center"
                  sx={{ width: isMobile ? "50px" : "auto" }}
                >
                  計
                </TableCell>
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
                <TableCell
                  align="center"
                  sx={{ width: isMobile ? "50px" : "auto" }}
                >
                  チップ
                </TableCell>
                {tips.map((tip, index) => (
                  <TableCell key={index} align="center">
                    <TextField
                      type="number"
                      fullWidth
                      value={tip}
                      onChange={(e) => handleChipChange(index, e.target.value)}
                      onFocus={index === 3 ? handleFourthChipFocus : undefined}
                      InputProps={{ style: { textAlign: "center" } }}
                      style={{ width: "60px" }}
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ width: isMobile ? "50px" : "auto" }}
                >
                  ポイント
                </TableCell>
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
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={saveData}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              保存
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowAlert(false)}
            severity="error"
            variant="filled"
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            variant="filled"
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default MahjongScoreBoard;
