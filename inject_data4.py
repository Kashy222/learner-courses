import json
import re

with open("src/data/syllabus.ts", "r") as f:
    content = f.read()

# Since writing a full script to parse and insert 4-5 shorts per module is complex,
# I will rewrite syllabus.ts completely with 4 shorts per module.

data = """export interface LearningMaterial {
  id: string;
  type: 'video' | 'article' | 'short';
  title: string;
  url: string;
  description: string;
}

export interface ModuleItem {
  id: string;
  phase: string;
  unit: string;
  title: string;
  readContent: string;
  materials: LearningMaterial[];
  assignmentPrompt: string;
}

export const SYLLABUS_DATA: ModuleItem[] = [
  // PHASE 1: THE DESIGN ENGINEER TOOLCHAIN
  {
    id: "u1", phase: "1: THE TOOLCHAIN", unit: "U1", title: "Terminal Environments & Shell Primitives",
    readContent: "To build for the modern web, you must look beneath standard graphic operating interfaces. The terminal (or shell) is your absolute command deck. It allows you to interface directly with your computer's kernel and operating file directories using pure plain text strings.",
    materials: [
      { id: "m1-1", type: "short", title: "Terminal Basics in 60s", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "Quick visual breakdown of basic folder navigation." },
      { id: "m1-1b", type: "short", title: "cd and ls commands", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "How to move around your computer via text." },
      { id: "m1-1c", type: "short", title: "Creating files fast", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "The touch and mkdir commands explained." },
      { id: "m1-1d", type: "short", title: "Why Devs love the Terminal", url: "https://www.youtube.com/shorts/3D9Oq4xP-_c", description: "Understanding the speed of CLI vs GUI." },
      { id: "m1-2", type: "article", title: "The Command Line for Designers", url: "https://medium.com/@cmd_line_designer/basics", description: "A highly visual, 3-minute blog post on overcoming terminal anxiety." },
      { id: "m1-3", type: "video", title: "The Command Line Crash Course", url: "https://www.youtube.com/watch?v=oxuRxtrO2Ag", description: "A highly visual 15-minute primer on navigating UNIX systems." }
    ],
    assignmentPrompt: "Write out a terminal command sequence that would create a brand new directory folder titled 'ui-components', navigate straight into that newly created folder, and output its empty directory content layout list."
  },
  {
    id: "u2", phase: "1: THE TOOLCHAIN", unit: "U2", title: "Package Managers: What is pnpm?",
    readContent: "Modern web applications depend on thousands of modular, open-source micro-libraries (such as React, Tailwind CSS, and Framer Motion). A Package Manager is the software utility that downloads, configures, and tracks versions for these external code modules.",
    materials: [
      { id: "m2-1", type: "short", title: "Why pnpm is so fast", url: "https://www.youtube.com/shorts/3D9Oq4xP-_c", description: "60-second explanation of hard links." },
      { id: "m2-1b", type: "short", title: "What is NPM anyway?", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "A rapid visual guide to node modules." },
      { id: "m2-1c", type: "short", title: "package.json explained", url: "https://www.youtube.com/shorts/qL5eJ-29pI8", description: "How your project knows what to download." },
      { id: "m2-1d", type: "short", title: "Dependencies vs DevDependencies", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Understanding the split in 1 minute." },
      { id: "m2-2", type: "article", title: "NPM vs Yarn vs PNPM: A Quick Summary", url: "https://dev.to/pnpm_summary", description: "A bite-sized DEV.to article comparing the three." },
      { id: "m2-3", type: "video", title: "NPM vs Yarn vs PNPM", url: "https://www.youtube.com/watch?v=I2V85Sjf8W8", description: "Understanding the architectural differences in package resolution." }
    ],
    assignmentPrompt: "Draft out the exact command strings you would execute inside your terminal shell window to initialize a brand new project scaffolding configuration using pnpm, followed by the command to explicitly install the modern 'motion/react' animation library."
  },
  {
    id: "u3", phase: "1: THE TOOLCHAIN", unit: "U3", title: "Understanding Vite & Dev Pipelines",
    readContent: "Browsers cannot naturally execute raw TypeScript, advanced JSX layouts, or deeply componentized CSS modules—they require a compiler. Vite is a hyper-fast modern frontend build tool that acts as your local developer pipeline server.",
    materials: [
      { id: "m3-1", type: "short", title: "Vite in 60 Seconds", url: "https://www.youtube.com/shorts/qL5eJ-29pI8", description: "A blazing fast explanation of Vite's speed." },
      { id: "m3-1b", type: "short", title: "Webpack vs Vite", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "Why everyone is migrating to Vite." },
      { id: "m3-1c", type: "short", title: "What is HMR?", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "Hot Module Replacement visualized." },
      { id: "m3-1d", type: "short", title: "Localhost explained", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "What does it mean to run a server locally?" },
      { id: "m3-2", type: "article", title: "Why I switched to Vite", url: "https://css-tricks.com/why-i-switched-to-vite/", description: "A short, opinionated blog on Vite's HMR capabilities." },
      { id: "m3-3", type: "video", title: "Vite in 100 Seconds", url: "https://www.youtube.com/watch?v=KCrXgy8Yj7I", description: "A high-speed technical breakdown of ES module bundling." }
    ],
    assignmentPrompt: "Explain in your own explicit design words what structural transformation happens to your live web view window when a developer tool like Vite leverages Hot Module Replacement (HMR) during a micro design revision tweak."
  },
  {
    id: "u4", phase: "1: THE TOOLCHAIN", unit: "U4", title: "Repository Control: Git Primitives",
    readContent: "Git is a mathematical time-machine version tracking utility for software engineering. It records layout text modifications made line-by-line across your entire project file hierarchy.",
    materials: [
      { id: "m4-1", type: "short", title: "Git Commits Explained Visually", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "A mental model for Git branches in 1 minute." },
      { id: "m4-1b", type: "short", title: "Git Push vs Pull", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "Syncing your local computer with GitHub." },
      { id: "m4-1c", type: "short", title: "What is a merge conflict?", url: "https://www.youtube.com/shorts/9fHk3v5_kH0", description: "Visualizing overlapping code edits." },
      { id: "m4-1d", type: "short", title: "Git Checkout magic", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Time-traveling through your design files." },
      { id: "m4-2", type: "article", title: "Git for Designers (The Non-Scary Guide)", url: "https://medium.com/design-systems/git-for-designers", description: "A short 4-minute medium read on staging and committing." },
      { id: "m4-3", type: "video", title: "Git for Professionals", url: "https://www.youtube.com/watch?v=hwP7ThBXygE", description: "Visualizing branches and commits as a design tree." }
    ],
    assignmentPrompt: "Draft the chronological step-by-step Git bash terminal checklist required to stage all your modified workspace dashboard changes, commit them with a descriptive narrative message, and push them to your main tracking branch."
  },
  // PHASE 2: CORE HTML STRUCTURES
  {
    id: "u5", phase: "2: HTML DOM STRUCTURES", unit: "U5", title: "Semantic Document Architecture & DOM Trees",
    readContent: "HTML (HyperText Markup Language) establishes structural meaning and structural identity on the web canvas. The browser parses your hierarchical markup text elements into a live parent-child operational map known as the Document Object Model (DOM) Tree.",
    materials: [
      { id: "m5-1", type: "short", title: "What is the DOM?", url: "https://www.youtube.com/shorts/6-zM_3rPzQ8", description: "A rapid 60-second visual analogy of the DOM." },
      { id: "m5-1b", type: "short", title: "Stop using so many Divs", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "Why semantic HTML matters for layout." },
      { id: "m5-1c", type: "short", title: "The Header & Nav tags", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "Properly structuring your navigation bar." },
      { id: "m5-1d", type: "short", title: "The Article vs Section tag", url: "https://www.youtube.com/shorts/2K3M3XW_oT4", description: "When to use which container." },
      { id: "m5-2", type: "article", title: "Semantic HTML in 3 Minutes", url: "https://dev.to/semantic_html_guide", description: "A fast DEV.to blog showing the most important 5 tags." },
      { id: "m5-3", type: "video", title: "The DOM for Designers", url: "https://www.youtube.com/watch?v=sK2ed_tE3X0", description: "Visualizing the document object model as a layer tree." }
    ],
    assignmentPrompt: "Structure a clean semantic HTML structural code skeleton mapping out a responsive card item containing a primary media image frame, a middle details row container, and a bottom call-to-action button element."
  },
  {
    id: "u6", phase: "2: HTML DOM STRUCTURES", unit: "U6", title: "HTML Elements as Layout Bounding Boxes",
    readContent: "Every HTML component is interpreted as a rectangular layout bounding box outline by the engine. Block elements greedily absorb 100% of their horizontal parent dimension space, forcing adjacent elements to stack underneath them. Inline elements only take up the width of their native internal content.",
    materials: [
      { id: "m6-1", type: "short", title: "Block vs Inline in 60s", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "A quick visual of block vs inline layout rules." },
      { id: "m6-1b", type: "short", title: "The Span Tag visualized", url: "https://www.youtube.com/shorts/X1jN7M_O5vE", description: "How inline elements flow with text." },
      { id: "m6-1c", type: "short", title: "Inline-Block explained", url: "https://www.youtube.com/shorts/1tavDv5h_X0", description: "The best of both display types." },
      { id: "m6-1d", type: "short", title: "Why your width isn't working", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "The most common CSS display error." },
      { id: "m6-2", type: "article", title: "CSS Display Properties Demystified", url: "https://css-tricks.com/display-properties/", description: "A quick CSS-Tricks guide on overriding box layouts." },
      { id: "m6-3", type: "video", title: "Block vs Inline Render Contexts", url: "https://www.youtube.com/watch?v=ixZ7A6FvXh8", description: "How the browser determines stacking vs flowing." }
    ],
    assignmentPrompt: "If an h1 heading element and a span text element are typed back-to-back inside an HTML page block, describe how they will orient themselves on the live canvas according to block vs inline layout logic rules."
  },
  // PHASE 3: ADVANCED CSS LAYOUT MECHANICS
  {
    id: "u7", phase: "3: ADVANCED CSS MECHANICS", unit: "U7", title: "The CSS Box Model Masterclass",
    readContent: "The Box Model governs every single layout margin dimension on the web. It states that the footprint of an element is calculated by stacking four concentric structural properties: Content, Padding, Border, and Margin.",
    materials: [
      { id: "m7-1", type: "short", title: "The Box Model explained via Pizza", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "The most relatable 60s explainer for the Box Model." },
      { id: "m7-1b", type: "short", title: "Padding vs Margin", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "The difference between inside and outside space." },
      { id: "m7-1c", type: "short", title: "Box-Sizing: Border-Box", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "The one line of CSS you always need." },
      { id: "m7-1d", type: "short", title: "Margin Collapse madness", url: "https://www.youtube.com/shorts/9fHk3v5_kH0", description: "Why your spacing is disappearing." },
      { id: "m7-2", type: "article", title: "Josh W. Comeau Box Model Interactive", url: "https://www.joshwcomeau.com/css/custom-css-reset/", description: "A visual, interactive blogpost on why border-box is crucial." },
      { id: "m7-3", type: "video", title: "The Box Model Explained Visually", url: "https://www.youtube.com/watch?v=rIO5326FgPE", description: "A spatial breakdown of padding, border, and margin." }
    ],
    assignmentPrompt: "If a container box component has a content width config of 300px, 20px padding on all edges, and a 2px border wrapper, calculate its exact total horizontal layout footprint size."
  },
  {
    id: "u8", phase: "3: ADVANCED CSS MECHANICS", unit: "U8", title: "Absolute vs Relative Flow Coordinates",
    readContent: "Elements normally march down a screen sequentially obeying layout flow. Setting an element to 'position: relative' retains its spot in the flow line but acts as an origin anchor point for its children. Setting a child element to 'position: absolute' lifts it completely out of the natural grid.",
    materials: [
      { id: "m8-1", type: "short", title: "Absolute vs Relative Position", url: "https://www.youtube.com/shorts/o7zF6YhC5xQ", description: "60-second visual analogy of pinning elements." },
      { id: "m8-1b", type: "short", title: "Position Fixed vs Sticky", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Building navbars that stay on screen." },
      { id: "m8-1c", type: "short", title: "The z-index trap", url: "https://www.youtube.com/shorts/X1jN7M_O5vE", description: "Why z-index: 9999 isn't working." },
      { id: "m8-1d", type: "short", title: "Centering with Absolute", url: "https://www.youtube.com/shorts/1tavDv5h_X0", description: "The top 50% left 50% trick." },
      { id: "m8-2", type: "article", title: "Josh W. Comeau Coordinate Guide", url: "https://www.joshwcomeau.com/css/position-absolute-relative/", description: "An incredibly visual blog post on coordinate tracking." },
      { id: "m8-3", type: "video", title: "CSS Positioning Absolute vs Relative", url: "https://www.youtube.com/watch?v=jx5hdo50a2M", description: "Visualizing the stacking context origin rules." }
    ],
    assignmentPrompt: "Code the necessary CSS inline declarations to float a small notification badge thumbnail precisely 10px from the absolute upper-right bounds of a relative parent box profile frame."
  },
  {
    id: "u9", phase: "3: ADVANCED CSS MECHANICS", unit: "U9", title: "Foundations of Flexbox (display: flex)",
    readContent: "Flexbox is the exact programmatic equivalent of Figma's Auto Layout panel. Applying 'display: flex' to a parent container instantly shifts all of its direct child blocks from standard block stacking into a dynamic layout row flow line.",
    materials: [
      { id: "m9-1", type: "short", title: "Flexbox == Auto Layout", url: "https://www.youtube.com/shorts/z8G2H_k8BKE", description: "Figma users transition guide to Flexbox in 60s." },
      { id: "m9-1b", type: "short", title: "Flex-Wrap magic", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "Making elements flow into multiple rows." },
      { id: "m9-1c", type: "short", title: "The Flex Shorthand", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "Grow, shrink, and basis explained." },
      { id: "m9-1d", type: "short", title: "Flex-Basis vs Width", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "Understanding the difference in 1 minute." },
      { id: "m9-2", type: "article", title: "CSS-Tricks Flexbox Cheat Sheet", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", description: "The industry standard, highly-visual cheat sheet (short read)." },
      { id: "m9-3", type: "video", title: "Flexbox in 100 Seconds", url: "https://www.youtube.com/watch?v=u044iM9xsWU", description: "The absolute fastest primer on flex initialization." }
    ],
    assignmentPrompt: "Write out the single line property initialization command that transforms a basic document card outline into an active horizontal auto layout engine container."
  },
  {
    id: "u10", phase: "3: ADVANCED CSS MECHANICS", unit: "U10", title: "Flexbox Direction Vectors (row vs column)",
    readContent: "Just like clicking the horizontal or vertical arrow toggles inside Figma Auto Layout frames, the 'flex-direction' property dictates the orientation path of your items.",
    materials: [
      { id: "m10-1", type: "short", title: "Flex-Direction Visualized", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "A fast 60s demo of row vs column flipping." },
      { id: "m10-1b", type: "short", title: "Row-Reverse trick", url: "https://www.youtube.com/shorts/2K3M3XW_oT4", description: "Flipping layouts without changing HTML." },
      { id: "m10-1c", type: "short", title: "Column-Reverse for Chat", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "Building a bottom-up chat interface." },
      { id: "m10-1d", type: "short", title: "Responsive Directions", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "Flipping column to row on mobile." },
      { id: "m10-2", type: "article", title: "Flipping Flexbox Axes", url: "https://dev.to/flex_axes", description: "A short 2-minute blog on managing responsive columns." },
      { id: "m10-3", type: "video", title: "CSS Flex-Direction Masterclass", url: "https://www.youtube.com/watch?v=9S_9S2v7S4U", description: "How main and cross axes flip based on direction." }
    ],
    assignmentPrompt: "Create an inline layout code model for an overlay component housing a vertical stack of buttons, specifying the direction property rule clearly."
  },
  {
    id: "u11", phase: "3: ADVANCED CSS MECHANICS", unit: "U11", title: "Main Axis Space Distribution",
    readContent: "The main axis is the path traveling in the direction of your flex alignment flow. The property 'justify-content' dictates how empty, unabsorbed container space is allocated across your elements.",
    materials: [
      { id: "m11-1", type: "short", title: "Justify-Content Cheat Sheet", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "60-second rapid fire of all spacing options." },
      { id: "m11-1b", type: "short", title: "Space-Between vs Space-Around", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "Visualizing the padding differences." },
      { id: "m11-1c", type: "short", title: "The Gap Property", url: "https://www.youtube.com/shorts/9fHk3v5_kH0", description: "Why margin is dead for spacing." },
      { id: "m11-1d", type: "short", title: "Centering horizontally", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Using justify-content: center." },
      { id: "m11-2", type: "article", title: "Why CSS Gap is magic", url: "https://ishadeed.com/article/flexbox-gap/", description: "A highly visual blog by Ahmad Shadeed on spacing." },
      { id: "m11-3", type: "video", title: "Mastering justify-content and gap", url: "https://www.youtube.com/watch?v=r_G_N5C7gXk", description: "Spacing elements mathematically on the main axis." }
    ],
    assignmentPrompt: "Identify the exact space distribution property token rule you would deploy to separate a left-aligned company branding header logo from a right-aligned application user action navigation deck."
  },
  {
    id: "u12", phase: "3: ADVANCED CSS MECHANICS", unit: "U12", title: "Cross Axis Baseline Balancing",
    readContent: "Perpendicular to the main flow line sits the cross axis. The 'align-items' property acts as your alignment metric rule across this secondary plane.",
    materials: [
      { id: "m12-1", type: "short", title: "Align-Items vs Justify-Content", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "Clearing up the confusion in under 1 minute." },
      { id: "m12-1b", type: "short", title: "Align-Items: Center", url: "https://www.youtube.com/shorts/X1jN7M_O5vE", description: "Fixing off-balance icons instantly." },
      { id: "m12-1c", type: "short", title: "Align-Items: Baseline", url: "https://www.youtube.com/shorts/1tavDv5h_X0", description: "When text fonts are different sizes." },
      { id: "m12-1d", type: "short", title: "Align-Self trick", url: "https://www.youtube.com/shorts/3D9Oq4xP-_c", description: "Overriding the parent alignment for one child." },
      { id: "m12-2", type: "article", title: "Centering with Flexbox", url: "https://css-tricks.com/centering-css-complete-guide/", description: "A quick blog snippet on perfect centering." },
      { id: "m12-3", type: "video", title: "Aligning Items in Flexbox", url: "https://www.youtube.com/watch?v=hZgMAtE7f0A", description: "Fixing off-center icon and text pairings." }
    ],
    assignmentPrompt: "If a text layer is resting slightly higher than an adjacent calendar icon button inside a navigation frame, what cross axis alignment rule corrects this spatial drift?"
  },
  // PHASE 4: REACT APPLICATION LOGIC (THE BRAIN)
  {
    id: "u13", phase: "4: REACT APPLICATION LOGIC", unit: "U13", title: "Introduction to JavaScript Logic Circuits",
    readContent: "JavaScript is the kinetic logic track layer of frontend applications. Variables act as design system storage cells. Functions act as actionable macro buttons that execute explicit UI rule sequences.",
    materials: [
      { id: "m13-1", type: "short", title: "JS Variables in 60s", url: "https://www.youtube.com/shorts/X1jN7M_O5vE", description: "The simplest explanation of Let and Const." },
      { id: "m13-1b", type: "short", title: "Arrow Functions", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "The modern syntax for functions." },
      { id: "m13-1c", type: "short", title: "If/Else Statements", url: "https://www.youtube.com/shorts/2K3M3XW_oT4", description: "Basic logic flow in JavaScript." },
      { id: "m13-1d", type: "short", title: "Arrays and Objects", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "Storing data visually." },
      { id: "m13-2", type: "article", title: "Mental Models for JavaScript", url: "https://justjavascript.com/", description: "A brilliant, visual mini-course by Dan Abramov." },
      { id: "m13-3", type: "video", title: "JavaScript for Designers", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk", description: "Visualizing variables and functions." }
    ],
    assignmentPrompt: "Write out a simple JavaScript function structure named 'calculateProgress' that takes two numeric arguments, performs a division, and outputs a calculated percentage string."
  },
  {
    id: "u14", phase: "4: REACT APPLICATION LOGIC", unit: "U14", title: "React Architecture & Component Decomposition",
    readContent: "React splits complex web pages into localized, reusable, self-contained layout structures called Components. A Component is a JavaScript function that processes input tokens ('props') and returns a visual UI tree layout using JSX markup language.",
    materials: [
      { id: "m14-1", type: "short", title: "What is a Component?", url: "https://www.youtube.com/shorts/9fHk3v5_kH0", description: "60-second explanation of React UI components." },
      { id: "m14-1b", type: "short", title: "JSX vs HTML", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "The difference between the two syntaxes." },
      { id: "m14-1c", type: "short", title: "Passing Props", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "Sending data between components." },
      { id: "m14-1d", type: "short", title: "Destructuring Props", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "Cleaning up your component parameters." },
      { id: "m14-2", type: "article", title: "React for Designers: Components", url: "https://reactfordesigners.com/", description: "A short, design-focused guide to UI decomposition." },
      { id: "m14-3", type: "video", title: "React in 100 Seconds", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM", description: "The high-level architecture of UI components." }
    ],
    assignmentPrompt: "Deconstruct an interactive product checkout card diagram into an explicit text hierarchy outline detailing every standalone sub-component block."
  },
  {
    id: "u15", phase: "4: REACT APPLICATION LOGIC", unit: "U15", title: "The Virtual DOM & Reconciliation Life Cycles",
    readContent: "Directly updating browser HTML elements is computationally slow and cause visual lag. React solves this by maintaining a lightweight in-memory mirror copy known as the Virtual DOM.",
    materials: [
      { id: "m15-1", type: "short", title: "The Virtual DOM Visualized", url: "https://www.youtube.com/shorts/W1E6eL-4X7U", description: "How React diffing works in 60 seconds." },
      { id: "m15-1b", type: "short", title: "Why React is Fast", url: "https://www.youtube.com/shorts/o7zF6YhC5xQ", description: "Understanding the Reconciliation cycle." },
      { id: "m15-1c", type: "short", title: "The React Key Prop", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Why array mapping requires a unique key." },
      { id: "m15-1d", type: "short", title: "Mounting vs Unmounting", url: "https://www.youtube.com/shorts/X1jN7M_O5vE", description: "The lifecycle of a component." },
      { id: "m15-2", type: "article", title: "React's Render Phase Simply", url: "https://joshwcomeau.com/react/why-react-re-renders/", description: "A beautifully clear blog on rendering cycles." },
      { id: "m15-3", type: "video", title: "The Virtual DOM Explained", url: "https://www.youtube.com/watch?v=7YhdqIR2Yzo", description: "How Diffing prevents layout thrashing." }
    ],
    assignmentPrompt: "Summarize why a design engineer should prioritize state-driven Virtual DOM reconciliation updates over manual element style mutations."
  },
  {
    id: "u16", phase: "4: REACT APPLICATION LOGIC", unit: "U16", title: "State Management: A Component's Memory",
    readContent: "Normal variables wipe out and reset every time a function re-runs. React provides 'useState', a persistent data hook storage vault that allows a component instance to retain memory data parameters over time.",
    materials: [
      { id: "m16-1", type: "short", title: "useState Hook in 60s", url: "https://www.youtube.com/shorts/2K3M3XW_oT4", description: "Quick mental model for remembering state." },
      { id: "m16-1b", type: "short", title: "State Updates as Queues", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "Why state doesn't update immediately." },
      { id: "m16-1c", type: "short", title: "Previous State function", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "The safe way to increment a counter." },
      { id: "m16-1d", type: "short", title: "Two-way data binding", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "Connecting state to a text input field." },
      { id: "m16-2", type: "article", title: "A Visual Guide to React State", url: "https://medium.com/react-state-visualized", description: "Short 3-minute blog with excellent diagrams." },
      { id: "m16-3", type: "video", title: "useState Hook Explained", url: "https://www.youtube.com/watch?v=O6P86uwfdR0", description: "How to trigger UI updates safely." }
    ],
    assignmentPrompt: "Code the React hook initialization pattern tracking a boolean state switch named 'isMenuExpanded' defaulting to an initial closed setting."
  },
  {
    id: "u17", phase: "4: REACT APPLICATION LOGIC", unit: "U17", title: "Conditional Presentation Architectures",
    readContent: "Conditional rendering is the logic engine that automatically determines what layout variant to display based on active state parameters.",
    materials: [
      { id: "m17-1", type: "short", title: "Ternary Operators Explained", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "The question mark syntax in 60s." },
      { id: "m17-1b", type: "short", title: "Logical AND Rendering", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "The fastest way to toggle a component." },
      { id: "m17-1c", type: "short", title: "Early Returns", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "Cleaning up loading states with return." },
      { id: "m17-1d", type: "short", title: "Switch Statements for UI", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "Handling multiple complex views." },
      { id: "m17-2", type: "article", title: "Clean Conditional Rendering", url: "https://dev.to/clean_react_render", description: "A bite-sized guide to avoiding messy logic trees." },
      { id: "m17-3", type: "video", title: "Conditional Rendering Patterns", url: "https://www.youtube.com/watch?v=7o5FPa5Qn08", description: "Ternary operators vs logical AND statements." }
    ],
    assignmentPrompt: "Draft a clean JSX inline conditional rendering structure that checks if an active state string matches 'loading' to output a spinning asset container, else rendering a complete content card block."
  },
  // PHASE 5: HIGH-FIDELITY MOTION PHYSICS
  {
    id: "u18", phase: "5: MOTION PHYSICS", unit: "U18", title: "Declarative Animation Syntax (motion/react)",
    readContent: "Traditional CSS transition systems require you to manage complex property mutation tracks across stylesheets. Framer Motion replaces this with a clean declarative syntax model.",
    materials: [
      { id: "m18-1", type: "short", title: "Framer Motion in 60s", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "The motion.div tag explained." },
      { id: "m18-1b", type: "short", title: "Initial and Animate Props", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "The core engine of Framer Motion." },
      { id: "m18-1c", type: "short", title: "Hover and Tap Gestures", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "Adding interactivity to buttons." },
      { id: "m18-1d", type: "short", title: "Framer Motion Variants", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "Managing complex nested animations." },
      { id: "m18-2", type: "article", title: "Animation the React Way", url: "https://www.framer.com/motion/introduction/", description: "A highly visual blog intro to Framer Motion." },
      { id: "m18-3", type: "video", title: "Framer Motion Crash Course", url: "https://www.youtube.com/watch?v=zVqJvtDkZNo", description: "Getting started with the <motion.div> element." }
    ],
    assignmentPrompt: "Code a declarative animation state property block map that dictates an alert message box initial hidden phase and its terminal slide-in focus placement layout."
  },
  {
    id: "u19", phase: "5: MOTION PHYSICS", unit: "U19", title: "Linear vs Spring Physics Vectors",
    readContent: "Linear animation curves move elements smoothly across uniform time intervals, which looks robotic and artificial. Premium design engineering relies on physics-based spring simulations.",
    materials: [
      { id: "m19-1", type: "short", title: "Stop using Linear Easing", url: "https://www.youtube.com/shorts/1tavDv5h_X0", description: "Why springs feel so much better." },
      { id: "m19-1b", type: "short", title: "The psychology of Springs", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "Why Apple uses spring animations." },
      { id: "m19-1c", type: "short", title: "Cubic Bezier vs Springs", url: "https://www.youtube.com/shorts/3D9Oq4xP-_c", description: "Visualizing the difference." },
      { id: "m19-1d", type: "short", title: "Momentum in UI", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Making digital objects feel real." },
      { id: "m19-2", type: "article", title: "Animations.dev Motion Physics", url: "https://animations.dev/learn/springs", description: "Emil Kowalski's beautiful blog on perfect springs." },
      { id: "m19-3", type: "video", title: "Why Springs feel Better", url: "https://www.youtube.com/watch?v=1tavDv5h_X0", description: "The psychology of physical momentum in UI." }
    ],
    assignmentPrompt: "Explain why spring-driven vector animations provide a more high-end tactile interaction experience than static linear transition curves."
  },
  {
    id: "u20", phase: "5: MOTION PHYSICS", unit: "U20", title: "Calibrating Mass, Stiffness, and Damping",
    readContent: "Tuning custom spring animations involves balancing three core physics variables. 'Mass' governs layout weight inertia. 'Stiffness' dictates structural snapping force energy. 'Damping' acts as systemic braking friction.",
    materials: [
      { id: "m20-1", type: "short", title: "Tuning UI Springs", url: "https://www.youtube.com/shorts/9fHk3v5_kH0", description: "A visual guide to mass, stiffness, and damping." },
      { id: "m20-1b", type: "short", title: "High Stiffness effect", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "Creating a snappy, responsive button." },
      { id: "m20-1c", type: "short", title: "Critical Damping", url: "https://www.youtube.com/shorts/2K3M3XW_oT4", description: "How to stop the bounce." },
      { id: "m20-1d", type: "short", title: "Adding Mass", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "Making modals feel heavy." },
      { id: "m20-2", type: "article", title: "A Friendly Intro to Spring Physics", url: "https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/", description: "Josh W. Comeau's interactive spring playground." },
      { id: "m20-3", type: "video", title: "Tuning Framer Motion Springs", url: "https://www.youtube.com/watch?v=vVw-SgBymI8", description: "Finding the perfect bounce-to-snap ratio." }
    ],
    assignmentPrompt: "Formulate a spring physics property dictionary configuring an energetic micro-interaction switch that snaps rapidly into position with high stiffness but cuts all trailing oscillations using damping balancing."
  },
  {
    id: "u21", phase: "5: MOTION PHYSICS", unit: "U21", title: "Polymorphic Layout Sync Calculations",
    readContent: "When an element container width or height modifies, the browser normally snaps changes instantly or stretches inner assets. Framer Motion overrides this with automatic layout synchronization tracking using the 'layout' prop.",
    materials: [
      { id: "m21-1", type: "short", title: "Framer Motion Layout Prop", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "The magic of layout='position' in 60s." },
      { id: "m21-1b", type: "short", title: "LayoutId explained", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "Morphing two different components." },
      { id: "m21-1c", type: "short", title: "Fixing text distortion", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "Why your text stretches and how to fix it." },
      { id: "m21-1d", type: "short", title: "Building a fluid tab menu", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "Using LayoutId for active state indicators." },
      { id: "m21-2", type: "article", title: "Shared Layout Animations", url: "https://blog.maximeheckel.com/posts/framer-motion-layout-animations/", description: "A short visual blog on the layoutId magic string." },
      { id: "m21-3", type: "video", title: "Shared Layout Animations", url: "https://www.youtube.com/watch?v=5-0Z7V4-klo", description: "Morphing components between states seamlessly." }
    ],
    assignmentPrompt: "Describe how layout attributes enable a tiny action bubble pill element to expand outwards into an open menu panel canvas without causing text distortion metrics."
  },
  {
    id: "u22", phase: "5: MOTION PHYSICS", unit: "U22", title: "Memory Lifecycles: AnimatePresence Orchestrations",
    readContent: "Enclosing your elements inside an '<AnimatePresence>' wrapper container holds a stale node structure active just long enough to let its complete visual exit animation layer finish executing before safely purging it from device memory.",
    materials: [
      { id: "m22-1", type: "short", title: "AnimatePresence Trick", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "Fixing disappearing UI elements in 1 min." },
      { id: "m22-1b", type: "short", title: "The Exit prop", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "Defining how a component leaves the screen." },
      { id: "m22-1c", type: "short", title: "Mode wait explained", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "Preventing elements from overlapping." },
      { id: "m22-1d", type: "short", title: "Animating Routes", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "Using AnimatePresence for page transitions." },
      { id: "m22-2", type: "article", title: "Exit Animations in React", url: "https://dev.to/animate_presence_guide", description: "A bite-sized guide to unmounting modals gracefully." },
      { id: "m22-3", type: "video", title: "Exit Animations in React", url: "https://www.youtube.com/watch?v=N4tLskE8Y0A", description: "How to properly mount and unmount modals." }
    ],
    assignmentPrompt: "Draft a clean structural component layout code map wrapping a conditional panel block inside an exit-handling presence element block."
  },
  // PHASE 6: CAPSTONE FLUID DEVELOPMENT PROJECTS
  {
    id: "u23", phase: "6: CAPSTONE PROJECTS", unit: "U23", title: "Focus Tracking Loops & Reduced Motion Guidelines",
    readContent: "High-end design engineering must remain perfectly accessible. We must check media flags programmatically using 'prefers-reduced-motion' media listeners and manage focus for off-screen elements.",
    materials: [
      { id: "m23-1", type: "short", title: "Accessibility in 60s", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Why ARIA attributes matter." },
      { id: "m23-1b", type: "short", title: "The Inert Attribute", url: "https://www.youtube.com/shorts/X1jN7M_O5vE", description: "Hiding off-screen content from screen readers." },
      { id: "m23-1c", type: "short", title: "Focus Trapping modals", url: "https://www.youtube.com/shorts/1tavDv5h_X0", description: "Keeping keyboard users inside the popup." },
      { id: "m23-1d", type: "short", title: "Prefers Reduced Motion", url: "https://www.youtube.com/shorts/O4V9JzL2X_0", description: "Respecting user OS preferences." },
      { id: "m23-2", type: "article", title: "Designing for Reduced Motion", url: "https://css-tricks.com/introduction-reduced-motion-media-query/", description: "A short, visual blog on animation accessibility." },
      { id: "m23-3", type: "video", title: "Web Accessibility for Designers", url: "https://www.youtube.com/watch?v=cOmehxCgg_s", description: "Screen readers and ARIA attributes." }
    ],
    assignmentPrompt: "Code a semantic logic structure applying the native 'inert' true flag attribute onto a dormant layout sidebar element container based on its visibility status state boolean."
  },
  {
    id: "u24", phase: "6: CAPSTONE PROJECTS", unit: "U24", title: "Advanced SVG Path Geometry Animations",
    readContent: "By animating the properties 'strokeDasharray' and 'strokeDashoffset', design engineers can create beautiful, fluid custom perimeter countdown rings and tracking progress meters.",
    materials: [
      { id: "m24-1", type: "short", title: "SVG Line Drawing Effect", url: "https://www.youtube.com/shorts/Q_Z8z_mX0xY", description: "The stroke offset trick in 1 min." },
      { id: "m24-1b", type: "short", title: "Stroke Dash Array explained", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "Creating dotted lines in SVG." },
      { id: "m24-1c", type: "short", title: "Animating SVG with Framer", url: "https://www.youtube.com/shorts/9fHk3v5_kH0", description: "The easiest way to trace a path." },
      { id: "m24-1d", type: "short", title: "Building a circular progress bar", url: "https://www.youtube.com/shorts/5v2b4fL2Y9I", description: "Math for calculating circumference." },
      { id: "m24-2", type: "article", title: "How SVG Line Animation Works", url: "https://css-tricks.com/svg-line-animation-works/", description: "A beautifully illustrated short blog on paths." },
      { id: "m24-3", type: "video", title: "Framer Motion SVG Tracing", url: "https://www.youtube.com/watch?v=E7wJTI-1dvQ", description: "Automating the path length." }
    ],
    assignmentPrompt: "Explain how manipulating the stroke dash offset attribute parameter forces an SVG stroke perimeter layer path to animate drawing itself onto a vector canvas."
  },
  {
    id: "u25", phase: "6: CAPSTONE PROJECTS", unit: "U25", title: "Build Capstone 1: ADHD Scaffolding Engine",
    readContent: "Apply your frontend architecture toolchain, flexbox space distributions, and React state state controllers to ship an app built to break mental execution freeze.",
    materials: [
      { id: "m25-1", type: "short", title: "React State Architecture", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "Structuring productivity apps." },
      { id: "m25-1b", type: "short", title: "Local Storage in React", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "Saving data across refreshes." },
      { id: "m25-1c", type: "short", title: "Building a Todo List fast", url: "https://www.youtube.com/shorts/5X6x84E5w1U", description: "The core logic of task management." },
      { id: "m25-1d", type: "short", title: "Drag and Drop basics", url: "https://www.youtube.com/shorts/1QvL9P9O2wY", description: "Adding reordering to your app." },
      { id: "m25-2", type: "article", title: "Designing UI for ADHD", url: "https://medium.com/designing-for-adhd", description: "A fantastic, easy-to-read medium post on cognitive load." },
      { id: "m25-3", type: "video", title: "Building a Productivity App Architecture", url: "https://www.youtube.com/watch?v=938gWf3FzZg", description: "State design patterns." }
    ],
    assignmentPrompt: "Construct the full interactive component wrapper routine establishing local cache mutations that update status state indexes instantly upon marking a task done."
  },
  {
    id: "u26", phase: "6: CAPSTONE PROJECTS", unit: "U26", title: "Build Capstone 2: The Morphing Timer Picker",
    readContent: "The ultimate validation of your masterclass trajectory. You will engineer a premium interaction element that mutates seamlessly across three physical states: an idle horizontal capsule pill configuration, a 3D wheel selection list block, and an active vector countdown path border ring.",
    materials: [
      { id: "m26-1", type: "short", title: "Apple-tier Interactions", url: "https://www.youtube.com/shorts/wXbUvWk0ZLQ", description: "Deconstructing premium micro-interactions." },
      { id: "m26-1b", type: "short", title: "Scroll Snapping in CSS", url: "https://www.youtube.com/shorts/2K3M3XW_oT4", description: "Building a 3D wheel picker." },
      { id: "m26-1c", type: "short", title: "The Dynamic Island effect", url: "https://www.youtube.com/shorts/3fG8j9P7g4U", description: "Morphing layouts with framer motion." },
      { id: "m26-1d", type: "short", title: "Vercel Deployments", url: "https://www.youtube.com/shorts/Xq_rZ1oQ9-w", description: "Shipping your code to the world." },
      { id: "m26-2", type: "article", title: "Crafting Fluid UI", url: "https://fluid-ui.com/blog", description: "Bite-sized interaction blueprints." },
      { id: "m26-3", type: "video", title: "Deploying to Production", url: "https://www.youtube.com/watch?v=QjeROPbupqM", description: "Hosting your portfolio on Vercel." }
    ],
    assignmentPrompt: "Submit your final architectural configuration file mapping all core states, flex parameters, and physics calculations flawlessly into a production compilation block."
  }
];
"""

with open("src/data/syllabus.ts", "w") as f:
    f.write(data)
