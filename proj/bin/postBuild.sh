#! /bin/bash
echo -e '#!/usr/bin/env node\n' "$(cat dist/index.js)" > dist/index.js
chmod +x dist/index.js