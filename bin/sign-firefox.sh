#!/bin/bash

npm run build:firefox
npx web-ext sign -s build/firefox -a build -v --api-key $FIREFOX_API_KEY --api-secret $FIREFOX_SECRET_KEY --channel listed