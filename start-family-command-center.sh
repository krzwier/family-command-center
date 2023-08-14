#!/bin/bash

cd /home/krzwier/family-command-center
echo "Starting family command center api ..."
/home/krzwier/.nvm/versions/node/v18.16.0/bin/npm run server &
sleep 10

echo "Starting family command center front end ..."
/home/krzwier/.nvm/versions/node/v18.16.0/bin/npm start &
sleep 30

DISPLAY=:0 firefox-esr --kiosk http://localhost:3000 &

