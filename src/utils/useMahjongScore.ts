import { useState } from "react";
import { calculateMahjongScores } from "./calculateMahjongScores";

export interface RoundData {
  baseScores: string[];
  yakitoriFlags: boolean[];
  yakumanFlags: boolean[];
  isComplete: boolean;
  finalScores: number[];
}

const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useMahjongScore = () => {
  const [date, setDate] = useState<string>(getTodayDate());
  const [playerNames, setPlayerNames] = useState<string[]>([
    "oden",
    "longpuffer",
    "t_taiki",
    "maru",
  ]);
  const [rounds, setRounds] = useState<RoundData[]>([
    {
      baseScores: ["", "", "", ""],
      yakitoriFlags: [false, false, false, false],
      yakumanFlags: [false, false, false, false],
      isComplete: false,
      finalScores: [0, 0, 0, 0],
    },
  ]);

  const [results, setResults] = useState<number[]>([0, 0, 0, 0]);
  const [tips, setTips] = useState<string[]>(["", "", "", ""]);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const addRound = (): void => {
    setRounds([
      ...rounds,
      {
        baseScores: ["", "", "", ""],
        yakitoriFlags: [false, false, false, false],
        yakumanFlags: [false, false, false, false],
        isComplete: false,
        finalScores: [0, 0, 0, 0],
      },
    ]);
  };

  const handleNameChange = (index: number, value: string): void => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleBaseScoreChange = (
    roundIndex: number,
    playerIndex: number,
    value: string,
  ): void => {
    const newRounds = [...rounds];
    newRounds[roundIndex].baseScores[playerIndex] = value;

    setRounds(newRounds);
  };

  const handleYakitoriChange = (
    roundIndex: number,
    playerIndex: number,
    checked: boolean,
  ): void => {
    const newRounds = [...rounds];
    newRounds[roundIndex].yakitoriFlags[playerIndex] = checked;

    setRounds(newRounds);
    recalculateScores(newRounds);
  };

  const handleYakumanChange = (
    roundIndex: number,
    playerIndex: number,
    checked: boolean,
  ): void => {
    const newRounds = [...rounds];
    newRounds[roundIndex].yakumanFlags[playerIndex] = checked;

    setRounds(newRounds);
    recalculateScores(newRounds);
  };

  const handleFourthPlayerFocus = (roundIndex: number): void => {
    const newRounds = [...rounds];
    const baseScoresInput = newRounds[roundIndex].baseScores;

    const baseScoresNumbers = baseScoresInput.map((score) =>
      score !== "" ? Number(score) * 100 : NaN,
    );
    const filledScores = baseScoresNumbers.filter(
      (score, index) => index !== 3 && !isNaN(score),
    );
    if (filledScores.length === 3) {
      const total = filledScores.reduce((sum, score) => sum + score, 0);
      const fourthScore = 100000 - total;
      newRounds[roundIndex].baseScores[3] = (fourthScore / 100).toString();
    }

    setRounds(newRounds);
    recalculateScores(newRounds);
  };

  const handleChipChange = (playerIndex: number, value: string): void => {
    const newChips = [...tips];
    newChips[playerIndex] = value;
    setTips(newChips);
  };

  const handleFourthChipFocus = (): void => {
    const chipsNumbers = tips.map((tip) => (tip !== "" ? Number(tip) : NaN));
    const filledChips = chipsNumbers.filter(
      (chip, index) => index !== 3 && !isNaN(chip),
    );

    if (filledChips.length === 3) {
      const total = filledChips.reduce((sum, chip) => sum + chip, 0);
      const fourthChip = -total;
      const newChips = [...tips];
      newChips[3] = fourthChip.toString();
      setTips(newChips);
    }
  };

  const recalculateScores = (roundsData: RoundData[]) => {
    const newRounds = [...roundsData];

    const cumulativeResults = [0, 0, 0, 0];

    newRounds.forEach((round, roundIndex) => {
      const allScoresEntered = round.baseScores.every(
        (score) => score !== "" && !isNaN(Number(score)),
      );

      if (allScoresEntered) {
        const baseScoresNumber = round.baseScores.map(
          (score) => Number(score) * 100,
        );
        const yakitoriFlags = round.yakitoriFlags;
        const yakumanFlags = round.yakumanFlags;

        try {
          const finalScores = calculateMahjongScores(
            baseScoresNumber,
            yakitoriFlags,
            yakumanFlags,
          );
          newRounds[roundIndex].finalScores = finalScores;
          newRounds[roundIndex].isComplete = true;

          cumulativeResults.forEach((_, index) => {
            cumulativeResults[index] += finalScores[index];
          });
        } catch (error: unknown) {
          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert("An unknown error occurred");
          }
          newRounds[roundIndex].isComplete = false;
        }
      } else {
        newRounds[roundIndex].isComplete = false;
        newRounds[roundIndex].finalScores = [0, 0, 0, 0];
      }
    });

    setRounds(newRounds);
    setResults(cumulativeResults);
  };

  const saveData = () => {
    // 日付が入力されていない場合の警告
    if (!date) {
      setAlertMessage("日付を入力してください");
      setShowAlert(true);
      return;
    }

    // プレイヤー名が入力されていない場合の警告
    const emptyNames = playerNames.filter((name) => name === "");
    if (emptyNames.length > 0) {
      setAlertMessage("すべてのプレイヤーの名前を入力してください");
      setShowAlert(true);
      return;
    }
    const participant = playerNames.map((name, index) => {
      const totalScore = rounds.reduce((sum, round) => {
        if (round.isComplete) {
          return sum + round.finalScores[index];
        }
        return sum;
      }, 0);

      return {
        userId: name,
        data: rounds.map((round) => ({
          soten: Number(round.baseScores[index]) * 100,
          yakuman: round.yakumanFlags[index],
          yakitori: round.yakitoriFlags[index],
        })),
        tip: Number(tips[index]),
        totalScore,
      };
    });

    const dataToSave = {
      id: Date.now(),
      date: date,
      participant: participant,
    };

    const existingData = localStorage.getItem("mahjongResults");
    const mahjongResults = existingData ? JSON.parse(existingData) : [];
    mahjongResults.push(dataToSave);
    localStorage.setItem("mahjongResults", JSON.stringify(mahjongResults));

    setSuccessMessage("データが正常に保存されました！");
    setShowSuccess(true);
  };

  return {
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
  };
};
