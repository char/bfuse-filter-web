#!/usr/bin/env bash
deno task build
cp -r web/* dist/public/
unlink dist/public/char.css && cp ./vendor/char.css/char.css dist/public/char.css
(cd dist && git add -A . && git commit -m "$(date)" && git push)
