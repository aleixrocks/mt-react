#!/usr/bin/env bash

set -e

dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
libdir=$dir/../lib

mkdir -p $libdir
rm -f $libdir/lib.mtlib
cd $dir
zip -r $libdir/lib.mtlib . -x '*.git*' 
