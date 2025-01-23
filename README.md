# xor-filter-web

probabilistic set inclusion on the web :3

## Setup

```shell
$ (cd rust/ && wasm-pack build --target web)
$ deno task build
$ # static fles are in web/
$ (cd web/ && python3 -m http.server)
```
