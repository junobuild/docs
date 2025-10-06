#!/usr/bin/env bash

function generate_command_markdown() {
  local cmd=$1
  local output="${cmd// /-}"

  eval "juno "$cmd" --headless --help --doc" | sed 's/\x1b\[[0-9;]*m//g' > docs/reference/cli/"$output".md
}

COMMANDS=config,hosting,emulator,functions,changes,login,logout,open,snapshot,start,stop,upgrade,version,status,whoami,run

for cmd in $(echo $COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "$cmd"
done

EMULATOR_COMMANDS=start,wait

for cmd in $(echo $EMULATOR_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "emulator $cmd"
done

FUNCTIONS_COMMANDS=build,eject,publish,upgrade

for cmd in $(echo $FUNCTIONS_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "functions $cmd"
done

CHANGES_COMMANDS=apply,list,reject

for cmd in $(echo $CHANGES_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "changes $cmd"
done

HOSTING_COMMANDS=deploy,clear

for cmd in $(echo $HOSTING_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "hosting $cmd"
done

CONFIG_COMMANDS=apply,init

for cmd in $(echo $CONFIG_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "config $cmd"
done

EMULATOR_COMMANDS=upload

for cmd in $(echo $EMULATOR_COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "snapshot $cmd"
done

npm run format