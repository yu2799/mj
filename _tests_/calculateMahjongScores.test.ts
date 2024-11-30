import { calculateMahjongScores } from "../src/utils/calculateMahjongScores";

describe("calculateMahjongScores 関数のテスト", () => {
  test("基本的なスコア計算が正しいことを確認", () => {
    const baseScores = [35000, 28000, 27000, 10000];
    const yakitoriFlags = [false, false, false, false];
    const yakumanFlags = [false, false, false, false];

    const expected = [55, 8, -13, -50];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result).toEqual(expected);
  });

  test("焼き鳥有りのスコア計算が正しいことを確認", () => {
    const baseScores = [35000, 28000, 27000, 10000];
    const yakitoriFlags = [false, false, true, true];
    const yakumanFlags = [false, false, false, false];

    const expected = [75, 28, -33, -70];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result).toEqual(expected);
  });

  test("役満祝儀のスコア計算が正しいことを確認", () => {
    const baseScores = [35000, 28000, 27000, 10000];
    const yakitoriFlags = [false, false, false, false];
    const yakumanFlags = [false, true, false, false];

    const expected = [45, 38, -23, -60];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result).toEqual(expected);
  });

  test("箱下のスコア計算が正しいことを確認", () => {
    const baseScores = [40000, 35000, 30000, -5000];
    const yakitoriFlags = [false, false, false, false];
    const yakumanFlags = [false, false, false, false];

    const expected = [70, 25, 0, -95];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result).toEqual(expected);
  });

  test("複合条件のスコア計算が正しいことを確認", () => {
    const baseScores = [40000, 35000, 30000, -5000];
    const yakitoriFlags = [false, false, true, true];
    const yakumanFlags = [false, true, false, false];

    const expected = [80, 75, -30, -125];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result).toEqual(expected);
  });

  test("入力配列の長さが不正な場合にエラーがスローされることを確認", () => {
    const baseScores = [35000, 28000, 27000];
    const yakitoriFlags = [false, false, false];
    const yakumanFlags = [false, false, false];

    expect(() => {
      calculateMahjongScores(baseScores, yakitoriFlags, yakumanFlags);
    }).toThrow("4人分の素点が入力されていません。");
  });

  test("素点の合計が100,000点でない場合にエラーがスローされることを確認", () => {
    const baseScores = [35000, 28000, 27000, 9000];
    const yakitoriFlags = [false, false, false, false];
    const yakumanFlags = [false, false, false, false];

    expect(() => {
      calculateMahjongScores(baseScores, yakitoriFlags, yakumanFlags);
    }).toThrow("素点の合計が100,000点ではありません。");
  });

  test("素点の合計が100,000点の場合にエラーがスローされないことを確認", () => {
    const baseScores = [25000, 25000, 25000, 25000]; // 合計100,000点
    const yakitoriFlags = [false, false, false, false];
    const yakumanFlags = [false, false, false, false];

    expect(() => {
      calculateMahjongScores(baseScores, yakitoriFlags, yakumanFlags);
    }).not.toThrow();
  });

  test("素点に100の位が含まれる値での計算が正しいことを確認", () => {
    const baseScores = [25300, 30700, 26900, 17100]; // 合計100,000点
    const yakitoriFlags = [false, false, false, false];
    const yakumanFlags = [false, false, false, false];

    const expected = [-14, 49, 7, -42];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result.map((score) => Math.round(score * 10) / 10)).toEqual(
      expected,
    );
  });

  test("素点が100の位を含み、焼き鳥や役満祝儀がある場合の計算を確認", () => {
    const baseScores = [25200, 24900, 25100, 24800];
    const yakitoriFlags = [false, true, false, true];
    const yakumanFlags = [true, false, false, false];

    const expected = [94, -45, 16, -65];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result.map((score) => Math.round(score * 10) / 10)).toEqual(
      expected,
    );
  });

  test("素点が負の値で、100の位を含む場合の計算を確認", () => {
    const baseScores = [50000, 15000, -10000, 45000];
    const yakitoriFlags = [false, false, false, false];
    const yakumanFlags = [false, false, false, false];

    const expected = [80, -15, -100, 35];
    const result = calculateMahjongScores(
      baseScores,
      yakitoriFlags,
      yakumanFlags,
    );

    expect(result.map((score) => Math.round(score * 10) / 10)).toEqual(
      expected,
    );
  });
});
