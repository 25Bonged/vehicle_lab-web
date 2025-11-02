#!/bin/bash

# Script to push to GitHub
# This will prompt you for your GitHub username and personal access token

echo "Pushing to GitHub repository: https://github.com/25Bonged/VEHICLE-LAB.git"
echo ""
echo "You'll need:"
echo "  - Username: 25Bonged"
echo "  - Password: Your GitHub Personal Access Token (not your GitHub password)"
echo ""
echo "If you don't have a token, create one at: https://github.com/settings/tokens"
echo "Select 'repo' scope when creating the token."
echo ""
echo "Starting push..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "View your repository at: https://github.com/25Bonged/VEHICLE-LAB"
else
    echo ""
    echo "❌ Push failed. Make sure you have:"
    echo "   1. Created a Personal Access Token at https://github.com/settings/tokens"
    echo "   2. Selected 'repo' scope"
    echo "   3. Used the token as your password when prompted"
fi

