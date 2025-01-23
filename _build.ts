import { build } from "@char/aftercare/esbuild";

if (import.meta.main) {
  const serve = Deno.args.includes("--serve");
  await build({
    in: ["./js/main.tsx"],
    outDir: "./web/out",
    watch: serve,
    serve: { servedir: "web", host: "127.0.0.1", port: 9634 },
    extraOptions: { loader: { ".wasm": "file" } },
  });
}
