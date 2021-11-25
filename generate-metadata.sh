#!/bin/bash

echo "export let meta = {
    \"version\": \"$(git describe --tags `git rev-list --tags --max-count=1` | sed 's/v//')\",
    \"commit\": \"$(git rev-list --tags --max-count=1)\",
    \"date\": \"$(date)\"
}" > src/version.js
