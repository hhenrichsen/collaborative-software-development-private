import {
  belowScreenPosition,
  Colors,
  Glow,
  Scrollable,
  Window,
  Windows98Window,
} from "../commons";
import {
  Circle,
  Code,
  Gradient,
  Layout,
  LayoutProps,
  lines,
  makeScene2D,
  Rect,
  RectProps,
  Txt,
  View2D,
} from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  cancel,
  chain,
  Color,
  createDeferredEffect,
  createEffect,
  createRef,
  createRefArray,
  linear,
  loop,
  PlaybackState,
  range,
  Reference,
  ReferenceReceiver,
  sequence,
  spawn,
  useLogger,
  useRandom,
  useScene,
  Vector2,
  waitFor,
} from "@motion-canvas/core";
import { Page } from "../components/Page";
import {
  CatpuccinJavascript,
  CatpuccinMarkdown,
} from "../util/codehighlighter";
import { Scanlines } from "../components/Scanlines";
import { partTitle } from "../util/partTitle";
import { playbackWait } from "../util/playbackWait";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(
    <Page>
      <Glow copyOpacity={0.5}>
        <Scanlines rowSize={4}>
          <CardStack
            view={view}
            rotation={10}
            y={-400}
            x={100}
            opacity={0.5}
            speed={-0.25}
          ></CardStack>
          <CardStack
            view={view}
            speed={0.33}
            x={600}
            y={-400}
            rotation={10}
            opacity={0.5}
          ></CardStack>
          <CardStack
            view={view}
            speed={0.2}
            x={-400}
            y={-400}
            rotation={10}
            opacity={0.5}
          ></CardStack>
        </Scanlines>
      </Glow>
    </Page>
  );

  const window = createRef<Window>();

  const txts = createRefArray<Txt>();

  yield* partTitle(view, "Part 2: Documentation");

  const whatWindow = createRef<Window>();
  yield view.add(
    <Windows98Window
      title={"Tickets"}
      icon={"octicon:issue-closed-16"}
      ref={whatWindow}
      headerColor={() =>
        new Gradient({
          stops: [
            {
              color: new Color(Colors.Catppuccin.Mocha.Sky)
                .darken(1)
                .saturate(0.2),
              offset: 0,
            },
            { color: Colors.Catppuccin.Mocha.Sky, offset: 0.5 },
            { color: Colors.Catppuccin.Mocha.Sky, offset: 1 },
          ],
          type: "linear",
          from: { x: 0, y: 0 },
          to: {
            x: whatWindow().size().x,
            y: 0,
          },
        })
      }
      bodyColor={Colors.Catppuccin.Mocha.Crust}
      size={[800, 400]}
    >
      <Layout layout padding={20} direction={"column"}>
        <Txt
          fontFamily={"Addington CF"}
          fontSize={40}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          marginBottom={20}
          fontWeight={600}
          opacity={0}
          ref={txts}
        >
          What's a Ticket?
        </Txt>
        <Txt
          fontFamily={"Greycliff CF"}
          fontSize={32}
          opacity={0}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          ref={txts}
        >
          {"\u2022"} GitHub Issue
        </Txt>
        <Txt
          fontFamily={"Greycliff CF"}
          fontSize={32}
          opacity={0}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          ref={txts}
        >
          {"\u2022"} Trello Card
        </Txt>
        <Txt
          fontFamily={"Greycliff CF"}
          fontSize={32}
          opacity={0}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          ref={txts}
        >
          {"\u2022"} Sticky note stuck to a whiteboard
        </Txt>
      </Layout>
    </Windows98Window>
  );
  whatWindow().position(belowScreenPosition(view, whatWindow()).addY(100));

  yield* beginSlide("open what window");
  whatWindow().position([-300, -200]);
  yield whatWindow().open(view, 1);
  yield* playbackWait(2);

  for (const txt of txts.slice(0, 4)) {
    yield* beginSlide(`in-${txt.text()}`);
    yield txt.opacity(1, 1);
    yield* playbackWait(1);
  }

  yield view.add(
    <Windows98Window
      title={"Why Tickets"}
      icon={"octicon:issue-closed-16"}
      ref={window}
      headerColor={() =>
        new Gradient({
          stops: [
            {
              color: new Color(Colors.Catppuccin.Mocha.Lavender)
                .darken(1)
                .saturate(0.2),
              offset: 0,
            },
            { color: Colors.Catppuccin.Mocha.Lavender, offset: 0.5 },
            { color: Colors.Catppuccin.Mocha.Lavender, offset: 1 },
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
      size={[800, 400]}
    >
      <Layout layout padding={20} direction={"column"}>
        <Txt
          fontFamily={"Addington CF"}
          fontSize={40}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          marginBottom={20}
          fontWeight={600}
          opacity={0}
          ref={txts}
        >
          Why should I have tickets in my project?
        </Txt>
        <Txt
          fontFamily={"Greycliff CF"}
          fontSize={32}
          opacity={0}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          ref={txts}
        >
          {"\u2022"} Know what needs to be done and what's next
        </Txt>
        <Txt
          fontFamily={"Greycliff CF"}
          fontSize={32}
          opacity={0}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          ref={txts}
        >
          {"\u2022"} See who's working on what
        </Txt>
        <Txt
          fontFamily={"Greycliff CF"}
          fontSize={32}
          opacity={0}
          textWrap
          fill={Colors.Catppuccin.Mocha.Text}
          ref={txts}
        >
          {"\u2022"} Store newfound work and bugs without needing to keep it in
          your head
        </Txt>
      </Layout>
    </Windows98Window>
  );
  window().position(belowScreenPosition(view, window()).addY(100));

  yield* beginSlide("open why window");
  window().position([300, 200]);
  yield window().open(view, 1);
  yield* playbackWait(1);

  for (const txt of txts.slice(4)) {
    yield* beginSlide(`in-${txt.text()}`);
    yield txt.opacity(1, 1);
    yield* playbackWait(1);
  }

  yield* beginSlide("close window");
  const el = view
    .childrenAs<Layout>()[1]
    .childrenAs<Layout>()[0]
    .childrenAs<Layout>()[0]
    .childrenAs<Layout>();
  yield whatWindow().close(view, 1);
  yield window().close(view, 1);
  yield* all(
    ...el.map((stack) =>
      sequence(0.25, ...stack.children().map((card) => card.opacity(0, 1)))
    )
  );
});

const CardStack = ({
  ref,
  view,
  speed = 1,
  ...props
}: LayoutProps & { view: View2D; speed?: number }) => {
  return (
    <Layout
      {...props}
      direction={"column"}
      gap={40}
      ref={(node: Layout) => {
        ref?.(node);
        spawn(
          loop(() =>
            node.position(
              node
                .position()
                .add(Vector2.fromDegrees(node.rotation() - 90).mul(80 * speed)),
              1,
              linear
            )
          )
        );
      }}
    >
      {range(8).map((i) => (
        <Card
          ref={(node) => {
            spawn(function* () {
              createEffect(() => {
                if (node.absolutePosition().y < 200) {
                  node.position(node.position().addY(8 * 200));
                }
                if (node.absolutePosition().y > view.size().y + 200) {
                  node.position(node.position().addY(-8 * 200));
                }
              });
              yield* waitFor(i * 0.25);
              yield* node.opacity(1, 1);
            });
          }}
          y={i * 200}
          opacity={0}
        ></Card>
      ))}
    </Layout>
  );
};

const Card = ({ ref, ...props }: RectProps) => {
  const random = useRandom();
  const titleWords = random.nextInt(2, 4);
  const segmentLength = new Array(titleWords)
    .fill(0)
    .map(() => random.nextInt(70, 150));
  return (
    <Rect
      ref={ref}
      width={400}
      height={150}
      stroke={Colors.Catppuccin.Mocha.Text}
      lineWidth={2}
      radius={16}
      {...props}
      layout
      cache
    >
      <Layout size={"100%"} layout direction={"column"} gap={20} padding={20}>
        <Layout direction="row" gap={10}>
          <Circle
            size={20}
            fill={
              [
                Colors.Catppuccin.Mocha.Red,
                Colors.Catppuccin.Mocha.Peach,
                Colors.Catppuccin.Mocha.Yellow,
                Colors.Catppuccin.Mocha.Green,
                Colors.Catppuccin.Mocha.Sky,
              ][random.nextInt(0, 5)]
            }
          />
          {segmentLength.map((length) => (
            <Rect
              width={length}
              height={20}
              radius={8}
              fill={Colors.Catppuccin.Mocha.Surface2}
            />
          ))}
        </Layout>
        <Rect
          grow={1}
          width={"100%"}
          fill={Colors.Catppuccin.Mocha.Surface2}
          radius={8}
        ></Rect>
      </Layout>
    </Rect>
  );
};
