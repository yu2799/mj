import { useState } from "react";
import { calculateMahjongScores } from "./calculateMahjongScores";

export interface RoundData {
  baseScores: string[];
  yakitoriFlags: boolean[];
  yakumanFlags: boolean[];
  isComplete: boolean;
  finalScores: number[];
}

export function useMahjongScore() {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", ""]);
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

  return {
    playerNames,
    rounds,
    results,
    addRound,
    handleNameChange,
    handleBaseScoreChange,
    handleYakitoriChange,
    handleYakumanChange,
    handleFourthPlayerFocus,
    recalculateScores,
  };
}
