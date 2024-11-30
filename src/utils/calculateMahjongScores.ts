export function calculateMahjongScores(
  baseScores: number[],
  yakitoriFlags: boolean[],
  yakumanFlags: boolean[],
): number[] {
  if (
    baseScores.length !== 4 ||
    yakitoriFlags.length !== 4 ||
    yakumanFlags.length !== 4
  ) {
    throw new Error("4人分の素点が入力されていません。");
  }

  const totalBaseScore = baseScores.reduce((sum, score) => sum + score, 0);
  if (totalBaseScore !== 100000) {
    throw new Error("素点の合計が100,000点ではありません。");
  }

  const basicScores = baseScores.map((score) => {
    const roundedScore = Math.ceil(score / 1000) * 1000;
    return (roundedScore - 30000) / 1000;
  });

  const adjustments = [0, 0, 0, 0];

  const indices = [0, 1, 2, 3];
  indices.sort((a, b) => baseScores[b] - baseScores[a]);

  const rankPoints = [30, 10, -10, -30];
  indices.forEach((playerIndex, rank) => {
    adjustments[playerIndex] += rankPoints[rank];
  });

  baseScores.forEach((score, i) => {
    if (score < 0) {
      adjustments[i] -= 30;
      for (let j = 0; j < 4; j++) {
        if (j !== i) adjustments[j] += 10;
      }
    }
  });

  yakitoriFlags.forEach((isYakitori, i) => {
    if (isYakitori) {
      adjustments[i] -= 30;
      for (let j = 0; j < 4; j++) {
        if (j !== i) adjustments[j] += 10;
      }
    }
  });

  yakumanFlags.forEach((hasYakuman, i) => {
    if (hasYakuman) {
      adjustments[i] += 30;
      for (let j = 0; j < 4; j++) {
        if (j !== i) adjustments[j] -= 10;
      }
    }
  });

  const finalScores = basicScores.map((score, i) => score + adjustments[i]);

  const firstPlaceIndex = indices[0];
  const sumOfOthers = finalScores.reduce(
    (sum, score, i) => (i !== firstPlaceIndex ? sum + score : sum),
    0,
  );
  finalScores[firstPlaceIndex] = -sumOfOthers;

  return finalScores;
}
