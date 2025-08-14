#!/usr/bin/env bash

function generate_command_markdown() {
  local cmd=$1
  local output="${cmd// /-}"

  eval "juno "$cmd" --headless --help --doc" | sed 's/\x1b\[[0-9;]*m//g' > docs/reference/cli/"$output".md
}

COMMANDS=clear,config,deploy,dev,functions,changes,init,login,logout,open,snapshot,start,stop,upgrade,version,status,whoami

for cmd in $(echo $COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "$cmd"
done

DEV_COMMANDS=start,wait

for cmd in $(echo $DEV_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "dev $cmd"
done

FUNCTIONS_COMMANDS=build,eject,publish,upgrade

for cmd in $(echo $FUNCTIONS_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "functions $cmd"
done

CHANGES_COMMANDS=apply,list,reject

for cmd in $(echo $CHANGES_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "changes $cmd"
done

npm run format