import { Colors, Scrollable, Window, Windows98Window } from "../commons";
import {
  Code,
  Gradient,
  Layout,
  lines,
  makeScene2D,
  Txt,
} from "@motion-canvas/2d";
import { Page } from "../components/Page";
import { playbackWait } from "../util/playbackWait";
import {
  beginSlide,
  Color,
  createRef,
  createRefArray,
  delay,
  useLogger,
} from "@motion-canvas/core";
import { CatpuccinJavascript } from "../util/codehighlighter";
import { partTitle } from "../util/partTitle";

export default makeScene2D(function* (view) {
  view.fill(Colors.Catppuccin.Mocha.Crust);

  yield view.add(<Page />);

  yield* partTitle(view, "Part 4: Dependency Injection");

  const window = createRef<Window>();
  const code = createRef<Code>();
  const scrollable = createRef<Scrollable>();

  yield* beginSlide("open");
  yield view.add(
    <Windows98Window
      title="Dependency Injection"
      width={1400}
      height={800}
      ref={window}
      bodyColor={Colors.Catppuccin.Mocha.Crust}
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
            x: window().size().x,
            y: 0,
          },
        })
      }
    >
      <Layout padding={[20, 0, 20, 20]} height={() => window().height() - 50}>
        <Scrollable size={"100%"} ref={scrollable}>
          <Code
            ref={code}
            highlighter={CatpuccinJavascript}
            fontFamily={"Ellograph CF"}
            fontSize={24}
          ></Code>
        </Scrollable>
      </Layout>
    </Windows98Window>
  );

  scrollable().scrollOffset(() =>
    scrollable()
      .parentAs<Layout>()
      .size()
      .sub(scrollable().parentAs<Layout>().padding())
      .sub(code().size())
      .div(2)
  );
  yield* window().open(view, 1);

  yield* playbackWait(1);

  yield* code().code(
    `interface Todo {
  id: number;
  title: string;
  done: boolean;
}
    
interface TodoModel {
  getTodoById(id: number): Todo | undefined;    
  getTodos(): Todo[];
  createTodo(todo: Partial<Todo>): Todo;
}
    `,
    1
  );

  yield* beginSlide("implement");

  yield* code().code.append(
    `
class MemoryTodoModel implements TodoModel {
  private todos: Todo[] = [];
  
  getTodoById(id: number): Todo | undefined {
    return this.todos[id];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  createTodo(todo: Partial<Todo>): Todo {
    const newTodo = { done: false, ...todo, id: this.todos.length };
    this.todos.push(newTodo);
    return newTodo;
  }
}
`,
    1
  );
  yield* scrollable().scrollToBottom(1);

  yield* beginSlide("controller");

  scrollable().scrollOffset(scrollable().scrollOffset());
  yield* code().code.append(
    `
class TodoController {
  private readonly model: TodoModel;    

  constructor() {
    this.model = new MemoryTodoModel();
  }
  
  getMany() {
    return new Response(
      JSON.stringify(this.model.getTodos()), 
      { status: 200 }
    ); 
  }
  
  getOne(id: number) {
    const todo = this.model.getTodoById(id);
    if (!todo) {
        return new Response("Not Found", { status: 404 });
    }
    return new Response(
      JSON.stringify(this.model.getTodoById(id)), 
      { status: 200 }
    );
  }
  
  create(todo: Request) {
    const body = await request.json();
    const { title, done } = body;
    if (!title) {
        return new Response("Bad Request", { status: 400 });
    }
    return new Response(
      JSON.stringify(this.model.createTodo(todo)), 
      { status: 201 }
    );
  }
}
`,
    1
  );

  yield* beginSlide("highlight");
  yield* code().selection(lines(32, 35), 1);

  yield* beginSlide("inject");
  yield* code().code(
    `interface Todo {
  id: number;
  title: string;
  done: boolean;
}
    
interface TodoModel {
  getTodoById(id: number): Todo | undefined;    
  getTodos(): Todo[];
  createTodo(todo: Partial<Todo>): Todo;
}

class MemoryTodoModel implements TodoModel {
  private todos: Todo[] = [];
  
  getTodoById(id: number): Todo | undefined {
    return this.todos[id];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  createTodo(todo: Partial<Todo>): Todo {
    const newTodo = { done: false, ...todo, id: this.todos.length };
    this.todos.push(newTodo);
    return newTodo;
  }
}

class TodoController {
  private readonly model: TodoModel;    

  constructor(model: TodoModel) {
    this.model = model;
  }

  getMany() {
    return new Response(
      JSON.stringify(this.model.getTodos()), 
      { status: 200 }
    ); 
  }
  
  getOne(id: number) {
    const todo = this.model.getTodoById(id);
    if (!todo) {
        return new Response("Not Found", { status: 404 });
    }
    return new Response(
      JSON.stringify(this.model.getTodoById(id)), 
      { status: 200 }
    );
  }
  
  create(todo: Request) {
    const body = await request.json();
    const { title, done } = body;
    if (!title) {
        return new Response("Bad Request", { status: 400 });
    }
    return new Response(
      JSON.stringify(this.model.createTodo(todo)), 
      { status: 201 }
    );
  }
}
    `,
    1
  );

  yield* beginSlide("undo zoom in");

  yield* code().code(
    `interface Todo {
  id: number;
  title: string;
  done: boolean;
}
    
interface TodoModel {
  getTodoById(id: number): Todo | undefined;    
  getTodos(): Todo[];
  createTodo(todo: Partial<Todo>): Todo;
}

class MemoryTodoModel implements TodoModel {
  private todos: Todo[] = [];
  
  getTodoById(id: number): Todo | undefined {
    return this.todos[id];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  createTodo(todo: Partial<Todo>): Todo {
    const newTodo = { done: false, ...todo, id: this.todos.length };
    this.todos.push(newTodo);
    return newTodo;
  }
}

class TodoController {
  private readonly model: TodoModel;    

  constructor() {
    this.model = new MemoryTodoModel();
  }

  getMany() {
    return new Response(
      JSON.stringify(this.model.getTodos()), 
      { status: 200 }
    ); 
  }
  
  getOne(id: number) {
    const todo = this.model.getTodoById(id);
    if (!todo) {
        return new Response("Not Found", { status: 404 });
    }
    return new Response(
      JSON.stringify(this.model.getTodoById(id)), 
      { status: 200 }
    );
  }
  
  create(todo: Request) {
    const body = await request.json();
    const { title, done } = body;
    if (!title) {
        return new Response("Bad Request", { status: 400 });
    }
    return new Response(
      JSON.stringify(this.model.createTodo(todo)), 
      { status: 201 }
    );
  }
}
    `,
    1
  );

  yield scrollable().scrollBy([-350, -100], 1);
  yield* scrollable().zoom(2, 1);

  yield* beginSlide("inject again");
  yield* code().code(
    `interface Todo {
  id: number;
  title: string;
  done: boolean;
}
    
interface TodoModel {
  getTodoById(id: number): Todo | undefined;    
  getTodos(): Todo[];
  createTodo(todo: Partial<Todo>): Todo;
}

class MemoryTodoModel implements TodoModel {
  private todos: Todo[] = [];
  
  getTodoById(id: number): Todo | undefined {
    return this.todos[id];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  createTodo(todo: Partial<Todo>): Todo {
    const newTodo = { done: false, ...todo, id: this.todos.length };
    this.todos.push(newTodo);
    return newTodo;
  }
}

class TodoController {
  private readonly model: TodoModel;    

  constructor(model: TodoModel) {
    this.model = model;
  }

  getMany() {
    return new Response(
      JSON.stringify(this.model.getTodos()), 
      { status: 200 }
    ); 
  }
  
  getOne(id: number) {
    const todo = this.model.getTodoById(id);
    if (!todo) {
        return new Response("Not Found", { status: 404 });
    }
    return new Response(
      JSON.stringify(this.model.getTodoById(id)), 
      { status: 200 }
    );
  }
  
  create(todo: Request) {
    const body = await request.json();
    const { title, done } = body;
    if (!title) {
        return new Response("Bad Request", { status: 400 });
    }
    return new Response(
      JSON.stringify(this.model.createTodo(todo)), 
      { status: 201 }
    );
  }
}
    `,
    1
  );

  const benefitList = [
    "Instance Sharing",
    "Decoupling",
    "Flexibility",
    "Testability",
    "Code Reuse",
  ];
  const benefits = createRef<Window>();
  const txts = createRefArray<Txt>();

  yield* beginSlide("benefits");
  yield view.add(
    <Windows98Window
      title="Benefits"
      width={600}
      height={400}
      ref={benefits}
      x={500}
      y={300}
      bodyColor={Colors.Catppuccin.Mocha.Crust}
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
            x: benefits().size().x,
            y: 0,
          },
        })
      }
    >
      <Layout padding={20} layout direction={"column"}>
        {benefitList.map((benefit, i) => (
          <Txt
            ref={txts}
            fontSize={48}
            fontFamily={"Greycliff CF"}
            fill={Colors.Catppuccin.Mocha.Text}
            text={`${i + 1}. ${benefit}`}
            opacity={0}
          />
        ))}
      </Layout>
    </Windows98Window>
  );
  yield* benefits().open(view, 1);

  for (const txt of txts) {
    yield* beginSlide(`benefit ${txt.text()}`);
    yield txt.opacity(1, 1);
    yield* playbackWait(1);
  }

  yield* beginSlide("testing-intro");
  yield* benefits().close(view, 1);
  yield code().selection(lines(0, Infinity), 1);

  yield scrollable().zoom(1.25, 1);
  yield scrollable().scrollToBottomCenter(1);
  yield* code().code.append(
    `
class MockTodoModel implements TodoModel {
  private mockTodos: Todo[] = [
    { id: 0, title: "Test Todo", done: false },
  ];

  getTodoById(id: number): Todo | undefined {
    return this.mockTodos[id];
  }

  getTodos(): Todo[] {
    return this.mockTodos;
  }

  createTodo(todo: Partial<Todo>): Todo {
    const newTodo = { done: false, ...todo, id: this.mockTodos.length };
    this.mockTodos.push(newTodo);
    return newTodo;
  }
}`,
    1
  );

  yield* beginSlide("test-function");
  yield scrollable().scrollToBottomCenter(1);
  yield* code().code.append(
    `

function testGetMany() {
  const model = new MockTodoModel();
  const controller = new TodoController(model);
  const response = controller.getMany();
  const body = JSON.parse(response.body);
  assert(response.status === 200);
  assert(body.length === 1);
  assert(body[0].title === "Test Todo");
}`,
    1
  );

  yield* beginSlide("highlight-injection");
  yield* code().selection(code().findLastRange(/const model = new MockTodoModel\(\);\n\s+const controller = new TodoController\(model\);/gm), 1);

  yield* beginSlide("end");
  yield* window().close(view, 1);
});
