#!/bin/bash

# Exit on error
set -e

# Navigate to package directory
cd packages/el-popover

echo "[INFO] ==== Starting publish process ===="

# Build
echo "[INFO] Building package..."
pnpm build

no_patch=false
for arg in "$@"; do
  if [ "$arg" = "--no-patch" ]; then
    no_patch=true
    break
  fi
done

# Update version
if [ "$no_patch" = false ]; then
  echo "[INFO] Updating version..."
  pnpm version patch
fi

# Publish
echo "[INFO] Publishing to npm..."
pnpm publish --access public

echo "[SUCCESS] ==== Package published successfully! ===="

# Return to root directory
cd -
