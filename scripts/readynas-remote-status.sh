#!/bin/bash

cd "$(dirname "$0")"

source ./donotinclude.sh

ping -c1 $host > /dev/null && echo "on" || echo "off"
