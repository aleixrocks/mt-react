#!/usr/bin/env bash

set -e

dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
libdir=$dir/lib
adddir=$dir/addon


#cleanup
rm -f  $libdir/lib.mtlib

# init
mkdir -p $libdir

# Compress all files, exclude *.ts files
cd $adddir
zip -r $libdir/lib.mtlib . -x '*.git*' '*.ts' '*.swp'
