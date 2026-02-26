import {
  belowScreenPosition,
  Colors,
  Glow,
  Window,
  Windows98Window,
} from "../commons";
import {
  Circle,
  Code,
  Gradient,
  Layout,
  Line,
  makeScene2D,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  cancel,
  Color,
  createRef,
  createRefArray,
  loop,
  range,
  waitFor,
} from "@motion-canvas/core";
import { Page } from "../components/Page";
import { ChromaticAberration } from "../components/ChromaticAberration";
import { Scanlines } from "../components/Scanlines";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(<Page></Page>);
  const colors = [
    Colors.Catppuccin.Mocha.Red,
    Colors.Catppuccin.Mocha.Peach,
    Colors.Catppuccin.Mocha.Yellow,
    Colors.Catppuccin.Mocha.Green,
    Colors.Catppuccin.Mocha.Sky,
    Colors.Catppuccin.Mocha.Blue,
    Colors.Catppuccin.Mocha.Lavender,
  ];

  const circles = createRefArray<Circle>();
  const lines = createRefArray<Line>();
  const circleContainer = createRef<Layout>();
  const title = createRef<Txt>();
  const author = createRef<Txt>();

  view.add(
    <Glow copyOpacity={0.5}>
      <Scanlines rowSize={0.5} scanSpeed={2}>
        <Layout ref={circleContainer} x={200}>
          {range(6).map((i) => (
            <>
              <Circle
                ref={circles}
                size={100}
                fill={colors[i]}
                x={i * 200 - 600}
                y={200}
              />
              <Line
                ref={lines}
                stroke={Colors.Catppuccin.Mocha.Text}
                lineWidth={4}
                lineCap={"round"}
                points={[
                  [i * 200 - 600 + 60, 200],
                  [i * 200 - 400 - 60, 200],
                ]}
              ></Line>
            </>
          ))}
        </Layout>
      </Scanlines>
    </Glow>
  );
  view.add(
    <Txt
      fontFamily={"Addington CF"}
      textWrap={"pre"}
      textAlign={"center"}
      fill={Colors.Catppuccin.Mocha.Text}
      fontSize={100}
      y={-200}
      text={"Collaborative Software\n Development"}
      stroke={Colors.Catppuccin.Mocha.Crust}
      strokeFirst
      lineWidth={10}
      ref={title}
    ></Txt>
  );
  view.add(
    <Txt
      fontFamily={"Greycliff CF"}
      textWrap={"pre"}
      textAlign={"center"}
      fill={Colors.Catppuccin.Mocha.Text}
      fontSize={52}
      text={"by Hunter Henrichsen"}
      stroke={Colors.Catppuccin.Mocha.Crust}
      strokeFirst
      lineWidth={5}
      ref={author}
    ></Txt>
  );

  lines[5].opacity(0);
  lines[4].opacity(0);
  lines[4].end(0);
  circles[5].size(0);

  let colorOffset = 0;
  const commitLoop = yield loop(function* () {
    yield circles[5].size(100, 1);
    yield* waitFor(0.5);
    lines[4].opacity(1);
    yield lines[4].end(1, 1);
    yield* waitFor(0.5);
    yield circleContainer().x(0, 1);
    yield lines[0].start(1, 1).do(() => lines[0].opacity(0));
    yield* waitFor(0.5);
    yield* circles[0].size(0, 1);
    colorOffset = (colorOffset + 1) % colors.length;
    for (const [i, circle] of circles.entries()) {
      circle.fill(colors[(colorOffset + i) % colors.length]);
    }
    circles[0].size(100);
    circles[5].size(0);
    lines[0].start(0);
    lines[0].opacity(1);
    lines[4].end(0);
    lines[4].opacity(0);
    circleContainer().x(200);
    yield* waitFor(2);
  });
  yield* beginSlide("title");
  cancel(commitLoop);
  for (const line of lines) {
    yield line.start(0.5, 1);
    yield line.end(0.5, 1).do(() => line.opacity(0));
  }
  yield* waitFor(1);
  for (const circle of circles) {
    yield circle.size(0, 1);
  }
  yield* waitFor(0.5);
  yield title().opacity(0, 1);
  yield* author().opacity(0, 1);
});
