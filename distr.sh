#!/usr/bin/env bash

set -e

dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
libdir=$dir/lib
srcdir=$dir/src
rttdir=$dir/rtt


#cleanup
rm -f  $libdir/lib.mtlib
rm -rf $srcdir/library/public/react

# init
mkdir -p $libdir

# build react
cd $rttdir
npm run build
cp -r $rttdir/build $srcdir/library/public/react

# Build JavaScript files from TypeScript files
cd $srcdir
tsc -p .

# Compress all files, exclude *.ts files
zip -r $libdir/lib.mtlib . -x '*.git*' '*.ts' '*.swp'
