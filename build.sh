#!/bin/zsh

PACK_NAME=ff_pp_hub
PACK_FILE_EXT=xpi
FILE_NAME=$PACK_NAME.$PACK_FILE_EXT
BUILD_DIR=./build

echo "Building Firefox extension $FILE_NAME in $BUILD_DIR folder"

if [ ! -d $BUILD_DIR ]; then
  mkdir -v ./build
fi

zip -r -FS $BUILD_DIR/$FILE_NAME * --exclude $BUILD_DIR/ build.sh README.md '*.zip' && \
echo "Built successfully!"