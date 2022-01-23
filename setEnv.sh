#!/bin/bash

GIT_CONFIG=".gitconfig"
GIT_OPEN_CONFIG="Open.gitconfig"
NPM_CONFIG=".npmrc"
ORIG_POSTFIX="_ORIG"
NEW_POSTFIX=""

GIT_OLD_NAME="$USERPROFILE/$GIT_CONFIG"
GIT_NEW_NAME="$USERPROFILE/$GIT_CONFIG$ORIG_POSTFIX"
GIT_OLD_OPEN_NAME="$USERPROFILE/$GIT_OPEN_CONFIG"
GIT_NEW_OPEN_NAME="$USERPROFILE/$GIT_CONFIG"

NPM_OLD_NAME="$USERPROFILE/$NPM_CONFIG"
NPM_NEW_NAME="$USERPROFILE/$NPM_CONFIG$ORIG_POSTFIX"


if [ -n "$1" ] && [ "$1" = "-r" ]; then
    GIT_OLD_NAME="$USERPROFILE/$GIT_CONFIG$ORIG_POSTFIX"
    GIT_NEW_NAME="$USERPROFILE/$GIT_CONFIG"
    GIT_OLD_OPEN_NAME="$USERPROFILE/$GIT_CONFIG"
    GIT_NEW_OPEN_NAME="$USERPROFILE/$GIT_OPEN_CONFIG"

    NPM_OLD_NAME="$USERPROFILE/$NPM_CONFIG$ORIG_POSTFIX"
    NPM_NEW_NAME="$USERPROFILE/$NPM_CONFIG"

    echo "Enabling Restricted git configuration..."
    mv -v -f $GIT_OLD_OPEN_NAME $GIT_NEW_OPEN_NAME

    echo "Restoring git configuration..."
    mv -v -f $GIT_OLD_NAME $GIT_NEW_NAME

    export HTTP_PROXY=""
    export HTTPS_PROXY=""
else
    echo "Disabling restricted git configuration..."
    mv -v -f $GIT_OLD_NAME $GIT_NEW_NAME

    echo "Enabling open git configuration..."
    mv -v -f $GIT_OLD_OPEN_NAME $GIT_NEW_OPEN_NAME

    export HTTP_PROXY="http://proxy-chain.intel.com:911"
    export HTTPS_PROXY="http://proxy-chain.intel.com:911"   
fi

echo "Renaming npm config file..."
mv -v -f $NPM_OLD_NAME $NPM_NEW_NAME
