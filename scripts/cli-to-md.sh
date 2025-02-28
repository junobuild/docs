#!/usr/bin/env bash

function generate_command_markdown() {
  local cmd=$1

  juno "$cmd" --headless --help --doc | sed 's/\x1b\[[0-9;]*m//g' > docs/miscellaneous/cli/"$cmd".md
}

COMMANDS=clear,config,deploy,dev,init,login,logout,open,upgrade,use,version,whoami,snapshot,start,stop

for cmd in $(echo $COMMANDS | sed "s/,/ /g"); do
  generate_command_markdown "$cmd"
done

npm run format