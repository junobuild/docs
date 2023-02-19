#!/usr/bin/env bash

find build/assets/js -type f | xargs -I{} gzip -fnk "{}"
find build/assets/css -type f | xargs -I{} gzip -fnk "{}"