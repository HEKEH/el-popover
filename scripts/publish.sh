#!/bin/bash

# Exit on error
set -e

# Navigate to package directory
cd packages/el-popover

echo "[INFO] ==== Starting publish process ===="

# Install dependencies
echo "[INFO] Installing dependencies..."
pnpm install

# Build
echo "[INFO] Preparing publish..."
pnpm run before:publish

# Publish
echo "[INFO] Publishing to npm..."
pnpm publish --access public

echo "[SUCCESS] ==== Package published successfully! ===="

# Return to root directory
cd -
