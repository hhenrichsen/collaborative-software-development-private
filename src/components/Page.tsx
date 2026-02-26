import { Reference, SignalValue, useScene } from "@motion-canvas/core";
import { Splatters, makeSplatterData } from "./Splatter";
import { Logo } from "./Logo";
import { Colors } from "../commons";
import { ComponentChildren, Layout, Node } from "@motion-canvas/2d";

const splatterData = makeSplatterData(
  100,
  [Colors.Catppuccin.Mocha.Crust, Colors.Catppuccin.Mocha.Mantle],
  5,
  20,
  1267451672
);

export const Page = ({
  includeLogo = true,
  logoRef,
  splattersRef,
  children,
}: {
  includeLogo?: boolean;
  logoRef?: Reference<Logo>;
  splattersRef?: Reference<Layout>;
  children?: SignalValue<ComponentChildren>;
}) => {
  return (
    <>
      <Splatters splatters={splatterData} ref={splattersRef} />
      <Layout children={children} />
      {includeLogo ? (
        <Logo
          ref={logoRef}
          scale={0.25}
          position={useScene().getSize().mul([-0.45, 0.4])}
        ></Logo>
      ) : null}
    </>
  );
};
