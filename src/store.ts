import { writable } from "svelte/store";

export const dialogWindow = writable("mainPick");
export const selectedKey = writable("10");
export const buildNo = writable("73f");
export const newKeyClicked = writable(false);
