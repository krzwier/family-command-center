#!/bin/sh
curl http://localhost:4001/routines/reset >> /home/krzwier/family-command-center/routine-reset.log
cp /home/krzwier/family-command-center/database/data/family-command-center.db3 /home/krzwier/backup-family-command-center/backup-family-command-center.db3
echo "Backed up database file to /home/krzwier/backup-family-command-center/backup-family-command-center.db3" >> /home/krzwier/family-command-center/routine-reset.log


