import { Colors, Glow, Scrollable, Window, Windows98Window } from "../commons";
import {
  Circle,
  CircleProps,
  Gradient,
  Layout,
  Line,
  makeScene2D,
  Rect,
  Txt,
  TxtProps,
} from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  Color,
  createRef,
  createRefArray,
  createSignal,
  deepLerp,
  easeInBounce,
  easeInCubic,
  easeInElastic,
  easeOutCubic,
  linear,
  range,
  ReferenceArray,
  SignalValue,
  spawn,
  unwrap,
  useLogger,
  Vector2,
  waitFor,
} from "@motion-canvas/core";
import { Page } from "../components/Page";
import { ChromaticAberration } from "../components/ChromaticAberration";
import { wpmDuration } from "../util/wpm";
import { Scanlines } from "../components/Scanlines";
import { createReactiveRefArray } from "../util/createReactiveRefArray";
import { Terminal } from "../components/Terminal";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(<Page></Page>);

  const window = createRef<Window>();
  const terminal = createRef<Terminal>();
  const commitContainer = createRef<Layout>();
  const fxContainer = createRef<Rect>();
  const scrollable = createRef<Scrollable>();

  const commitCircles = createReactiveRefArray<Circle>();
  const branchCircles = createReactiveRefArray<Circle>();

  const commitArrays = [commitCircles, branchCircles];

  function* typeAndHitEnter(
    text: SignalValue<string> | TxtProps | (SignalValue<string> | TxtProps)[]
  ) {
    const texts = Array.isArray(text) ? text : [text];

    for (const text of texts) {
      yield* terminal().typeAfterLine(unwrap(text));
    }
    terminal().lineAppear({
      text: "❯ ",
      fill: Colors.Catppuccin.Mocha.Green,
    });
  }

  function* addNewCommit(
    text: string,
    ref: ReferenceArray<Circle>,
    props: CircleProps = {}
  ) {
    const curr = ref.length;
    const prev = ref.slice(-1)[0];
    const nextX = unwrap(props.x) || prev?.right().x + 150 || 0;
    const maxX = Math.max(
      ...commitArrays.map((circles) => circles.slice(-1)[0]?.x() ?? 0)
    );
    if (nextX >= maxX) {
      yield all(
        ...commitArrays.map((circles) =>
          all(
            ...circles.map((circle) => {
              return circle.x(circle.x() - 100, 1);
            })
          )
        )
      );
    }
    yield commitContainer().add(
      <>
        <Circle
          fill={Colors.Catppuccin.Mocha.Surface2}
          ref={(node) => {
            ref(node);
            spawn(node.size(100, 1));
          }}
          x={() => prev?.right().x + 150 || 0}
          y={() => prev?.y() || 0}
          {...props}
        >
          <Txt
            ref={(node) => node.fontSize(() => node.parent().size().x / 2)}
            stroke={Colors.Catppuccin.Mocha.Text}
            lineWidth={4}
            strokeFirst
            text={text}
          />
        </Circle>
        <Line
          points={() => {
            if (ref.length <= curr + 1) return [];
            return [ref[curr].right().addX(10), ref[curr + 1].left().addX(-10)];
          }}
          stroke={Colors.Catppuccin.Mocha.Text}
          lineWidth={4}
          radius={2}
          lineCap={"round"}
          end={() => {
            if (ref.length <= curr + 1) return 0;
            return ref[curr + 1].size().x / 100;
          }}
        ></Line>
      </>
    );
    yield* waitFor(1);
  }

  yield view.add(
    <>
      <Windows98Window
        ref={window}
        width={1200}
        height={560}
        y={-150}
        icon={"material-symbols:terminal"}
        title={"Terminal"}
        headerColor={() =>
          new Gradient({
            stops: [
              {
                color: new Color(Colors.Catppuccin.Mocha.Sky).darken(1),
                offset: 0,
              },
              { color: Colors.Catppuccin.Mocha.Sky, offset: 0.5 },
              { color: Colors.Catppuccin.Mocha.Sky, offset: 1 },
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
        <Layout paddingTop={20} paddingBottom={20}>
          <Terminal
            position={0}
            ref={terminal}
            wpm={240}
            defaultTxtProps={{
              fontSize: 32,
              fontFamily: "Ellograph CF",
            }}
          ></Terminal>
        </Layout>
      </Windows98Window>
      <Glow copyOpacity={0.5}>
        <Scanlines reflectionOffset={5}>
          <Rect ref={fxContainer} y={300} radius={20} key={"fxContainer"} clip>
            <Layout ref={commitContainer}></Layout>
          </Rect>
        </Scanlines>
      </Glow>
    </>
  );
  terminal().lineAppear({ text: "❯ ", fill: Colors.Catppuccin.Mocha.Green });

  yield* window().open(view, 1);

  yield* beginSlide("init");

  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "init",
  ]);

  yield fxContainer().fill(Colors.Catppuccin.Mocha.Text, 0.2);
  yield* fxContainer().size([1600, 5], 0.2, easeInCubic);
  yield fxContainer().fill(Colors.Catppuccin.Mocha.Mantle, 0.5);
  yield* fxContainer().size([1200, 300], 1, easeOutCubic);
  yield fxContainer().fill(
    new Color(Colors.Catppuccin.Mocha.Crust).alpha(0),
    3
  );

  yield* beginSlide("commit");
  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "commit",
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':tada: Initial commit'" },
  ]);

  yield* addNewCommit("🎉", commitCircles);

  const headBranch = createSignal(0);
  const headIndicator = createRef<Circle>();

  commitContainer().add(
    <Circle
      ref={(node) => {
        headIndicator(node);
        spawn(() => node.size(50, 1));
      }}
      fill={Colors.Catppuccin.Mocha.Green}
      size={0}
      position={() => {
        const _commitSub = commitCircles.length;
        const _branchSub = branchCircles.length;
        const [mainCurr] = commitCircles.slice(-1);
        const [mainPrev] = commitCircles.slice(-2, -1);
        const [branchCurr] = branchCircles.slice(-1);
        const [branchPrev] = branchCircles.slice(-2, -1);
        const progress =
          headBranch() < 0.5
            ? mainCurr.size().x / 100
            : branchCurr?.size().x / 100;
        return branchCurr
          ? Vector2.lerp(
              mainPrev
                ? Vector2.lerp(
                    mainPrev?.topRight(),
                    mainCurr?.topRight(),
                    headBranch() < 0.5 ? progress : 1
                  )
                : mainCurr?.topRight(),
              branchPrev
                ? Vector2.lerp(
                    branchPrev?.topRight(),
                    branchCurr.topRight(),
                    headBranch() >= 0.5 ? progress : 1
                  )
                : branchCurr?.topRight(),
              headBranch()
            )
          : Vector2.lerp(
              mainPrev?.topRight() ?? mainCurr?.topRight(),
              mainCurr?.topRight(),
              progress
            );
      }}
    >
      <Txt
        fill={Colors.Catppuccin.Mocha.Crust}
        fontWeight={600}
        ref={(node) => node.fontSize(() => node.parent().size().x / 2)}
      >
        H
      </Txt>
    </Circle>
  );
  yield* waitFor(2);

  yield* beginSlide("more-commits");
  const featureNames = [
    "Add login",
    "Add todo model",
    "Add todo list endpoint",
  ];
  for (const name of featureNames) {
    yield* beginSlide(`commit-${name}`);
    yield* typeAndHitEnter([
      { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
      "commit",
      { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
      {
        fill: Colors.Catppuccin.Mocha.Yellow,
        text: `':sparkles: ${name}'`,
      },
    ]);
    yield* addNewCommit("✨", commitCircles);
    yield* waitFor(1);
  }

  yield* beginSlide("branch");

  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "checkout",
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -b " },
    "feature",
  ]);

  yield all(
    ...commitCircles.map((circle) => {
      return circle.y(circle.y() - 75, 1);
    })
  );
  yield* commitContainer().scale(0.75, 1);

  yield* beginSlide("branch commit");

  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "commit",
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    {
      fill: Colors.Catppuccin.Mocha.Yellow,
      text: "':rocket: Add Google login'",
    },
  ]);

  const currentCircleCount = commitCircles.length;
  yield addNewCommit("🚀", branchCircles, {
    y: 75,
    x: () => commitCircles[currentCircleCount - 1].x() + 200,
  });

  const branchLine = createRef<Line>();
  commitContainer().add(
    <Line
      stroke={Colors.Catppuccin.Mocha.Text}
      lineWidth={4}
      radius={2}
      lineCap={"round"}
      end={0}
      ref={(node) => {
        branchLine(node);
        spawn(() => node.end(1, 1));
      }}
      points={() => {
        const yDiff =
          Math.abs(
            commitCircles[currentCircleCount - 1].bottom().y -
              branchCircles[0].left().y
          ) - 20;
        return [
          commitCircles[currentCircleCount - 1].bottom().addY(10),
          commitCircles[currentCircleCount - 1].bottom().addY(20),
          commitCircles[currentCircleCount - 1].bottom().addY(20).add(yDiff),
          branchCircles[0].left().addX(-10),
        ];
      }}
    ></Line>
  );
  yield* headBranch(1, 1);

  yield* waitFor(2);

  yield* beginSlide("more branch commits");
  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "commit",
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    {
      fill: Colors.Catppuccin.Mocha.Yellow,
      text: "':rocket: Add Discord login'",
    },
  ]);

  yield* addNewCommit("🚀", branchCircles, {});

  yield* beginSlide("back to main");
  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "checkout main",
  ]);
  yield* headBranch(0, 1);

  yield* beginSlide("main commit");
  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "commit",
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    {
      fill: Colors.Catppuccin.Mocha.Yellow,
      text: "':sparkles: Add todo creation form'",
    },
  ]);

  yield* addNewCommit("✨", commitCircles, {});

  yield* beginSlide("merge");
  yield* typeAndHitEnter([
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    "merge ",
    "feature",
  ]);

  yield* branchLine()
    .end(0, 1)
    .do(() => branchLine().opacity(0));

  yield branchCircles[0].position(
    () => commitCircles.slice(-1)[0].left().addX(250),
    1
  );
  yield* headBranch(1, 1);
  commitContainer().add(
    <Line
      stroke={Colors.Catppuccin.Mocha.Text}
      lineWidth={4}
      radius={2}
      lineCap={"round"}
      end={0}
      ref={(node) => spawn(() => node.end(1, 1))}
      points={() => [
        commitCircles.slice(-1)[0].right().addX(10),
        branchCircles[0].left().addX(-10),
      ]}
    ></Line>
  );

  yield* all(
    ...commitCircles.map((circle) => {
      return circle.x(circle.x() - 100, 1);
    })
  );
  yield* waitFor(3);

  yield* beginSlide("end");

  fxContainer().add(
    <Rect
      fill={Colors.Catppuccin.Mocha.Text}
      size={"100%"}
      opacity={0}
      ref={(node) => spawn(() => node.opacity(1, 0.1))}
    />
  );

  yield* waitFor(0.2);
  yield* fxContainer().size([1600, 5], 0.1, easeInCubic);
  yield* fxContainer().size(0, 0.1, easeInCubic);
  yield* waitFor(0.5);
  yield* window().close(view, 1);
});
