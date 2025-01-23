#!/usr/bin/env bash
deno task build
cp -r web/* dist/public/
(cd dist && git add -A . && git commit -m "$(date)" && git push)
