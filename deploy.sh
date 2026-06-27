#!/bin/bash

# Exit immediately if any command fails
set -e

PROJECT_ROOT=$(pwd)
TARGET_DIR="/var/www/marquee"

echo "🚀 Starting native local deployment for static application..."

# 1. Pull Latest Source
echo "Checking git status..."
git checkout master
git pull origin master

# 2. Clean Install Dependencies
echo "📦 Installing project dependencies..."
npm ci

# 3. Compile Production Assets
echo "🏗️ Building the production static files..."
rm -rf build dist
npm run build

# 4. Deploy Flat Assets Natively
echo "🚚 Syncing flat assets to web server root at $TARGET_DIR..."
sudo mkdir -p "$TARGET_DIR"
sudo rm -rf "$TARGET_DIR"/*
sudo cp -r "$PROJECT_ROOT"/build/* "$TARGET_DIR"/

# 5. Reload Web Server
echo "🔄 Reloading Nginx web server..."
sudo systemctl restart nginx

echo "✅ Static deployment completed successfully!"