import { Colors } from "../commons";
import {
  Circle,
  Icon,
  Layout,
  LayoutProps,
  Line,
  Rect,
  Txt,
  initial,
  signal,
} from "@motion-canvas/2d";
import {
  SimpleSignal,
  SignalValue,
  Vector2,
  all,
  chain,
  createSignal,
  spawn,
} from "@motion-canvas/core";

interface BranchState {
  commits: Circle[];
  joiners: Line[];
  label: Layout;
  y: number;
  color: string;
  branchLine: Line | null;
  parentBranch: string | null;
  sourceCommit: Circle | null;
}

export interface CommitOptions {
  fill?: string;
  emoji?: string;
  duration?: number;
}

export interface TagOptions {
  color?: string;
  duration?: number;
}

export interface HeadOptions {
  color?: string;
  duration?: number;
}

export interface GitGraphProps extends LayoutProps {
  commitSize?: SignalValue<number>;
  commitGap?: SignalValue<number>;
}

export class GitGraph extends Layout {
  @initial(80)
  @signal()
  public declare readonly commitSize: SimpleSignal<number, this>;

  @initial(200)
  @signal()
  public declare readonly commitGap: SimpleSignal<number, this>;

  private branches = new Map<string, BranchState>();
  private pendingBranchLabels = new Map<string, Layout[]>();

  private activeBranch: string | null = null;
  private headFromCommit: Circle | null = null;
  private headToCommit: Circle | null = null;
  private headBranchProgress: SimpleSignal<number>;

  private headDot: Circle | null = null;
  private headBadge: Layout | null = null;
  private headBadgeIndicator: Line | null = null;
  private headBadgeContainer: Rect | null = null;

  public constructor(props: GitGraphProps) {
    super({ ...props });
    this.headBranchProgress = createSignal(0);
  }

  public getBranch(name: string): BranchState | undefined {
    return this.branches.get(name);
  }

  public getActiveBranch(): string | null {
    return this.activeBranch;
  }

  public *addBranch(
    name: string,
    color: string,
    fromBranch: string,
    y: number,
    duration = 0.5
  ) {
    const parent = this.branches.get(fromBranch);
    if (!parent) return;

    const sourceCommit = parent.commits[parent.commits.length - 1];
    if (!sourceCommit) return;

    const pendingLabels = this.pendingBranchLabels.get(fromBranch) ?? [];
    this.pendingBranchLabels.set(fromBranch, pendingLabels);

    const label = (
      <Layout
        direction={"row"}
        layout
        alignItems={"center"}
        gap={10}
        position={() => {
          const myIndex = pendingLabels.indexOf(label);
          const anchor = myIndex <= 0 ? parent.label : pendingLabels[myIndex - 1];
          const prevRight = anchor.right();
          return [prevRight.x + 20, parent.y];
        }}
        offset={[-1, 0]}
        opacity={0}
      >
        <Icon icon="octicon:git-branch-16" color={color} size={40} />
        <Txt fill={color} fontFamily={"Ellograph CF"}>
          {name}
        </Txt>
      </Layout>
    ) as Layout;

    pendingLabels.push(label);

    const branchLine = (
      <Line
        points={() => {
          const sx = sourceCommit.x();
          const sy = sourceCommit.bottom().y + 10;
          return [
            [sx, sy],
            [sx, y - 80],
            [sx + 80, y],
            [label.x() - 10, y],
          ];
        }}
        stroke={Colors.Catppuccin.Mocha.Text}
        lineWidth={4}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
    ) as Line;

    this.add(branchLine);
    this.add(label);

    const state: BranchState = {
      commits: [],
      joiners: [],
      label,
      y,
      color,
      branchLine,
      parentBranch: fromBranch,
      sourceCommit,
    };
    this.branches.set(name, state);

    yield* label.opacity(1, duration);
  }

  public *addCommit(branchName: string, options?: CommitOptions) {
    const branch = this.branches.get(branchName);
    if (!branch) return;

    const duration = options?.duration ?? 0.5;
    const size = this.commitSize();
    const gap = this.commitGap();
    const color = options?.fill ?? branch.color;
    const prevCommit = branch.commits[branch.commits.length - 1];

    let x: number;
    if (prevCommit) {
      x = prevCommit.x() + gap;
    } else if (branch.sourceCommit) {
      x = branch.sourceCommit.x() + gap;
    } else if (branch.parentBranch) {
      const parent = this.branches.get(branch.parentBranch);
      const parentLastCommit = parent?.commits[parent.commits.length - 1];
      x = parentLastCommit ? parentLastCommit.x() + gap : 0;
    } else {
      x = branch.commits.length * gap;
    }

    const commit = (
      <Circle fill={color} size={0} x={x} y={branch.y} />
    ) as Circle;

    if (options?.emoji) {
      commit.add(
        <Txt
          fontSize={() => commit.size().x / 2}
          stroke={Colors.Catppuccin.Mocha.Text}
          lineWidth={4}
          strokeFirst
          text={options.emoji}
        />
      );
    }

    const isFirstCommit = branch.commits.length === 0;

    if (isFirstCommit && branch.branchLine && branch.sourceCommit) {
      if (branch.parentBranch) {
        const pending = this.pendingBranchLabels.get(branch.parentBranch);
        if (pending) {
          const idx = pending.indexOf(branch.label);
          if (idx !== -1) pending.splice(idx, 1);
        }
      }
      branch.label.position(branch.label.position());
      spawn(branch.label.y(branch.y, duration));
      branch.branchLine.opacity(1);
      yield* branch.branchLine.end(1, duration);
    }

    if (prevCommit) {
      const joiner = (
        <Line
          points={() => [
            prevCommit.right().addX(10),
            commit.left().addX(-10),
          ]}
          stroke={Colors.Catppuccin.Mocha.Text}
          lineWidth={4}
          lineCap={"round"}
          end={0}
          opacity={0}
        />
      ) as Line;
      this.add(joiner);
      branch.joiners.push(joiner);
      joiner.opacity(1);
      spawn(joiner.end(1, duration));
    }

    this.add(commit);
    branch.commits.push(commit);

    if (branch.branchLine && branch.sourceCommit) {
      const firstCommit = branch.commits[0];
      const src = branch.sourceCommit;
      if (firstCommit) {
        branch.branchLine.points(() => [
          [src.x(), src.bottom().y + 10],
          [src.x(), branch.y - 80],
          [src.x() + 80, branch.y],
          [firstCommit.left().x - 10, branch.y],
        ]);
      }
    }

    this.updateLabelPosition(branch);

    yield* commit.size(size, duration);
  }

  public *mergeBranch(sourceName: string, targetName: string, duration = 0.5) {
    const source = this.branches.get(sourceName);
    const target = this.branches.get(targetName);
    if (!source || !target) return;

    yield* source.label.opacity(0, duration);
    source.label.remove();
    if (source.branchLine) {
      yield* source.branchLine
        .start(1, duration)
        .do(() => source.branchLine?.remove());
    }

    const targetLastCommit = target.commits[target.commits.length - 1];
    const gap = this.commitGap();

    const finalLastX = targetLastCommit
      ? targetLastCommit.x() + gap * source.commits.length
      : gap * (source.commits.length - 1);
    const labelTargetX = finalLastX + this.commitSize() / 2 + 60;

    target.label.position(target.label.position());
    yield* target.label.x(labelTargetX, duration);

    yield* all(
      ...source.commits.map((c) => c.fill(target.color, duration)),
      ...source.commits.map((c, i) => {
        const newX = targetLastCommit
          ? targetLastCommit.x() + gap * (i + 1)
          : gap * i;
        return c.position([newX, target.y], duration);
      })
    );

    if (targetLastCommit && source.commits.length > 0) {
      const joiner = (
        <Line
          points={() => [
            targetLastCommit.right().addX(10),
            source.commits[0].left().addX(-10),
          ]}
          stroke={Colors.Catppuccin.Mocha.Text}
          lineWidth={4}
          lineCap={"round"}
          end={0}
        />
      ) as Line;
      this.add(joiner);
      target.joiners.push(joiner);
      yield* joiner.end(1, duration);
    }

    target.commits.push(...source.commits);
    target.joiners.push(...source.joiners);

    this.updateLabelPosition(target);

    if (this.activeBranch === sourceName) {
      this.activeBranch = targetName;
      this.headFromCommit = this.headToCommit;
    }

    this.branches.delete(sourceName);
  }

  public *addTag(branchName: string, text: string, options?: TagOptions) {
    const branch = this.branches.get(branchName);
    if (!branch) return;

    const commit = branch.commits[branch.commits.length - 1];
    if (!commit) return;

    const tagColor = options?.color ?? Colors.Catppuccin.Mocha.Peach;
    const duration = options?.duration ?? 0.5;

    const tagIndicator = (
      <Line
        points={[
          commit.top().addY(-10),
          commit.top().addY(-40),
        ]}
        stroke={tagColor}
        lineWidth={4}
        end={0}
        opacity={0}
        lineCap={"round"}
      />
    ) as Line;

    const tagContainer = (
      <Line
        x={commit.x()}
        y={() => commit.top().addY(-70).y}
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
        stroke={tagColor}
        lineWidth={2}
      >
        <Txt opacity={0} fontWeight={600}>
          {text}
        </Txt>
      </Line>
    ) as Line;

    const tagDot = (
      <Circle
        size={20}
        fill={Colors.Catppuccin.Mocha.Crust}
        position={() => tagContainer.left().addX(10)}
      />
    ) as Circle;

    const tagGroup = (
      <Layout>
        {tagIndicator}
        {tagContainer}
        {tagDot}
      </Layout>
    ) as Layout;

    this.add(tagGroup);

    const tagTxt = tagContainer.childrenAs<Txt>()[0];
    tagIndicator.opacity(1);
    yield* chain(
      tagIndicator.end(1, duration),
      all(tagContainer.end(1, duration), tagContainer.start(0, duration)),
      tagContainer.fill(tagColor, duration),
      tagTxt.opacity(1, duration)
    );
  }

  public enableDotHead(options?: HeadOptions) {
    const headColor = options?.color ?? Colors.Catppuccin.Mocha.Green;
    const duration = options?.duration ?? 0.5;

    const dot = (
      <Circle
        fill={headColor}
        size={0}
        position={() => {
          const from = this.headFromCommit?.topRight() ?? null;
          const to = this.headToCommit?.topRight() ?? null;
          if (!from && !to) return Vector2.zero;
          if (!from) return to!;
          if (!to) return from;
          return Vector2.lerp(from, to, this.headBranchProgress());
        }}
      >
        <Txt
          fill={Colors.Catppuccin.Mocha.Crust}
          fontWeight={600}
          fontSize={() => dot.size().x / 2}
        >
          H
        </Txt>
      </Circle>
    ) as Circle;

    this.add(dot);
    this.headDot = dot;
    spawn(dot.size(50, duration));
  }

  public *enableBadgeHead(options?: HeadOptions) {
    const badgeColor = options?.color ?? Colors.Catppuccin.Mocha.Green;
    const duration = options?.duration ?? 0.5;

    const indicator = (
      <Line
        points={() => {
          const pos = this.headToCommit?.top() ?? null;
          if (!pos) return [];
          return [pos.addY(-10), pos.addY(-40)];
        }}
        stroke={badgeColor}
        lineWidth={4}
        end={0}
        opacity={0}
        lineCap={"round"}
      />
    ) as Line;

    const container = (
      <Rect
        position={() => {
          const pos = this.headToCommit?.top() ?? null;
          if (!pos) return Vector2.zero;
          return new Vector2(pos.x, pos.y - 70);
        }}
        width={150}
        height={60}
        radius={8}
        end={0.67}
        start={0.67}
        stroke={badgeColor}
        lineWidth={2}
      >
        <Txt opacity={0} fontWeight={600}>
          HEAD
        </Txt>
      </Rect>
    ) as Rect;

    const badge = (
      <Layout>
        {indicator}
        {container}
      </Layout>
    ) as Layout;

    this.add(badge);
    this.headBadge = badge;
    this.headBadgeIndicator = indicator;
    this.headBadgeContainer = container;

    const headTxt = container.childrenAs<Txt>()[0];
    indicator.opacity(1);
    yield* chain(
      indicator.end(1, duration),
      all(container.end(1, duration), container.start(0, duration)),
      container.fill(badgeColor, duration),
      headTxt.opacity(1, duration)
    );
  }

  public *moveHead(commit: Circle, duration = 0.5) {
    this.headFromCommit = this.headToCommit;
    this.headToCommit = commit;

    if (this.headDot) {
      this.headBranchProgress(0);
      yield* this.headBranchProgress(1, duration);
      this.headFromCommit = commit;
    }
  }

  public *moveHeadToCommit(branchName: string, index: number, duration = 0.5) {
    const branch = this.branches.get(branchName);
    if (!branch) return;
    const commit = branch.commits[index];
    if (!commit) return;
    yield* this.moveHead(commit, duration);
  }

  public *setActiveBranch(branchName: string, duration = 0.5) {
    const branch = this.branches.get(branchName);
    if (!branch) return;

    const commit = branch.commits[branch.commits.length - 1];
    if (commit) {
      yield* this.moveHead(commit, duration);
    }

    this.activeBranch = branchName;
  }

  public *initBranch(name: string, color: string, y: number, duration = 0.5) {
    const label = (
      <Layout
        direction={"row"}
        layout
        alignItems={"center"}
        gap={10}
        y={y}
        x={0}
        offset={[-1, 0]}
        opacity={0}
      >
        <Icon icon="octicon:git-branch-16" color={color} size={40} />
        <Txt fill={color} fontFamily={"Ellograph CF"}>
          {name}
        </Txt>
      </Layout>
    ) as Layout;

    this.add(label);

    const state: BranchState = {
      commits: [],
      joiners: [],
      label,
      y,
      color,
      branchLine: null,
      parentBranch: null,
      sourceCommit: null,
    };
    this.branches.set(name, state);

    yield* label.opacity(1, duration);
  }

  private updateLabelPosition(branch: BranchState) {
    const lastCommit = branch.commits[branch.commits.length - 1];
    if (lastCommit) {
      branch.label.position(() => [
        lastCommit.right().x + 60,
        branch.y,
      ]);
    }
  }

}
