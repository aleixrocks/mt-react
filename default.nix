{
  runCommand
, nodejs
, yarn
, nodePackages
, typescript
}:

runCommand "rtt" {
  buildInputs = [
    nodejs
    yarn
    nodePackages.create-react-app
    typescript
  ];
} ''
  cp -r ${./src} src
  cp -r ${./rtt} rtt
  cp ${./distr.sh} distr.sh
  patchShebangs ./distr.sh
  ./distr.sh
  mkdir -p $out
  cp -r lib/* $out/
''
