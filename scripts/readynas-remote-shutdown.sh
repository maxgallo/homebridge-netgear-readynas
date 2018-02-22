#!/bin/bash

source ./donotinclude.sh

curl -u $user:$pass -k "https://$host/get_handler?PAGE=System&OUTER_TAB=tab_shutdown&INNER_TAB=NONE&shutdown_option1=1&command=poweroff&OPERATION=set"
