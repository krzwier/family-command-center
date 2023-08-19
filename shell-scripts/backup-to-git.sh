#!/bin/sh
#cp /home/krzwier/family-command-center/database/data/family-command-center.db3 /home/krzwier/backup-family-command-center/backup-family-command-center.db3
#echo "Backed up database file to /home/krzwier/backup-family-command-center/backup-family-command-center.db3" >> /home/krzwier/family-command-center/routine-reset.log
git add -A >> /home/krzwier/family-command-center/logs/git-updates.log
git commit -m "Daily commit" >> /home/krzwier/family-command-center/logs/git-updates.log
git push >> /home/krzwier/family-command-center/logs/git-updates.log
