#!/usr/bin/env bash

set -e

dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
libdir=$dir/lib
srcdir=$dir/src
rttdir=$dir/tmp


#cleanup
rm -f  $libdir/lib.mtlib
rm -rf $srcdir/library/public/{backend,frontend,shared}

# init
mkdir -p $libdir

# build backend and frontend
cd $rttdir
npm run build
cp -r $rttdir/frontend/build $srcdir/library/public/frontend
cp -r $rttdir/backend/dist   $srcdir/library/public/backend
cp -r $rttdir/shared/dist    $srcdir/library/public/shared

# Compress all files, exclude *.ts files
cd $srcdir
zip -r $libdir/lib.mtlib . -x '*.git*' '*.ts' '*.swp'
