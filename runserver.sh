#!/bin/bash

(cd src && browser-sync start --server --files "*") &
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch 

wait
