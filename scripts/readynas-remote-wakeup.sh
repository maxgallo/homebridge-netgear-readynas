#!/bin/bash

cd "$(dirname "$0")"

source ./donotinclude.sh

wakeonlan $mac
