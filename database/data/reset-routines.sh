#!/bin/sh
curl http://localhost:4001/routines/reset
cp /home/krzwier/family-command-center/database/data/family-command-center.db3 /home/krzwier/backup-family-command-center/backup-family-command-center.db3
echo "Backed up database file to /home/krzwier/backup-family-command-center/backup-family-command-center.db3"
/usr/bin/git add -A
/usr/bin/git commit -m "Daily update"
/usr/bin/git push

