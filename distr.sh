#!/usr/bin/env bash

set -e

dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
libdir=$dir/lib
adddir=$dir/addon
srcdir=$dir/src


#cleanup
rm -f  $libdir/lib.mtlib
rm -rf $adddir/library/public/{backend,frontend,shared}

# init
mkdir -p $libdir
mkdir -p $adddir/library/public/{frontend,backend,shared}

# build backend and frontend
cd $srcdir
npm run build
cp -r $srcdir/frontend/build $adddir/library/public/frontend
cp -r $srcdir/backend/dist   $adddir/library/public/backend
cp -r $srcdir/shared/dist    $adddir/library/public/shared

# Compress all files, exclude *.ts files
cd $adddir
zip -r $libdir/lib.mtlib . -x '*.git*' '*.ts' '*.swp'
