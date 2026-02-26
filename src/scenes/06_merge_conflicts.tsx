import {
  belowScreenPosition,
  Colors,
  Scrollable,
  Window,
  Windows98Window,
} from "../commons";
import { Code, Gradient, Layout, lines, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  cancel,
  chain,
  Color,
  createRef,
  loop,
  sequence,
  waitFor,
} from "@motion-canvas/core";
import { Page } from "../components/Page";
import {
  CatpuccinJavascript,
  CatpuccinMarkdown,
} from "../util/codehighlighter";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);
  yield view.add(<Page></Page>);
  const windowA = createRef<Window>();
  const windowB = createRef<Window>();
  const windowC = createRef<Window>();

  const codeA = createRef<Code>();
  const codeB = createRef<Code>();
  const codeC = createRef<Code>();

  const scrollableB = createRef<Scrollable>();
  const scrollableC = createRef<Scrollable>();

  yield view.add(
    <>
      <Windows98Window
        ref={windowA}
        width={550}
        height={1000}
        x={-600}
        icon={"material-symbols:code"}
        title={"Local Code"}
        headerColor={() =>
          new Gradient({
            stops: [
              {
                color: new Color(Colors.Catppuccin.Mocha.Red)
                  .darken(1)
                  .saturate(0.2),
                offset: 0,
              },
              { color: Colors.Catppuccin.Mocha.Red, offset: 0.5 },
              { color: Colors.Catppuccin.Mocha.Red, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: windowA().size().x,
              y: 0,
            },
          })
        }
        bodyColor={Colors.Catppuccin.Mocha.Crust}
      >
        <Layout padding={[20, 0, 20, 20]}>
          <Code ref={codeA} fontSize={30}></Code>
        </Layout>
      </Windows98Window>{" "}
      <Windows98Window
        ref={windowB}
        width={550}
        height={1000}
        icon={"material-symbols:code"}
        title={"Resolved Code"}
        headerColor={() =>
          new Gradient({
            stops: [
              {
                color: new Color(Colors.Catppuccin.Mocha.Yellow)
                  .darken(1)
                  .saturate(0.2),
                offset: 0,
              },
              { color: Colors.Catppuccin.Mocha.Yellow, offset: 0.5 },
              { color: Colors.Catppuccin.Mocha.Yellow, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: windowA().size().x,
              y: 0,
            },
          })
        }
        bodyColor={Colors.Catppuccin.Mocha.Crust}
      >
        <Layout padding={[20, 0, 20, 20]}>
          <Scrollable
            size={"100%"}
            height={900}
            ref={scrollableB}
            inactiveOpacity={0}
          >
            <Code ref={codeB} fontSize={30}></Code>
          </Scrollable>
        </Layout>
      </Windows98Window>{" "}
      <Windows98Window
        ref={windowC}
        width={550}
        height={1000}
        x={600}
        icon={"material-symbols:code"}
        title={"Remote Code"}
        headerColor={() =>
          new Gradient({
            stops: [
              {
                color: new Color(Colors.Catppuccin.Mocha.Green)
                  .darken(1)
                  .saturate(0.2),
                offset: 0,
              },
              { color: Colors.Catppuccin.Mocha.Green, offset: 0.5 },
              { color: Colors.Catppuccin.Mocha.Green, offset: 1 },
            ],
            type: "linear",
            from: { x: 0, y: 0 },
            to: {
              x: windowA().size().x,
              y: 0,
            },
          })
        }
        bodyColor={Colors.Catppuccin.Mocha.Crust}
      >
        <Layout padding={[20, 0, 20, 20]}>
          <Scrollable
            size={"100%"}
            height={900}
            ref={scrollableC}
            inactiveOpacity={0}
          >
            <Code ref={codeC} fontSize={30}></Code>
          </Scrollable>
        </Layout>
      </Windows98Window>
    </>
  );
  const windowAPos = windowA().position();
  windowA().position(belowScreenPosition(view, windowA).addY(100));

  const windowBPos = windowB().position();
  windowB().position(belowScreenPosition(view, windowB).addY(100));

  const windowCPos = windowC().position();
  windowC().position(belowScreenPosition(view, windowC).addY(100));

  yield* beginSlide("merge conflicts");

  windowA().position(windowAPos);
  yield windowA().open(view, 1);
  yield* waitFor(0.5);

  windowB().position(windowBPos);
  yield windowB().open(view, 1);
  yield* waitFor(0.5);

  windowC().position(windowCPos);
  yield* windowC().open(view, 1);

  codeA().highlighter(CatpuccinMarkdown);
  codeB().highlighter(CatpuccinMarkdown);
  codeC().highlighter(CatpuccinMarkdown);
  scrollableB().scrollOffset(() => [
    (510 - codeB().size().x) / 2,
    (900 - codeB().size().y) / 2,
  ]);
  scrollableC().scrollOffset(() => [
    (510 - codeC().size().x) / 2,
    (900 - codeC().size().y) / 2,
  ]);
  yield* codeB().code(
    `# My Project
    
*This is a cool project!*

## Installation

Clone the repo and figure
it out yourself :)
`,
    1
  );
  yield* codeA().code(
    `# My Project
    
*This is a cool project that 
helps you write code!*

## Installation

Clone the repo and figure
it out yourself :)
`,
    1
  );

  yield* codeC().code(
    `# My Project
    
*This is a cool project!*

## Installation

\`\`\`bash
npm install my-project
\`\`\``,
    1
  );

  yield* beginSlide("resolve simple");

  yield* codeB().code(
    `# My Project

*This is a cool project that
helps you write code!*

## Installation

\`\`\`bash
npm install my-project
\`\`\``,
    1
  );

  yield* beginSlide("simple out");
  yield* all(codeA().code("", 1), codeC().code("", 1), codeB().code("", 1));
  codeA().highlighter(CatpuccinJavascript);
  codeB().highlighter(CatpuccinJavascript);
  codeC().highlighter(CatpuccinJavascript);

  yield* beginSlide("complex in");

  codeA().fontSize(20);
  codeB().fontSize(20);
  codeC().fontSize(20);
  yield* codeB().code(
    `import { Hono } from "hono";

const app = new Hono();

app.get("/", async (ctx) => {
  ctx.header("Content-Type", "text/plain");
  ctx.body("Hello world!");
  return ctx.status(200);
});

app.get("/api/health", async (ctx) => {
  ctx.header("Content-Type", "application/json");
  ctx.json({ status: "ok" });
  return ctx.status(200);
});

export default app;
    `,
    1
  );

  yield* codeA().code(
    `import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import api from "./routes/api";

const app = new Hono();

app.use(secureHeaders());

app.get("/", async (ctx) => {
  ctx.header("Content-Type", "text/plain");
  ctx.body("Hello world!");
  return ctx.status(200);
});

app.route("/api", api);

export default app;`,
    1
  );

  yield* codeC().code(
    `import { Hono } from "hono";
import { migrate } from "./db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "./db";
import { todos } from "./db/schema";

migrate();

const app = new Hono();

app.get("/", async (ctx) => {
  ctx.header("Content-Type", "text/plain");
  ctx.body("Hello world!");
  return ctx.status(200);
});

app.get("/api/health", async (ctx) => {
  ctx.header("Content-Type", "application/json");
  ctx.json({ status: "ok" });
  return ctx.status(200);
});

const todoSchema = z.object({
  content: z.string().nonempty(),
  done: z.boolean().optional(),
});

app.post("/api/todos", 
  zValidator("json", todoSchema), 
  async (ctx) => {
    const { 
      content, 
      done 
    } = ctx.req.valid("json");
    try {
      const [{ id }] = await db
        .insert(todos)
        .values({ content, done })
        .returning({ id: todos.id });
      ctx.status(201);
      return ctx.json({ id });
    } catch (e) {
      console.error(e);
      ctx.status(500);
      return ctx.json({ id: null });
    }
});

export default app;`,
    1
  );
  const loopC = yield loop(() =>
    chain(
      scrollableC().scrollToTop(2),
      waitFor(3),
      scrollableC().scrollToBottom(2),
      waitFor(3)
    )
  );

  yield* beginSlide("try merge");
  yield* codeB().code(
    `import { Hono } from "hono";
<<<<<<< HEAD
import { migrate } from "./db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "./db";
import { todos } from "./db/schema";

migrate();
=======
import { secureHeaders } from "hono/secure-headers";
import api from "./routes/api";
>>>>>>> my-branch

const app = new Hono();

app.use(secureHeaders());

app.get("/", async (ctx) => {
  ctx.header("Content-Type", "text/plain");
  ctx.body("Hello world!");
  return ctx.status(200);
});

<<<<<<< HEAD
app.get("/api/health", async (ctx) => {
  ctx.header("Content-Type", "application/json");
  ctx.json({ status: "ok" });
  return ctx.status(200);
});

const todoSchema = z.object({
  content: z.string().nonempty(),
  done: z.boolean().optional(),
});

app.post("/api/todos", 
  zValidator("json", todoSchema), 
  async (ctx) => {
    const { 
      content, 
      done 
    } = ctx.req.valid("json");
    try {
      const [{ id }] = await db
        .insert(todos)
        .values({ content, done })
        .returning({ id: todos.id });
      ctx.status(201);
      return ctx.json({ id });
    } catch (e) {
      console.error(e);
      ctx.status(500);
      return ctx.json({ id: null });
    }
  }
);
=======
app.route("/api", api);
>>>>>>> my-branch

export default app;
`,
    1
  );

  const loopB = yield loop(() =>
    chain(
      scrollableB().scrollToTop(3),
      waitFor(2),
      scrollableB().scrollToBottom(3),
      waitFor(2)
    )
  );

  yield* beginSlide("highlight conflicts");
  yield* codeB().selection([lines(1, 12), lines(24, 59)], 1);

  yield* beginSlide("resolve conflicts");

  cancel(loopB);
  scrollableB().scrollOffset(() => [
    (510 - codeB().size().x) / 2,
    (900 - codeB().size().y) / 2,
  ]);
  yield* codeB().selection([lines(0, Infinity)], 1);
  yield* codeB().code(
    `import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import api from "./routes/api";
import { migrate } from "./db";

migrate();

const app = new Hono();

app.use(secureHeaders());

app.get("/", async (ctx) => {
  ctx.header("Content-Type", "text/plain");
  ctx.body("Hello world!");
  return ctx.status(200);
});

app.route("/api", api);

export default app;
`,
    1
  );

  yield* beginSlide("end");
  yield* sequence(
    0.5,
    windowA().close(view, 1),
    windowB().close(view, 1),
    windowC().close(view, 1)
  );
});
