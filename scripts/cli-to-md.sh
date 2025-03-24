#!/usr/bin/env bash

function generate_command_markdown() {
  local cmd=$1
  local output="${cmd// /-}"

  eval "juno "$cmd" --headless --help --doc" | sed 's/\x1b\[[0-9;]*m//g' > docs/miscellaneous/cli/"$output".md
}

COMMANDS=clear,config,deploy,dev,init,login,logout,open,upgrade,use,version,whoami,snapshot,start,stop

for cmd in $(echo $COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "$cmd"
done

DEV_COMMANDS=build,eject

for cmd in $(echo $DEV_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "dev $cmd"
done

npm run format