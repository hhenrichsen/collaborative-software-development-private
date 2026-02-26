import {
  belowScreenPosition,
  Colors,
  Glow,
  Windows98Window,
  Window,
} from "../commons";
import {
  Circle,
  Code,
  Gradient,
  Layout,
  Line,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  chain,
  Color,
  createRef,
  delay,
  loop,
  spawn,
  waitFor,
} from "@motion-canvas/core";
import { Page } from "../components/Page";
import { ChromaticAberration } from "../components/ChromaticAberration";
import { Scanlines } from "../components/Scanlines";
import { partTitle } from "../util/partTitle";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(<Page></Page>);

  yield* partTitle(view, "Part 1: Git");

  const window = createRef<Window>();
  const code = createRef<Code>();
  const indicator = createRef<Line>();
  const halo = createRef<Circle>();
  const commit = createRef<Circle>();

  const grandparentCommit = createRef<Circle>();
  const grandparentHalo = createRef<Circle>();
  const grandparentLine = createRef<Line>();

  const greatGrandparentCommit = createRef<Circle>();
  const greatGrandparentHalo = createRef<Circle>();
  const greatGrandparentLine = createRef<Line>();

  const parentCode = createRef<Code>();
  const parentCommit = createRef<Circle>();
  const parentHalo = createRef<Circle>();
  const parentIndicator = createRef<Line>();
  const parentLine = createRef<Line>();
  const parentWindow = createRef<Window>();

  const commitsContainer = createRef<Layout>();

  yield view.add(
    <>
      <Layout ref={commitsContainer}>
        <Glow copyOpacity={0.5}>
          <Scanlines>
            <Circle
              fill={Colors.Catppuccin.Mocha.Green}
              ref={greatGrandparentCommit}
              size={0}
              x={-600}
            >
              <Circle
                fill={Colors.Catppuccin.Mocha.Green}
                ref={greatGrandparentHalo}
              ></Circle>
            </Circle>
            <Line
              ref={greatGrandparentLine}
              points={[
                [-540, 0],
                [-460, 0],
              ]}
              opacity={0}
              start={1}
              stroke={Colors.Catppuccin.Mocha.Text}
              lineWidth={4}
              radius={8}
              lineCap={"round"}
            ></Line>
            <Circle
              fill={Colors.Catppuccin.Mocha.Yellow}
              ref={grandparentCommit}
              size={0}
              x={-400}
            >
              <Circle
                fill={Colors.Catppuccin.Mocha.Yellow}
                ref={grandparentHalo}
              ></Circle>
            </Circle>
            <Line
              ref={grandparentLine}
              points={[
                [-340, 0],
                [-260, 0],
              ]}
              opacity={0}
              start={1}
              stroke={Colors.Catppuccin.Mocha.Text}
              lineWidth={4}
              radius={8}
              lineCap={"round"}
            ></Line>
            <Circle
              fill={Colors.Catppuccin.Mocha.Peach}
              ref={parentCommit}
              size={0}
              x={-200}
            >
              <Circle
                fill={Colors.Catppuccin.Mocha.Peach}
                ref={parentHalo}
              ></Circle>
            </Circle>
            <Line
              ref={parentLine}
              points={[
                [-140, 0],
                [-60, 0],
              ]}
              opacity={0}
              start={1}
              stroke={Colors.Catppuccin.Mocha.Text}
              lineWidth={4}
              radius={8}
              lineCap={"round"}
            ></Line>
            <Circle fill={Colors.Catppuccin.Mocha.Red} ref={commit} size={0}>
              <Circle fill={Colors.Catppuccin.Mocha.Red} ref={halo}></Circle>
            </Circle>
            <Line
              stroke={Colors.Catppuccin.Mocha.Peach}
              radius={8}
              lineWidth={4}
              points={[
                [-200, -60],
                [-200, -100],
                [-200 + 305, -365],
                [180, -365],
              ]}
              opacity={0}
              ref={parentIndicator}
              lineCap={"round"}
              start={1}
            ></Line>
            <Line
              stroke={Colors.Catppuccin.Mocha.Red}
              radius={8}
              lineWidth={4}
              points={[
                [42, 42],
                [130, 130],
                [180, 130],
              ]}
              opacity={0}
              ref={indicator}
              lineCap={"round"}
              start={1}
            ></Line>
          </Scanlines>
        </Glow>
      </Layout>
      <Windows98Window
        title="Commit 5a08ed8"
        titleProps={{ fontFamily: "Ellograph CF" }}
        ref={parentWindow}
        width={700}
        headerColor={() =>
          new Gradient({
            stops: [
              {
                color: new Color(Colors.Catppuccin.Mocha.Peach).darken(1),
                offset: 0,
              },
              { color: Colors.Catppuccin.Mocha.Peach, offset: 0.66 },
              { color: Colors.Catppuccin.Mocha.Peach, offset: 1 },
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
        <Layout padding={20}>
          <Code
            ref={parentCode}
            fontSize={18}
            fontFamily={"Ellograph CF"}
            code={`commit 760e739e677a25557b7ee7268df8bd5fa4c684c5
Author: Hunter
Date:   Fri Feb 28 07:00:00 2025 -0700

    Add User Profile Page
                    `}
          ></Code>
        </Layout>
      </Windows98Window>
      <Windows98Window
        title="Commit 5a08ed8"
        titleProps={{ fontFamily: "Ellograph CF" }}
        ref={window}
        width={700}
        headerColor={() =>
          new Gradient({
            stops: [
              {
                color: new Color(Colors.Catppuccin.Mocha.Red).darken(1),
                offset: 0,
              },
              { color: Colors.Catppuccin.Mocha.Red, offset: 0.66 },
              { color: Colors.Catppuccin.Mocha.Red, offset: 1 },
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
        <Layout padding={20}>
          <Code ref={code} fontSize={18} fontFamily={"Ellograph CF"}></Code>
        </Layout>
      </Windows98Window>
    </>
  );

  window().position(belowScreenPosition(view, window).add([0, 100]));
  parentWindow().position(
    belowScreenPosition(view, parentWindow).add([0, 100])
  );

  yield* beginSlide("commit-in");
  yield* commit().size(100, 1);
  yield delay(
    3,
    loop(function* () {
      const fullSize = 150;
      const delay = 0.1;
      if (commit().size().x > 0) {
        yield halo().size(fullSize, 1).to(0, 0);
        yield halo().opacity(0, 1).to(1, 0);
      }
      yield* waitFor(delay);
      if (parentCommit().size().x > 0) {
        yield parentHalo().size(fullSize, 1).to(0, 0);
        yield parentHalo().opacity(0, 1).to(1, 0);
      }
      yield* waitFor(delay);
      if (grandparentCommit().size().x > 0) {
        yield grandparentHalo().size(fullSize, 1).to(0, 0);
        yield grandparentHalo().opacity(0, 1).to(1, 0);
      }
      yield* waitFor(delay);
      if (greatGrandparentCommit().size().x > 0) {
        yield greatGrandparentHalo().size(fullSize, 1).to(0, 0);
        yield greatGrandparentHalo().opacity(0, 1).to(1, 0);
      }
      yield* waitFor(4 - delay * 3);
    })
  );

  yield* beginSlide("commit-info");
  window().position([550, 300]);
  yield* window().open(view, 1);
  indicator().opacity(1);
  yield* indicator().start(0, 1);

  yield* code().code(`    Add Google OAuth Login`, 1);

  yield* beginSlide("commit-details");
  yield* code().code(
    `commit 5a08ed87646f97587824c4d19f8299027071af20
Author: Hunter
Date:   Fri Feb 28 08:00:00 2025 -0700
    
    Add Google OAuth Login`,
    1
  );

  yield* beginSlide("parent");
  yield code().code(
    `commit 5a08ed87646f97587824c4d19f8299027071af20
Author: Hunter
Date:   Fri Feb 28 08:00:00 2025 -0700
    
    Add Google OAuth Login
  
Parent: 760e739e677a25557b7ee7268df8bd5fa4c684c5
    `,
    1
  );
  parentLine().opacity(1);
  yield parentLine().start(0, 1);
  yield* parentCommit().size(100, 1);
  yield* beginSlide("changes");
  yield* code().code(
    `commit 5a08ed87646f97587824c4d19f8299027071af20
Author: Hunter
Date:   Fri Feb 28 08:00:00 2025 -0700
    
    Add Google OAuth Login
  
Parent: 760e739e677a25557b7ee7268df8bd5fa4c684c5

Changes:
+ src/util/client/google/googleclient.ts
+ src/app/api/auth/google/login/route.ts
+ src/app/api/auth/google/callback/controller.ts
    `,
    1
  );

  yield* beginSlide("parent-info");

  parentWindow().position([550, -200]);
  yield* parentWindow().open(view, 1);
  parentIndicator().opacity(1);
  yield* parentIndicator().start(0, 1);

  yield* beginSlide("history");

  yield* parentCode().code(
    `commit 760e739e677a25557b7ee7268df8bd5fa4c684c5
Author: Hunter
Date:   Fri Feb 28 07:00:00 2025 -0700

    Add User Profile Page
    
Parent: 6422e4cee0d5e9640ee4cee6cdaefb7693dd2d2c

Changes:
+ src/app/(features)/profile/page.tsx
                    `,
    1
  );

  grandparentLine().opacity(1);
  yield grandparentLine().start(0, 1);
  yield grandparentCommit().size(100, 1);

  yield* waitFor(0.5);
  greatGrandparentLine().opacity(1);
  yield greatGrandparentLine().start(0, 1);
  yield greatGrandparentCommit().size(100, 1);

  yield* waitFor(6);
  yield* beginSlide("end git");
  yield indicator()
    .start(1, 1)
    .do(() => indicator().opacity(0));
  yield* waitFor(0.5);
  yield parentIndicator()
    .start(1, 1)
    .do(() => parentIndicator().opacity(0));
  yield* waitFor(0.5);
  yield window().close(view, 1);
  yield* waitFor(0.5);
  yield parentWindow().close(view, 1);

  yield* commitsContainer().x(300, 1);

  yield* waitFor(1.1);
});
