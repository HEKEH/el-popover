#!/bin/bash

# Exit on error
set -e

# Navigate to package directory
cd packages/el-popover

echo "[INFO] ==== Starting publish process ===="

# install dependencies
echo "[INFO] Installing dependencies..."
pnpm install

# Publish
echo "[INFO] Publishing to npm..."
pnpm publish --access public

echo "[SUCCESS] ==== Package published successfully! ===="

# Return to root directory
cd -
