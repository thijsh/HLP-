#! /bin/bash

if grep -q adt-bundle-linux <<<$PATH; then
  echo "PATH already contains ADT bundle config..."
else
  export PATH="$HOME/adt-bundle-linux/sdk/tools/:$HOME/adt-bundle-linux/sdk/platforms:$HOME/adt-bundle-linux/sdk/platform-tools:$PATH"
fi


## Build and run the app
# rm -rf platforms/android/src
# cordova build
cordova run

# Show extensive logs
#adb logcat | grep -i -E 'webview|web con'

# Show only console log
adb logcat | grep -i -E 'web con'

