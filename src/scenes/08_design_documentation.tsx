import { Colors, Glow, Window, Windows98Window } from "../commons";
import {
  Layout,
  makeScene2D,
  Path,
  Rect,
  Shape,
  Line,
  Gradient,
  Txt,
} from "@motion-canvas/2d";
import { Page } from "../components/Page";
import { Scanlines } from "../components/Scanlines";
import {
  all,
  beginSlide,
  chain,
  Color,
  createRef,
  createRefArray,
  sequence,
  useRandom,
  waitFor,
} from "@motion-canvas/core";
import { partTitle } from "../util/partTitle";
import { playbackWait } from "../util/playbackWait";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);

  const shapes = createRefArray<Path>();
  const lines = createRefArray<Line>();

  yield view.add(
    <Page>
      <Glow copyOpacity={0.5}>
        <Scanlines rowSize={4}>
          <Layout rotation={20} opacity={0.2}>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={160}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
            ></Rect>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={160}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              x={200}
            ></Rect>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={160}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              x={200}
              y={400}
            ></Rect>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={160}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              x={-400}
              y={200}
            ></Rect>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={160}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              x={-200}
              y={-400}
            ></Rect>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={160}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              x={-600}
            ></Rect>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={160}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              x={600}
              y={-200}
            ></Rect>
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={100}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              rotation={45}
              y={200}
            />
            <Rect
              stroke={Colors.Catppuccin.Mocha.Text}
              width={100}
              height={100}
              lineWidth={2}
              radius={4}
              ref={shapes}
              end={0}
              rotation={45}
              y={-200}
              x={200}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[0].bottom().addY(10),
                shapes[7].topLeft().addY(-10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[7].bottomLeft().addX(-10),
                shapes[3].right().addX(10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[7].bottomRight().addY(10),
                [shapes[7].bottomRight().x, shapes[2].left().y],
                shapes[2].left().addX(-10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[7].topRight().addX(10),
                [shapes[1].bottom().x, shapes[7].topRight().y],
                shapes[1].bottom().addY(10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[1].top().addY(-10),
                shapes[8].bottomRight().addY(10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[8].topRight().addX(10),
                shapes[6].left().addX(-10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[8].topLeft().addY(-10),
                [shapes[8].topLeft().x, shapes[4].right().y],
                shapes[4].right().addX(10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
            <Line
              stroke={Colors.Catppuccin.Mocha.Text}
              points={() => [
                shapes[8].bottomLeft().addX(-10),
                [shapes[5].top().x, shapes[8].bottomLeft().y],
                shapes[5].top().addY(-10),
              ]}
              lineWidth={2}
              ref={lines}
              radius={2}
              end={0}
            />
          </Layout>
        </Scanlines>
      </Glow>
    </Page>
  );

  const colors = [
    Colors.Catppuccin.Mocha.Red,
    Colors.Catppuccin.Mocha.Peach,
    Colors.Catppuccin.Mocha.Yellow,
    Colors.Catppuccin.Mocha.Green,
    Colors.Catppuccin.Mocha.Sky,
  ];
  yield chain(
    sequence(
      0.25,
      ...shapes.map((shape, index) =>
        chain(
          shape.end(1, 1),
          all(
            shape.fill(colors[index % colors.length], 1),
            shape.stroke(colors[index % colors.length], 1)
          )
        )
      )
    ),
    sequence(0.25, ...lines.map((line) => chain(line.end(1, 1))))
  );

  yield* partTitle(view, "Part 3: Documentation");

  const window = createRef<Window>();
  const txts = createRefArray<Txt>();

  const notes = [
    "Architecture Diagrams",
    "Class Structures",
    "Low Fidelity Mocks",
    "Request Flows",
  ];

  view.add(
    <Windows98Window
      title="Design Documentation"
      width={600}
      height={400}
      ref={window}
      headerColor={() =>
        new Gradient({
          stops: [
            {
              color: new Color(Colors.Catppuccin.Mocha.Mauve)
                .darken(1)
                .saturate(0.2),
              offset: 0,
            },
            { color: Colors.Catppuccin.Mocha.Mauve, offset: 0.5 },
            { color: Colors.Catppuccin.Mocha.Mauve, offset: 1 },
          ],
          type: "linear",
          from: { x: 0, y: 0 },
          to: {
            x: window().size().x,
            y: 0,
          },
        })
      }
      bodyColor={Colors.Catppuccin.Mocha.Crust}
    >
      <Layout padding={20} layout direction={"column"}>
        {notes.map((note) => (
          <Txt
            text={`${"\u2022"} ${note}`}
            ref={txts}
            fontFamily={"Greycliff CF"}
            fontSize={32}
            opacity={0}
            textWrap
            fill={Colors.Catppuccin.Mocha.Text}
          />
        ))}
      </Layout>
    </Windows98Window>
  );
  yield* window().open(view, 1);

  for (const txt of txts) {
    yield* beginSlide(`note ${txt.text()}`);
    yield txt.opacity(1, 1);
    yield* playbackWait(1);
  }

  yield* beginSlide("end");
  yield* window().close(view, 1);
  yield* all(
    sequence(0.25, ...lines.map((line) => line.end(0, 1))),
    sequence(
      0.25,
      ...shapes.map((shape) =>
        chain(shape.fill("#ffffff00", 1), shape.end(0, 1))
      )
    )
  );
});
