import "https://char.lt/esm/pipe.ts";

import { Signal } from "@char/aftercare";

export const activeTab = new Signal<"checker" | "generator">("checker");

import { checker } from "./checker.tsx";
import { generator } from "./generator.tsx";

const main = document.body.querySelector("main")!;

activeTab.subscribeImmediate(value => {
  const tabs = { checker, generator };
  Object.values(tabs).forEach(e => e.remove());
  main.append(tabs[value]);
});
