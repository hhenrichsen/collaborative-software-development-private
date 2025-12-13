import { makeProject } from "@motion-canvas/core";
import "./global.css";

import title from "./scenes/00_title?scene";
import git from "./scenes/02_git?scene";
import tags from "./scenes/03_tags?scene";
import commands from "./scenes/04_commands?scene";
import merge_conflicts from "./scenes/05_merge_conflicts?scene";
import tickets from "./scenes/07_tickets?scene";
import design_documentation from "./scenes/08_design_documentation?scene";
import dependency_injection from "./scenes/09_dependency_injection?scene";

export default makeProject({
  scenes: [
    title,
    git,
    tags,
    commands,
    merge_conflicts,
    tickets,
    design_documentation,
    dependency_injection,
  ],
  experimentalFeatures: true,
});
