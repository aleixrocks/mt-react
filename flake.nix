{
  description = "Robotta maptool library";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
  let
    pkgs = import nixpkgs {
      system = "x86_64-linux";
      overlays = [ self.overlay ];
    };
  in {
    overlay = final: prev: {
      cst = final.callPackage ./default.nix {};
    };

    packages.x86_64-linux.cst = pkgs.cst;
    packages.x86_64-linux.default = self.packages.x86_64-linux.cst;
  };
}
