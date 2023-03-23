import time
import os

commit = input("Commit Details: ")

# Navigate to the directory where you want to initialize the Git repository
os.chdir('D:\KarandaGram')
time.sleep(1)
# Initialize the Git repository
os.system('git init')
time.sleep(1)
# Add the remote origin
os.system('git remote add origin https://github.com/SenalKaranda/KarandaGram.git')
time.sleep(1)
# Rename the branch to main
os.system('git branch -M main')
time.sleep(1)
# Add all files to the staging area
os.system('git add *')
time.sleep(1)
# Commit the changes
os.system('git commit -m "' + commit + '"')
time.sleep(1)
# Push the changes to the remote repository
os.system('git push -u origin main')
time.sleep(3)