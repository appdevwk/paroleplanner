#!/bin/bash

# WI Parole Planner One-Click Install & Run
# Make sure you have git and Node.js installed!

# ----- CONFIGURE THIS -----
GIT_REPO="https://github.com/YOUR_USERNAME/wi-parole-planner.git"
PROJECT_DIR="wi-parole-planner"
# --------------------------

echo
echo "Starting WI Parole Planner setup!"
echo

# 1. Clone the project
if [ -d "$PROJECT_DIR" ]; then
  echo "Project directory exists. Pulling latest changes..."
  cd "$PROJECT_DIR"
  git pull
else
  echo "Cloning the repository..."
  git clone "$GIT_REPO"
  cd "$PROJECT_DIR"
fi

echo
echo "Installing dependencies..."
npm install

echo
echo "Building the production version..."
npm run build

echo
echo "Launching the preview server..."
npm run preview

echo
echo "--------------------------------------"
echo "Open the site with the link above!"
echo "If prompted, use 'http://localhost:4173/' in your web browser."
echo "Press Ctrl+C to stop the server."
echo

