import { atom } from "recoil";

export const userState = atom<object | null>({
  key: "userState",
  default: null,
});
