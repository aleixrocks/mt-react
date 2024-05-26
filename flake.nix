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
      rtt = final.callPackage ./default.nix {};
    };

    packages.x86_64-linux.rtt = pkgs.rtt;
    packages.x86_64-linux.default = self.packages.x86_64-linux.rtt;
  };
}
