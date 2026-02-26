import { Colors, Glow, Scrollable, Window, Windows98Window } from "../commons";
import {
  Gradient,
  Layout,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  Color,
  createRef,
  waitFor,
} from "@motion-canvas/core";
import { Page } from "../components/Page";
import { Scanlines } from "../components/Scanlines";
import { Terminal } from "../components/Terminal";
import { GitGraph } from "../components/GitGraph";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(<Page />);

  const graph = createRef<GitGraph>();
  const terminalWindow = createRef<Window>();
  const terminal = createRef<Terminal>();
  const scrollable = createRef<Scrollable>();
  const graphScrollable = createRef<Scrollable>();

  view.add(
    <>
      <Glow copyOpacity={0.5}>
        <Scanlines rowSize={0.5} reflectionOffset={5}>
          <Scrollable
            ref={graphScrollable}
            width={1800}
            height={700}
            y={-120}
            activeOpacity={0}
            inactiveOpacity={0}
          >
            <GitGraph ref={graph} commitSize={80} commitGap={200} />
          </Scrollable>
        </Scanlines>
      </Glow>
      <Windows98Window
        ref={terminalWindow}
        width={1200}
        height={250}
        y={380}
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
            to: { x: 1200, y: 0 },
          })
        }
        bodyColor={Colors.Catppuccin.Mocha.Crust}
      >
        <Layout
          paddingTop={10}
          paddingBottom={10}
          height={() => terminalWindow().height() - 50}
        >
          <Scrollable ref={scrollable} size={"100%"}>
            <Terminal
              position={0}
              ref={terminal}
              wpm={240}
              width={1200}
              minHeight={120}
              defaultTxtProps={{
                fontSize: 28,
                fontFamily: "Ellograph CF",
              }}
            />
          </Scrollable>
        </Layout>
      </Windows98Window>
    </>
  );

  function* typeCmd(
    ...parts: { fill?: string; text: string }[]
  ) {
    for (const part of parts) {
      yield* terminal().typeAfterLine(part);
    }
    terminal().lineAppear({
      text: "❯ ",
      fill: Colors.Catppuccin.Mocha.Green,
    });
    yield* scrollable().scrollToBottom(0.3);
  }

  terminal().lineAppear({ text: "❯ ", fill: Colors.Catppuccin.Mocha.Green });
  yield scrollable().scrollToBottom(0.3);
  yield* terminalWindow().open(view, 1);

  yield* beginSlide("gitflow-intro");

  yield* graph().initBranch("main", Colors.Catppuccin.Mocha.Red, -80);
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "commit" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':tada: Initial commit'" }
  );
  yield* graph().addCommit("main");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "commit" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':sparkles: Add README'" }
  );
  yield* graph().addCommit("main");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("develop-branch");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "checkout" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -b " },
    { text: "develop" }
  );
  yield* graph().addBranch("develop", Colors.Catppuccin.Mocha.Green, "main", 80);
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "commit" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':sparkles: Add project structure'" }
  );
  yield* graph().addCommit("develop");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("feature-branch");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "checkout" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -b " },
    { text: "feature/add-login develop" }
  );
  yield* graph().addBranch(
    "feature/add-login",
    Colors.Catppuccin.Mocha.Yellow,
    "develop",
    240
  );
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "commit" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':sparkles: Add login form'" }
  );
  yield* graph().addCommit("feature/add-login");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "commit" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':sparkles: Add auth logic'" }
  );
  yield* graph().addCommit("feature/add-login");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("feature-merge");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "checkout develop" }
  );
  yield* waitFor(0.3);
  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "merge feature/add-login" }
  );
  yield* graph().mergeBranch("feature/add-login", "develop");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("more-features");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "checkout" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -b " },
    { text: "feature/add-settings develop" }
  );
  yield* graph().addBranch(
    "feature/add-settings",
    Colors.Catppuccin.Mocha.Yellow,
    "develop",
    240
  );
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "commit" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':sparkles: Add settings page'" }
  );
  yield* graph().addCommit("feature/add-settings");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("merge-feature2");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "checkout develop" }
  );
  yield* waitFor(0.3);
  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "merge feature/add-settings" }
  );
  yield* graph().mergeBranch("feature/add-settings", "develop");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("release");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "checkout main" }
  );
  yield* waitFor(0.3);
  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "merge develop" }
  );
  yield* graph().mergeBranch("develop", "main");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("tag-release");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "tag v1.0.0" }
  );
  yield* graph().addTag("main", "v1.0.0");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* beginSlide("continue-develop");

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "checkout" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -b " },
    { text: "develop" }
  );
  yield* graph().addBranch("develop", Colors.Catppuccin.Mocha.Green, "main", 80);
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* typeCmd(
    { fill: Colors.Catppuccin.Mocha.Green, text: "git " },
    { text: "commit" },
    { fill: Colors.Catppuccin.Mocha.Overlay0, text: " -m " },
    { fill: Colors.Catppuccin.Mocha.Yellow, text: "':sparkles: Start v2 work'" }
  );
  yield* graph().addCommit("develop");
  yield* graphScrollable().scrollTo(graph().parent().cacheBBox().center, 1.0);

  yield* waitFor(1);

  yield* beginSlide("end-gitflow");

  yield* all(
    graph().opacity(0, 1),
    terminalWindow().close(view, 1)
  );
});
