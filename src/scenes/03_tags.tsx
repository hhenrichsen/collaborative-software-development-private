import { Colors, Glow } from "../commons";
import {
  Circle,
  Icon,
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
  createRef,
  createRefArray,
  sequence,
  waitFor,
} from "@motion-canvas/core";
import { Page } from "../components/Page";
import { Scanlines } from "../components/Scanlines";
import { zip } from "../util/zip";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(<Page></Page>);

  const commitsContainer = createRef<Layout>();
  const mainCommits = createRefArray<Circle>();
  const mainJoiners = createRefArray<Line>();
  const commitHalos = createRefArray<Circle>();

  view.add(
    <Glow copyOpacity={0.5}>
      <Scanlines rowSize={0.5}>
        <Layout ref={commitsContainer}>
          <Circle
            fill={Colors.Catppuccin.Mocha.Green}
            ref={mainCommits}
            size={100}
            x={-300}
          >
            <Circle
              fill={() => mainCommits[0].fill()}
              ref={commitHalos}
            ></Circle>
          </Circle>
          <Line
            points={() => [
              mainCommits[0].right().addX(10),
              mainCommits[1].left().addX(-10),
            ]}
            ref={mainJoiners}
            stroke={Colors.Catppuccin.Mocha.Text}
            lineWidth={4}
            radius={8}
            lineCap={"round"}
          ></Line>
          <Circle
            fill={Colors.Catppuccin.Mocha.Yellow}
            ref={mainCommits}
            size={100}
            x={-100}
          >
            <Circle
              fill={() => mainCommits[1].fill()}
              ref={commitHalos}
            ></Circle>
          </Circle>
          <Line
            points={() => [
              mainCommits[1].right().addX(10),
              mainCommits[2].left().addX(-10),
            ]}
            ref={mainJoiners}
            stroke={Colors.Catppuccin.Mocha.Text}
            lineWidth={4}
            radius={8}
            lineCap={"round"}
          ></Line>
          <Circle
            fill={Colors.Catppuccin.Mocha.Peach}
            ref={mainCommits}
            size={100}
            x={100}
          >
            <Circle
              fill={() => mainCommits[2].fill()}
              ref={commitHalos}
            ></Circle>
          </Circle>
          <Line
            points={() => [
              mainCommits[2].right().addX(10),
              mainCommits[3].left().addX(-10),
            ]}
            ref={mainJoiners}
            stroke={Colors.Catppuccin.Mocha.Text}
            lineWidth={4}
            radius={8}
            lineCap={"round"}
          ></Line>
          <Circle
            fill={Colors.Catppuccin.Mocha.Red}
            ref={mainCommits}
            size={100}
            x={300}
          >
            <Circle
              fill={() => mainCommits[3].fill()}
              ref={commitHalos}
            ></Circle>
          </Circle>
        </Layout>
      </Scanlines>
    </Glow>
  );

  yield* beginSlide("standard-color");

  yield all(
    ...mainCommits.map((commit) => commit.fill(Colors.Catppuccin.Mocha.Red, 1))
  );

  const headIndicator = createRef<Line>();
  const headContainer = createRef<Rect>();
  const headText = createRef<Txt>();

  commitsContainer().add(
    <>
      <Line
        points={() => [
          mainCommits[3].top().addY(-10),
          mainCommits[3].top().addY(-40),
        ]}
        stroke={Colors.Catppuccin.Mocha.Green}
        lineWidth={4}
        ref={headIndicator}
        end={0}
        opacity={0}
        lineCap={"round"}
      ></Line>
      <Rect
        x={300}
        y={-122}
        width={150}
        height={60}
        radius={8}
        end={0.67}
        start={0.67}
        ref={headContainer}
        stroke={Colors.Catppuccin.Mocha.Green}
        lineWidth={2}
      >
        <Txt opacity={0} ref={headText} fontWeight={600}>
          HEAD
        </Txt>
      </Rect>
    </>
  );

  yield* beginSlide("head");

  headIndicator().opacity(1);
  yield* chain(
    headIndicator().end(1, 1),
    all(headContainer().end(1, 1), headContainer().start(0, 1)),
    headContainer().fill(Colors.Catppuccin.Mocha.Green, 1),
    headText().opacity(1, 1)
  );

  const versionIndicator = createRef<Line>();
  const versionContainer = createRef<Line>();
  const versionText = createRef<Txt>();

  commitsContainer().add(
    <Layout>
      <Line
        points={[
          headContainer().top().addY(-10),
          headContainer().top().addY(-40),
        ]}
        stroke={Colors.Catppuccin.Mocha.Peach}
        lineWidth={4}
        ref={versionIndicator}
        end={0}
        opacity={0}
        lineCap={"round"}
      ></Line>
      <Line
        x={300}
        y={() => headContainer().top().addY(-70).y}
        points={[
          [-85, -30],
          [75, -30],
          [75, 30],
          [-85, 30],
          [-115, 0],
        ]}
        closed
        width={150}
        height={60}
        radius={8}
        end={0.67}
        start={0.67}
        ref={versionContainer}
        stroke={Colors.Catppuccin.Mocha.Peach}
        lineWidth={2}
      >
        <Txt opacity={0} ref={versionText} fontWeight={600}>
          v1.0.0
        </Txt>
      </Line>
      <Circle
        size={20}
        fill={Colors.Catppuccin.Mocha.Crust}
        position={() => versionContainer().left().addX(10)}
      ></Circle>
    </Layout>
  );

  yield* beginSlide("tags");
  versionIndicator().opacity(1);
  yield* chain(
    versionIndicator().end(1, 1),
    all(versionContainer().end(1, 1), versionContainer().start(0, 1)),
    versionContainer().fill(Colors.Catppuccin.Mocha.Peach, 1),
    versionText().opacity(1, 1)
  );

  const newCommitLine = createRef<Line>();

  yield* beginSlide("stay in place");
  commitsContainer().add(
    <>
      <Circle
        ref={mainCommits}
        size={0}
        x={500}
        fill={Colors.Catppuccin.Mocha.Red}
      ></Circle>
      <Line
        points={() => [
          mainCommits[3].right().addX(10),
          mainCommits[4].left().addX(-10),
        ]}
        ref={mainJoiners}
        stroke={Colors.Catppuccin.Mocha.Text}
        lineWidth={4}
        end={0}
        opacity={0}
        lineCap={"round"}
      ></Line>
    </>
  );

  yield mainCommits[4].size(100, 1);
  yield commitsContainer().x(-100, 1);
  mainJoiners[3].opacity(1);
  yield* mainJoiners[3].end(1, 1);
  yield versionContainer().position(mainCommits[3].top().addY(-70), 1);
  yield versionIndicator().points(
    [mainCommits[3].top().addY(-10), mainCommits[3].top().addY(-40)],
    1
  );
  yield headIndicator().x(200, 1);
  yield* headContainer().x(500, 1);

  yield* beginSlide("new commit");
  commitsContainer().add(
    <>
      <Circle
        fill={Colors.Catppuccin.Mocha.Red}
        x={700}
        ref={mainCommits}
      ></Circle>
      <Line
        points={() => [
          mainCommits[4].right().addX(10),
          mainCommits[5].left().addX(-10),
        ]}
        stroke={Colors.Catppuccin.Mocha.Text}
        lineWidth={4}
        ref={mainJoiners}
        end={0}
        opacity={0}
        lineCap={"round"}
      ></Line>
    </>
  );

  yield mainCommits[5].size(100, 1);
  yield commitsContainer().x(-200, 1);
  mainJoiners[4].opacity(1);
  yield* mainJoiners[4].end(1, 1);
  yield headIndicator().x(() => mainCommits.slice(-1)[0].x() - 300, 1);
  yield* headContainer().x(() => mainCommits.slice(-1)[0].x(), 1);

  const branchLine = createRef<Line>();
  const branchCommits = createRefArray<Circle>();
  const branchJoiners = createRefArray<Line>();

  yield* beginSlide("branch");
  commitsContainer().add(
    <>
      <Line
        points={() => [
          mainCommits[1].bottom().addY(10),
          mainCommits[1].bottom().addY(20),
          mainCommits[1].bottom().addY(20).add(80),
          branchCommits[0].left().addX(-10),
        ]}
        stroke={Colors.Catppuccin.Mocha.Text}
        lineWidth={4}
        ref={branchLine}
        lineCap={"round"}
        opacity={0}
        end={0}
      ></Line>
      <Circle
        fill={Colors.Catppuccin.Mocha.Yellow}
        y={150}
        x={100}
        ref={branchCommits}
      ></Circle>
      <Line
        points={() => [
          branchCommits[0].right().addX(10),
          branchCommits[1].left().addX(-10),
        ]}
        stroke={Colors.Catppuccin.Mocha.Text}
        ref={branchJoiners}
        lineWidth={4}
        lineCap={"round"}
        opacity={0}
        end={0}
      ></Line>
      <Circle
        fill={Colors.Catppuccin.Mocha.Yellow}
        ref={branchCommits}
        x={300}
        y={150}
      ></Circle>
      <Line
        points={() => [
          branchCommits[1].right().addX(10),
          branchCommits[2].left().addX(-10),
        ]}
        stroke={Colors.Catppuccin.Mocha.Text}
        ref={branchJoiners}
        lineWidth={4}
        lineCap={"round"}
        opacity={0}
        end={0}
      ></Line>
      <Circle
        fill={Colors.Catppuccin.Mocha.Yellow}
        ref={branchCommits}
        x={500}
        y={150}
      ></Circle>
    </>
  );

  branchLine().opacity(1);
  yield* sequence(
    0.5,
    branchLine().end(1, 1),
    ...zip(
      branchCommits.map((commit) => commit.size(100, 1)),
      branchJoiners.map((joiner) =>
        (function* () {
          yield* waitFor(0.5);
          joiner.opacity(1);
          yield* joiner.end(1, 1);
        })()
      )
    ).map(([a, b]) => all(a, b))
  );

  yield* beginSlide("branches");

  const mainIndicator = createRef<Line>();
  const branchIndicator = createRef<Line>();
  const mainLabel = createRef<Layout>();
  const branchLabel = createRef<Layout>();

  yield commitsContainer().add(
    <>
      <Line
        points={() => [
          mainCommits.slice(-1)[0].position().addX(60),
          mainCommits.slice(-1)[0].position().addX(160),
        ]}
        startArrow
        stroke={Colors.Catppuccin.Mocha.Text}
        lineWidth={4}
        start={1}
        ref={mainIndicator}
      />
      <Line
        points={() => [
          branchCommits.slice(-1)[0].position().addX(60),
          branchCommits.slice(-1)[0].position().addX(160),
        ]}
        startArrow
        stroke={Colors.Catppuccin.Mocha.Text}
        lineWidth={4}
        start={1}
        ref={branchIndicator}
      />
      <Layout
        direction={"row"}
        layout
        alignItems={"center"}
        gap={10}
        left={() => mainCommits.slice(-1)[0].position().addX(170)}
        ref={mainLabel}
        opacity={0}
      >
        <Icon
          icon="octicon:git-branch-16"
          color={Colors.Catppuccin.Mocha.Red}
          size={40}
        ></Icon>
        <Txt fill={Colors.Catppuccin.Mocha.Red} fontFamily={"Ellograph CF"}>
          main
        </Txt>
      </Layout>
      <Layout
        direction={"row"}
        layout
        alignItems={"center"}
        gap={10}
        left={() => branchCommits.slice(-1)[0].position().addX(170)}
        ref={branchLabel}
        opacity={0}
      >
        <Icon
          icon="octicon:git-branch-16"
          color={Colors.Catppuccin.Mocha.Yellow}
          size={40}
        ></Icon>
        <Txt fill={Colors.Catppuccin.Mocha.Yellow} fontFamily={"Ellograph CF"}>
          my-feature
        </Txt>
      </Layout>
    </>
  );

  commitsContainer().add(
    <>
      <Circle
        fill={Colors.Catppuccin.Mocha.Yellow}
        ref={branchCommits}
        x={500}
        y={150}
      ></Circle>
      <Line
        points={() => [
          branchCommits[2].right().addX(10),
          branchCommits[3].left().addX(-10),
        ]}
        stroke={Colors.Catppuccin.Mocha.Text}
        ref={branchJoiners}
        lineWidth={4}
        lineCap={"round"}
        opacity={0}
        end={0}
      ></Line>
      <Circle
        fill={Colors.Catppuccin.Mocha.Red}
        ref={mainCommits}
        x={700}
      ></Circle>
      <Line
        points={() => [
          mainCommits[5].right().addX(10),
          mainCommits[6].left().addX(-10),
        ]}
        stroke={Colors.Catppuccin.Mocha.Text}
        ref={mainJoiners}
        lineWidth={4}
        lineCap={"round"}
        opacity={0}
        end={0}
      ></Line>
    </>
  );

  mainIndicator().opacity(1);
  branchIndicator().opacity(1);
  yield mainLabel().opacity(1, 1);
  yield branchLabel().opacity(1, 1);
  yield mainIndicator().start(0, 1);
  yield* branchIndicator().start(0, 1);
  yield* commitsContainer().x(-300, 1);

  yield* beginSlide("more-commits");
  yield* commitsContainer().x(-400, 1);
  yield mainCommits[6].x(900, 1);
  yield* waitFor(0.5);
  yield branchCommits[3].x(700, 1);
  yield* waitFor(0.5);
  yield mainCommits[6].size(100, 1);
  yield* waitFor(0.5);
  yield branchCommits[3].size(100, 1);
  mainJoiners[5].opacity(1);
  branchJoiners[2].opacity(1);
  yield mainJoiners[5].end(1, 1);
  yield* waitFor(0.5);
  yield* branchJoiners[2].end(1, 1);

  yield* beginSlide("merge");
  yield branchLabel().opacity(0, 1);
  yield* branchIndicator()
    .start(1, 1)
    .do(() => branchIndicator().opacity(0));
  yield* branchLine()
    .start(1, 1)
    .do(() => branchLine().opacity(0));

  yield commitsContainer().scale(0.7, 1);
  yield* commitsContainer().x(-600, 1);
  const offset = mainCommits[6].position();
  yield mainIndicator().points(
    () => [
      [1760, 0],
      [1860, 0],
    ],
    1
  );
  yield headIndicator().x(() => branchCommits.slice(-1)[0].x() - 300, 1);
  yield headContainer().x(() => branchCommits.slice(-1)[0].x(), 1);
  yield mainLabel().left([1870, 0], 1);
  for (const [i, commit] of branchCommits.entries()) {
    yield commit.position(offset.addX((i + 1) * 200), 1);
  }
  yield* waitFor(1);

  commitsContainer().add(
    <Line
      points={() => [
        mainCommits.slice(-1)[0].right().addX(10),
        branchCommits[0].left().addX(-10),
      ]}
      stroke={Colors.Catppuccin.Mocha.Text}
      lineWidth={4}
      end={0}
      lineCap={"round"}
      ref={mainJoiners}
    />
  );

  yield* mainJoiners[6].end(1, 1);
  yield all(
    ...branchCommits.map((commit) =>
      commit.fill(Colors.Catppuccin.Mocha.Red, 1)
    )
  );
  yield* waitFor(1);

  yield* beginSlide("end tags");

  yield* commitsContainer().opacity(0, 1);
});
