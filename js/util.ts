import * as base32 from "@mary/base32";

export const filterToString = (f: Uint8Array | undefined) =>
  f?.pipe(base32.encode) ?? "[No filter]";
export const stringToFilter = (s: string): Uint8Array => s.pipe(base32.decode);

export const onClick = (f: () => void) => (b: HTMLButtonElement) =>
  b.addEventListener("click", f);
export const onSubmit = (f: () => void) => (form: HTMLFormElement) =>
  form.addEventListener("submit", (e) => (e.preventDefault(), f()));
