{
  lib
, buildNpmPackage
}:

buildNpmPackage {
  src = ./src;
  pname = "character sheet";
  version = "1.0.0";
  npmDepsHash = "sha256-dUOt/pqiRjeVSdO8waeh4sYkQXNEZV97/hKH2a1/7Ss=";
  #installPhase = ''
  #'';
}
