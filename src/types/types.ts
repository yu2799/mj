export interface GameData {
  soten: number;
  yakuman: boolean;
  yakitori: boolean;
}

export interface Participant {
  userId: string;
  data: GameData[];
  tip: number;
}

export interface GameResult {
  date: string;
  participant: Participant[];
}
