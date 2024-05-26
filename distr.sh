#!/usr/bin/env bash

set -e

dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
libdir=$dir/lib
srcdir=$dir/src

mkdir -p $libdir
rm -f $libdir/lib.mtlib
cd $srcdir

# Build JavaScript files from TypeScript files
tsc -p .

# Compress all files, exclude *.ts files
zip -r $libdir/lib.mtlib . -x '*.git*' '*.ts' '*.swp'
