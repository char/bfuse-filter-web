import init, { check, generate } from "xor-filter/xor_filter.js";
// @ts-types="./xor_filter_wasm.d.ts"
import wasmURL from "xor-filter/xor_filter_bg.wasm";
await init(new URL(wasmURL, import.meta.url));

export { check, generate };
