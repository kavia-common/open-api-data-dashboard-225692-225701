#!/bin/bash
cd /home/kavia/workspace/code-generation/open-api-data-dashboard-225692-225701/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

