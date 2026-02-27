import {
  Circle,
  Img,
  Layout,
  Node,
  makeScene2D,
  Rect,
  Txt,
  Gradient,
} from "@motion-canvas/2d";
import { all, beginSlide, Color, createRef, spawn } from "@motion-canvas/core";
import { Page } from "../components/Page";
import { Scanlines } from "../components/Scanlines";
import { Colors } from "../commons";
import { belowScreenPosition } from "../commons/Util";
import { Window, Windows98Window } from "../commons/components/Window";
import { MotionCanvasLogo } from "../commons/components/MotionCanvasLogo";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(<Page></Page>);

  const imgWindow = createRef<Window>();
  const familyWindow = createRef<Window>();
  const usuWindow = createRef<Window>();
  const mcWindow = createRef<Window>();
  const lucidWindow = createRef<Window>();
  const logoContainer = createRef<Layout>();

  yield view.add(
    <>
      <Windows98Window
        title="hunter.png"
        width={400}
        height={450}
        x={600}
        y={200}
        ref={imgWindow}
        bodyColor={Colors.Catppuccin.Mocha.Crust}
        headerColor={() => {
          const color = Colors.Catppuccin.Mocha.Green;
          return new Gradient({
            stops: [
              {
                color: new Color(color).darken(1),
                offset: 0,
              },
              { color, offset: 0.66 },
              { color, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: imgWindow().size().x,
              y: 0,
            },
          });
        }}
      >
        <Scanlines reflectionOffset={0} effectStrength={0.1}>
          <Img src={`${import.meta.env.BASE_URL}hunter.png`} size={380}></Img>
        </Scanlines>
      </Windows98Window>
      <Windows98Window
        title={`${import.meta.env.BASE_URL}family.jpg`}
        width={700}
        height={565}
        x={-500}
        ref={familyWindow}
        bodyColor={Colors.Catppuccin.Mocha.Crust}
        headerColor={() => {
          const color = Colors.Catppuccin.Mocha.Peach;
          return new Gradient({
            stops: [
              {
                color: new Color(color).darken(1),
                offset: 0,
              },
              { color, offset: 0.66 },
              { color, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: imgWindow().size().x,
              y: 0,
            },
          });
        }}
      >
        <Scanlines reflectionOffset={0} effectStrength={0.1} padding={10}>
          <Img src={`${import.meta.env.BASE_URL}family.jpg`} width={"100%"}></Img>
        </Scanlines>
      </Windows98Window>
      <Windows98Window
        title="usu.png"
        width={400}
        height={450}
        x={300}
        y={-200}
        ref={usuWindow}
        bodyColor={Colors.Catppuccin.Mocha.Crust}
        headerColor={() => {
          const color = Colors.Catppuccin.Mocha.Blue;
          return new Gradient({
            stops: [
              {
                color: new Color(color).darken(1),
                offset: 0,
              },
              { color, offset: 0.66 },
              { color, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: imgWindow().size().x,
              y: 0,
            },
          });
        }}
      >
        <Scanlines reflectionOffset={0} effectStrength={0.1} padding={10}>
          <Circle clip width={"100%"}>
            <Img src={`${import.meta.env.BASE_URL}usu.png`} width={"100%"}></Img>
          </Circle>
        </Scanlines>
      </Windows98Window>
      <Windows98Window
        title="motion-canvas"
        width={400}
        height={450}
        x={-500}
        y={250}
        ref={mcWindow}
        bodyColor={Colors.Catppuccin.Mocha.Crust}
        headerColor={() => {
          const color = Colors.Catppuccin.Mocha.Yellow;
          return new Gradient({
            stops: [
              {
                color: new Color(color).darken(1),
                offset: 0,
              },
              { color, offset: 0.66 },
              { color, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: imgWindow().size().x,
              y: 0,
            },
          });
        }}
      >
        <Scanlines reflectionOffset={0} effectStrength={0.1} padding={10}>
          <Layout
            direction={"column"}
            alignItems={"center"}
            width={"100%"}
            padding={10}
          >
            <Layout width={300} height={300}>
              <Node>
                <MotionCanvasLogo
                  scale={0.9}
                  ref={(node) => spawn(() => node.animate())}
                ></MotionCanvasLogo>
              </Node>
            </Layout>
            <Txt
              fontFamily={"Greycliff CF"}
              fontSize={48}
              fill={Colors.Catppuccin.Mocha.Text}
            >
              Maintainer
            </Txt>
          </Layout>
        </Scanlines>
      </Windows98Window>
      <Windows98Window
        title="lucid.svg"
        width={500}
        height={300}
        ref={lucidWindow}
        bodyColor={Colors.Catppuccin.Mocha.Crust}
        headerColor={() => {
          const color = Colors.Catppuccin.Mocha.Sky;
          return new Gradient({
            stops: [
              {
                color: new Color(color).darken(1),
                offset: 0,
              },
              { color, offset: 0.66 },
              { color, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: imgWindow().size().x,
              y: 0,
            },
          });
        }}
      >
        <Scanlines reflectionOffset={0} effectStrength={0.1}>
          <Layout layout direction={"column"} padding={10}>
            <Layout cache ref={logoContainer} width={400} height={160}>
              <Layout layout={false} x={210}>
                <Img src={`${import.meta.env.BASE_URL}lucid.svg`} width={800} />
                <Rect
                  size={"100%"}
                  fill={Colors.Catppuccin.Mocha.Text}
                  compositeOperation={"source-in"}
                />
              </Layout>
            </Layout>
            <Txt
              fontFamily={"Greycliff CF"}
              fontSize={48}
              fill={Colors.Catppuccin.Mocha.Text}
            >
              Engineering Manager
            </Txt>
          </Layout>
        </Scanlines>
      </Windows98Window>
    </>
  );

  logoContainer().filters.brightness(1);

  const familyPosition = familyWindow().position();
  familyWindow().position(belowScreenPosition(view, familyWindow()).addY(100));
  const usuPosition = usuWindow().position();
  usuWindow().position(belowScreenPosition(view, usuWindow()).addY(100));
  const mcPosition = mcWindow().position();
  mcWindow().position(belowScreenPosition(view, mcWindow()).addY(100));
  const lucidPosition = lucidWindow().position();
  lucidWindow().position(belowScreenPosition(view, lucidWindow()).addY(100));

  yield* imgWindow().open(view, 1);

  yield* beginSlide("family");
  familyWindow().position(familyPosition);
  yield familyWindow().open(view, 1);

  yield* beginSlide("usu");
  usuWindow().position(usuPosition);
  yield usuWindow().open(view, 1);

  yield* beginSlide("mc");
  mcWindow().position(mcPosition);
  yield mcWindow().open(view, 1);

  yield* beginSlide("lucid");
  lucidWindow().position(lucidPosition);
  yield* lucidWindow().open(view, 1);

  yield* beginSlide("close");

  yield* all(
    imgWindow().close(view, 1),
    familyWindow().close(view, 1),
    usuWindow().close(view, 1),
    mcWindow().close(view, 1),
    lucidWindow().close(view, 1)
  );
});