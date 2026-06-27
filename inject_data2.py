import json

data = """export interface LearningMaterial {
  id: string;
  type: 'video' | 'article';
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
      { id: "m1-1", type: "video", title: "The Command Line Crash Course", url: "https://www.youtube.com/watch?v=oxuRxtrO2Ag", description: "A highly visual 15-minute primer on navigating UNIX systems." },
      { id: "m1-2", type: "article", title: "MDN Command Line First Steps", url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line", description: "The official Mozilla guide to terminal navigation commands." },
      { id: "m1-3", type: "video", title: "Advanced Bash Scripting for Designers", url: "https://www.youtube.com/watch?v=tK9Oc6AEnR4", description: "How to chain commands to automate your asset generation." }
    ],
    assignmentPrompt: "Write out a terminal command sequence that would create a brand new directory folder titled 'ui-components', navigate straight into that newly created folder, and output its empty directory content layout list."
  },
  {
    id: "u2", phase: "1: THE TOOLCHAIN", unit: "U2", title: "Package Managers: What is pnpm?",
    readContent: "Modern web applications depend on thousands of modular, open-source micro-libraries (such as React, Tailwind CSS, and Framer Motion). A Package Manager is the software utility that downloads, configures, and tracks versions for these external code modules.",
    materials: [
      { id: "m2-1", type: "video", title: "NPM vs Yarn vs PNPM", url: "https://www.youtube.com/watch?v=I2V85Sjf8W8", description: "Understanding the architectural differences in package resolution." },
      { id: "m2-2", type: "article", title: "pnpm Core Architecture Motivation", url: "https://pnpm.io/motivation", description: "Why pnpm's global hard-link store is the industry standard." },
      { id: "m2-3", type: "article", title: "Managing package.json Dependencies", url: "https://docs.npmjs.com/cli/v9/configuring-npm/package-json", description: "Reading and understanding dependency graphs." }
    ],
    assignmentPrompt: "Draft out the exact command strings you would execute inside your terminal shell window to initialize a brand new project scaffolding configuration using pnpm, followed by the command to explicitly install the modern 'motion/react' animation library."
  },
  {
    id: "u3", phase: "1: THE TOOLCHAIN", unit: "U3", title: "Understanding Vite & Dev Pipelines",
    readContent: "Browsers cannot naturally execute raw TypeScript, advanced JSX layouts, or deeply componentized CSS modules—they require a compiler. Vite is a hyper-fast modern frontend build tool that acts as your local developer pipeline server.",
    materials: [
      { id: "m3-1", type: "video", title: "Vite in 100 Seconds", url: "https://www.youtube.com/watch?v=KCrXgy8Yj7I", description: "A high-speed technical breakdown of ES module bundling." },
      { id: "m3-2", type: "article", title: "Vite Complete Developer Guide", url: "https://vite.dev/guide/", description: "Setting up a Vite server from scratch." },
      { id: "m3-3", type: "video", title: "Hot Module Replacement Explained", url: "https://www.youtube.com/watch?v=hcMpsEyv62A", description: "How HMR preserves state during CSS tweaks." }
    ],
    assignmentPrompt: "Explain in your own explicit design words what structural transformation happens to your live web view window when a developer tool like Vite leverages Hot Module Replacement (HMR) during a micro design revision tweak."
  },
  {
    id: "u4", phase: "1: THE TOOLCHAIN", unit: "U4", title: "Repository Control: Git Primitives",
    readContent: "Git is a mathematical time-machine version tracking utility for software engineering. It records layout text modifications made line-by-line across your entire project file hierarchy.",
    materials: [
      { id: "m4-1", type: "video", title: "Git for Professionals", url: "https://www.youtube.com/watch?v=hwP7ThBXygE", description: "Visualizing branches and commits as a design tree." },
      { id: "m4-2", type: "article", title: "Git Version Control Handbook", url: "https://git-scm.com/doc", description: "The definitive open-source Git specification." },
      { id: "m4-3", type: "video", title: "Resolving Merge Conflicts in UI Code", url: "https://www.youtube.com/watch?v=HosP0wxKlqs", description: "How to handle overlapping CSS class edits." }
    ],
    assignmentPrompt: "Draft the chronological step-by-step Git bash terminal checklist required to stage all your modified workspace dashboard changes, commit them with a descriptive narrative message, and push them to your main tracking branch."
  },
  // PHASE 2: CORE HTML STRUCTURES
  {
    id: "u5", phase: "2: HTML DOM STRUCTURES", unit: "U5", title: "Semantic Document Architecture & DOM Trees",
    readContent: "HTML (HyperText Markup Language) establishes structural meaning and structural identity on the web canvas. The browser parses your hierarchical markup text elements into a live parent-child operational map known as the Document Object Model (DOM) Tree.",
    materials: [
      { id: "m5-1", type: "video", title: "The DOM for Designers", url: "https://www.youtube.com/watch?v=sK2ed_tE3X0", description: "Visualizing the document object model as a layer tree." },
      { id: "m5-2", type: "article", title: "MDN Semantic Element Directory", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", description: "Comprehensive reference for semantic tags." },
      { id: "m5-3", type: "article", title: "Accessibility through Semantics", url: "https://web.dev/learn/accessibility/semantics", description: "Why screen readers depend on proper HTML mapping." }
    ],
    assignmentPrompt: "Structure a clean semantic HTML structural code skeleton mapping out a responsive card item containing a primary media image frame, a middle details row container, and a bottom call-to-action button element."
  },
  {
    id: "u6", phase: "2: HTML DOM STRUCTURES", unit: "U6", title: "HTML Elements as Layout Bounding Boxes",
    readContent: "Every HTML component is interpreted as a rectangular layout bounding box outline by the engine. Block elements greedily absorb 100% of their horizontal parent dimension space, forcing adjacent elements to stack underneath them. Inline elements only take up the width of their native internal content.",
    materials: [
      { id: "m6-1", type: "video", title: "Block vs Inline Render Contexts", url: "https://www.youtube.com/watch?v=ixZ7A6FvXh8", description: "How the browser determines stacking vs flowing." },
      { id: "m6-2", type: "article", title: "Web.dev Learn HTML Element Foundations", url: "https://web.dev/learn/html/elements", description: "The foundational layout behaviors of core elements." },
      { id: "m6-3", type: "video", title: "CSS Display Properties Deep Dive", url: "https://www.youtube.com/watch?v=QjeROPbupqM", description: "How to override native element bounding boxes." }
    ],
    assignmentPrompt: "If an h1 heading element and a span text element are typed back-to-back inside an HTML page block, describe how they will orient themselves on the live canvas according to block vs inline layout logic rules."
  },
  // PHASE 3: ADVANCED CSS LAYOUT MECHANICS
  {
    id: "u7", phase: "3: ADVANCED CSS MECHANICS", unit: "U7", title: "The CSS Box Model Masterclass",
    readContent: "The Box Model governs every single layout margin dimension on the web. It states that the footprint of an element is calculated by stacking four concentric structural properties: Content, Padding, Border, and Margin.",
    materials: [
      { id: "m7-1", type: "video", title: "The Box Model Explained Visually", url: "https://www.youtube.com/watch?v=rIO5326FgPE", description: "A spatial breakdown of padding, border, and margin." },
      { id: "m7-2", type: "article", title: "MDN Building Blocks: The Box Model", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model", description: "The definitive guide to layout footprints." },
      { id: "m7-3", type: "article", title: "Josh W. Comeau Box Model Interactive", url: "https://www.joshwcomeau.com/css/custom-css-reset/", description: "Why box-sizing: border-box is crucial for designers." },
      { id: "m7-4", type: "video", title: "Debugging Layout Overflows", url: "https://www.youtube.com/watch?v=7kVeCqQCxlk", description: "How to use dev tools to fix clipped borders." }
    ],
    assignmentPrompt: "If a container box component has a content width config of 300px, 20px padding on all edges, and a 2px border wrapper, calculate its exact total horizontal layout footprint size."
  },
  {
    id: "u8", phase: "3: ADVANCED CSS MECHANICS", unit: "U8", title: "Absolute vs Relative Flow Coordinates",
    readContent: "Elements normally march down a screen sequentially obeying layout flow. Setting an element to 'position: relative' retains its spot in the flow line but acts as an origin anchor point for its children. Setting a child element to 'position: absolute' lifts it completely out of the natural grid.",
    materials: [
      { id: "m8-1", type: "video", title: "CSS Positioning Absolute vs Relative", url: "https://www.youtube.com/watch?v=jx5hdo50a2M", description: "Visualizing the stacking context origin rules." },
      { id: "m8-2", type: "article", title: "Josh W. Comeau Coordinate Guide", url: "https://www.joshwcomeau.com/css/position-absolute-relative/", description: "A masterclass on z-index and coordinate tracking." },
      { id: "m8-3", type: "video", title: "Building Overlay Tooltips", url: "https://www.youtube.com/watch?v=d_kR8UrtuL0", description: "Practical application of absolute coordinates." }
    ],
    assignmentPrompt: "Code the necessary CSS inline declarations to float a small notification badge thumbnail precisely 10px from the absolute upper-right bounds of a relative parent box profile frame."
  },
  {
    id: "u9", phase: "3: ADVANCED CSS MECHANICS", unit: "U9", title: "Foundations of Flexbox (display: flex)",
    readContent: "Flexbox is the exact programmatic equivalent of Figma's Auto Layout panel. Applying 'display: flex' to a parent container instantly shifts all of its direct child blocks from standard block stacking into a dynamic layout row flow line.",
    materials: [
      { id: "m9-1", type: "video", title: "Flexbox in 100 Seconds", url: "https://www.youtube.com/watch?v=u044iM9xsWU", description: "The absolute fastest primer on flex initialization." },
      { id: "m9-2", type: "article", title: "CSS-Tricks Guide to Flexbox System", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", description: "The industry standard visual cheat sheet." },
      { id: "m9-3", type: "video", title: "Kevin Powell's Flexbox Deep Dive", url: "https://www.youtube.com/watch?v=k32voqQhODc", description: "Translating Auto Layout into flex code." }
    ],
    assignmentPrompt: "Write out the single line property initialization command that transforms a basic document card outline into an active horizontal auto layout engine container."
  },
  {
    id: "u10", phase: "3: ADVANCED CSS MECHANICS", unit: "U10", title: "Flexbox Direction Vectors (row vs column)",
    readContent: "Just like clicking the horizontal or vertical arrow toggles inside Figma Auto Layout frames, the 'flex-direction' property dictates the orientation path of your items.",
    materials: [
      { id: "m10-1", type: "video", title: "CSS Flex-Direction Masterclass", url: "https://www.youtube.com/watch?v=9S_9S2v7S4U", description: "How main and cross axes flip based on direction." },
      { id: "m10-2", type: "article", title: "MDN CSS Layout Flex Direction", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction", description: "Technical specification for flow paths." }
    ],
    assignmentPrompt: "Create an inline layout code model for an overlay component housing a vertical stack of buttons, specifying the direction property rule clearly."
  },
  {
    id: "u11", phase: "3: ADVANCED CSS MECHANICS", unit: "U11", title: "Main Axis Space Distribution",
    readContent: "The main axis is the path traveling in the direction of your flex alignment flow. The property 'justify-content' dictates how empty, unabsorbed container space is allocated across your elements.",
    materials: [
      { id: "m11-1", type: "video", title: "Mastering justify-content and gap", url: "https://www.youtube.com/watch?v=r_G_N5C7gXk", description: "Spacing elements mathematically on the main axis." },
      { id: "m11-2", type: "article", title: "Web.dev Learning CSS Flexbox Space", url: "https://web.dev/learn/css/flexbox", description: "How space-between and space-around differ." },
      { id: "m11-3", type: "article", title: "The gap property in Flexbox", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap", description: "Why margin should be replaced by gap." }
    ],
    assignmentPrompt: "Identify the exact space distribution property token rule you would deploy to separate a left-aligned company branding header logo from a right-aligned application user action navigation deck."
  },
  {
    id: "u12", phase: "3: ADVANCED CSS MECHANICS", unit: "U12", title: "Cross Axis Baseline Balancing",
    readContent: "Perpendicular to the main flow line sits the cross axis. The 'align-items' property acts as your alignment metric rule across this secondary plane.",
    materials: [
      { id: "m12-1", type: "video", title: "Aligning Items in Flexbox", url: "https://www.youtube.com/watch?v=hZgMAtE7f0A", description: "Fixing off-center icon and text pairings." },
      { id: "m12-2", type: "article", title: "MDN Cross Axis Alignment Properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/align-items", description: "Stretch, center, and baseline values explained." }
    ],
    assignmentPrompt: "If a text layer is resting slightly higher than an adjacent calendar icon button inside a navigation frame, what cross axis alignment rule corrects this spatial drift?"
  },
  // PHASE 4: REACT APPLICATION LOGIC (THE BRAIN)
  {
    id: "u13", phase: "4: REACT APPLICATION LOGIC", unit: "U13", title: "Introduction to JavaScript Logic Circuits",
    readContent: "JavaScript is the kinetic logic track layer of frontend applications. Variables act as design system storage cells. Functions act as actionable macro buttons that execute explicit UI rule sequences.",
    materials: [
      { id: "m13-1", type: "video", title: "JavaScript for Designers", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk", description: "Visualizing variables and functions." },
      { id: "m13-2", type: "article", title: "Just JavaScript Conceptual Database", url: "https://justjavascript.com", description: "Mental models for how JS handles memory." },
      { id: "m13-3", type: "video", title: "Arrow Functions Explained", url: "https://www.youtube.com/watch?v=h33Srr5J9nY", description: "The modern syntax for writing logic blocks." }
    ],
    assignmentPrompt: "Write out a simple JavaScript function structure named 'calculateProgress' that takes two numeric arguments, performs a division, and outputs a calculated percentage string."
  },
  {
    id: "u14", phase: "4: REACT APPLICATION LOGIC", unit: "U14", title: "React Architecture & Component Decomposition",
    readContent: "React splits complex web pages into localized, reusable, self-contained layout structures called Components. A Component is a JavaScript function that processes input tokens ('props') and returns a visual UI tree layout using JSX markup language.",
    materials: [
      { id: "m14-1", type: "video", title: "React in 100 Seconds", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM", description: "The high-level architecture of UI components." },
      { id: "m14-2", type: "article", title: "Thinking in React Trees", url: "https://react.dev/learn/thinking-in-react", description: "The official design-to-code decomposition guide." },
      { id: "m14-3", type: "video", title: "Passing Props in React", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk", description: "How parent layers send data to children layers." }
    ],
    assignmentPrompt: "Deconstruct an interactive product checkout card diagram into an explicit text hierarchy outline detailing every standalone sub-component block."
  },
  {
    id: "u15", phase: "4: REACT APPLICATION LOGIC", unit: "U15", title: "The Virtual DOM & Reconciliation Life Cycles",
    readContent: "Directly updating browser HTML elements is computationally slow and cause visual lag. React solves this by maintaining a lightweight in-memory mirror copy known as the Virtual DOM.",
    materials: [
      { id: "m15-1", type: "video", title: "The Virtual DOM Explained", url: "https://www.youtube.com/watch?v=7YhdqIR2Yzo", description: "How Diffing prevents layout thrashing." },
      { id: "m15-2", type: "article", title: "React Render and Commit Cycles", url: "https://react.dev/learn/render-and-commit", description: "Understanding when React updates the screen." }
    ],
    assignmentPrompt: "Summarize why a design engineer should prioritize state-driven Virtual DOM reconciliation updates over manual element style mutations."
  },
  {
    id: "u16", phase: "4: REACT APPLICATION LOGIC", unit: "U16", title: "State Management: A Component's Memory",
    readContent: "Normal variables wipe out and reset every time a function re-runs. React provides 'useState', a persistent data hook storage vault that allows a component instance to retain memory data parameters over time.",
    materials: [
      { id: "m16-1", type: "video", title: "useState Hook Explained", url: "https://www.youtube.com/watch?v=O6P86uwfdR0", description: "How to trigger UI updates safely." },
      { id: "m16-2", type: "article", title: "React State Architectural Systems", url: "https://react.dev/learn/state-a-components-memory", description: "The official guide to persistent component memory." },
      { id: "m16-3", type: "video", title: "State Updates as Queues", url: "https://www.youtube.com/watch?v=d_kR8UrtuL0", description: "Why state updates are asynchronous." }
    ],
    assignmentPrompt: "Code the React hook initialization pattern tracking a boolean state switch named 'isMenuExpanded' defaulting to an initial closed setting."
  },
  {
    id: "u17", phase: "4: REACT APPLICATION LOGIC", unit: "U17", title: "Conditional Presentation Architectures",
    readContent: "Conditional rendering is the logic engine that automatically determines what layout variant to display based on active state parameters.",
    materials: [
      { id: "m17-1", type: "video", title: "Conditional Rendering Patterns", url: "https://www.youtube.com/watch?v=7o5FPa5Qn08", description: "Ternary operators vs logical AND statements." },
      { id: "m17-2", type: "article", title: "React Conditional Render Guidelines", url: "https://react.dev/learn/conditional-rendering", description: "Cleanest approaches for empty states." }
    ],
    assignmentPrompt: "Draft a clean JSX inline conditional rendering structure that checks if an active state string matches 'loading' to output a spinning asset container, else rendering a complete content card block."
  },
  // PHASE 5: HIGH-FIDELITY MOTION PHYSICS
  {
    id: "u18", phase: "5: MOTION PHYSICS", unit: "U18", title: "Declarative Animation Syntax (motion/react)",
    readContent: "Traditional CSS transition systems require you to manage complex property mutation tracks across stylesheets. Framer Motion replaces this with a clean declarative syntax model.",
    materials: [
      { id: "m18-1", type: "video", title: "Framer Motion Crash Course", url: "https://www.youtube.com/watch?v=zVqJvtDkZNo", description: "Getting started with the <motion.div> element." },
      { id: "m18-2", type: "article", title: "Motion for React Declared API", url: "https://motion.dev/docs/react-quick-start", description: "The initial and animate prop specification." },
      { id: "m18-3", type: "video", title: "Variants in Framer Motion", url: "https://www.youtube.com/watch?v=1tavDv5h_X0", description: "Orchestrating staggered children animations." }
    ],
    assignmentPrompt: "Code a declarative animation state property block map that dictates an alert message box initial hidden phase and its terminal slide-in focus placement layout."
  },
  {
    id: "u19", phase: "5: MOTION PHYSICS", unit: "U19", title: "Linear vs Spring Physics Vectors",
    readContent: "Linear animation curves move elements smoothly across uniform time intervals, which looks robotic and artificial. Premium design engineering relies on physics-based spring simulations.",
    materials: [
      { id: "m19-1", type: "video", title: "Why Springs feel Better", url: "https://www.youtube.com/watch?v=1tavDv5h_X0", description: "The psychology of physical momentum in UI." },
      { id: "m19-2", type: "article", title: "Animations.dev Motion Physics", url: "https://animations.dev/learn/springs", description: "Emil Kowalski's guide to perfect springs." }
    ],
    assignmentPrompt: "Explain why spring-driven vector animations provide a more high-end tactile interaction experience than static linear transition curves."
  },
  {
    id: "u20", phase: "5: MOTION PHYSICS", unit: "U20", title: "Calibrating Mass, Stiffness, and Damping",
    readContent: "Tuning custom spring animations involves balancing three core physics variables. 'Mass' governs layout weight inertia. 'Stiffness' dictates structural snapping force energy. 'Damping' acts as systemic braking friction.",
    materials: [
      { id: "m20-1", type: "video", title: "Tuning Framer Motion Springs", url: "https://www.youtube.com/watch?v=vVw-SgBymI8", description: "Finding the perfect bounce-to-snap ratio." },
      { id: "m20-2", type: "article", title: "Motion API Reference: Spring Mechanics", url: "https://motion.dev/docs/react-animation#spring", description: "The absolute physics values." },
      { id: "m20-3", type: "article", title: "Josh W. Comeau Spring Physics", url: "https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/", description: "A highly visual explainer." }
    ],
    assignmentPrompt: "Formulate a spring physics property dictionary configuring an energetic micro-interaction switch that snaps rapidly into position with high stiffness but cuts all trailing oscillations using damping balancing."
  },
  {
    id: "u21", phase: "5: MOTION PHYSICS", unit: "U21", title: "Polymorphic Layout Sync Calculations",
    readContent: "When an element container width or height modifies, the browser normally snaps changes instantly or stretches inner assets. Framer Motion overrides this with automatic layout synchronization tracking using the 'layout' prop.",
    materials: [
      { id: "m21-1", type: "video", title: "Shared Layout Animations", url: "https://www.youtube.com/watch?v=5-0Z7V4-klo", description: "Morphing components between states seamlessly." },
      { id: "m21-2", type: "article", title: "Motion Layout Sync Frameworks", url: "https://motion.dev/docs/react-layout-animation", description: "The layoutId magic string." }
    ],
    assignmentPrompt: "Describe how layout attributes enable a tiny action bubble pill element to expand outwards into an open menu panel canvas without causing text distortion metrics."
  },
  {
    id: "u22", phase: "5: MOTION PHYSICS", unit: "U22", title: "Memory Lifecycles: AnimatePresence Orchestrations",
    readContent: "Enclosing your elements inside an '<AnimatePresence>' wrapper container holds a stale node structure active just long enough to let its complete visual exit animation layer finish executing before safely purging it from device memory.",
    materials: [
      { id: "m22-1", type: "video", title: "Exit Animations in React", url: "https://www.youtube.com/watch?v=N4tLskE8Y0A", description: "How to properly mount and unmount modals." },
      { id: "m22-2", type: "article", title: "AnimatePresence API Document", url: "https://motion.dev/docs/react-animate-presence", description: "The wait flag and exit prop." }
    ],
    assignmentPrompt: "Draft a clean structural component layout code map wrapping a conditional panel block inside an exit-handling presence element block."
  },
  // PHASE 6: CAPSTONE FLUID DEVELOPMENT PROJECTS
  {
    id: "u23", phase: "6: CAPSTONE PROJECTS", unit: "U23", title: "Focus Tracking Loops & Reduced Motion Guidelines",
    readContent: "High-end design engineering must remain perfectly accessible. We must check media flags programmatically using 'prefers-reduced-motion' media listeners and manage focus for off-screen elements.",
    materials: [
      { id: "m23-1", type: "video", title: "Web Accessibility for Designers", url: "https://www.youtube.com/watch?v=cOmehxCgg_s", description: "Screen readers and ARIA attributes." },
      { id: "m23-2", type: "article", title: "Reduced Motion with Framer", url: "https://motion.dev/docs/react-use-reduced-motion", description: "The useReducedMotion hook." }
    ],
    assignmentPrompt: "Code a semantic logic structure applying the native 'inert' true flag attribute onto a dormant layout sidebar element container based on its visibility status state boolean."
  },
  {
    id: "u24", phase: "6: CAPSTONE PROJECTS", unit: "U24", title: "Advanced SVG Path Geometry Animations",
    readContent: "By animating the properties 'strokeDasharray' and 'strokeDashoffset', design engineers can create beautiful, fluid custom perimeter countdown rings and tracking progress meters.",
    materials: [
      { id: "m24-1", type: "video", title: "Animating SVG Paths", url: "https://www.youtube.com/watch?v=vJNVRAMny9k", description: "The stroke offset trick." },
      { id: "m24-2", type: "article", title: "MDN SVG Coordinate Attribute", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset", description: "Technical implementation details." },
      { id: "m24-3", type: "video", title: "Framer Motion SVG Tracing", url: "https://www.youtube.com/watch?v=E7wJTI-1dvQ", description: "Automating the path length." }
    ],
    assignmentPrompt: "Explain how manipulating the stroke dash offset attribute parameter forces an SVG stroke perimeter layer path to animate drawing itself onto a vector canvas."
  },
  {
    id: "u25", phase: "6: CAPSTONE PROJECTS", unit: "U25", title: "Build Capstone 1: ADHD Scaffolding Engine",
    readContent: "Apply your frontend architecture toolchain, flexbox space distributions, and React state state controllers to ship an app built to break mental execution freeze.",
    materials: [
      { id: "m25-1", type: "video", title: "Building a Productivity App Architecture", url: "https://www.youtube.com/watch?v=938gWf3FzZg", description: "State design patterns." },
      { id: "m25-2", type: "article", title: "Design Systems Engineering Hub", url: "https://github.com", description: "Reference open source architecture." }
    ],
    assignmentPrompt: "Construct the full interactive component wrapper routine establishing local cache mutations that update status state indexes instantly upon marking a task done."
  },
  {
    id: "u26", phase: "6: CAPSTONE PROJECTS", unit: "U26", title: "Build Capstone 2: The Morphing Timer Picker",
    readContent: "The ultimate validation of your masterclass trajectory. You will engineer a premium interaction element that mutates seamlessly across three physical states: an idle horizontal capsule pill configuration, a 3D wheel selection list block, and an active vector countdown path border ring.",
    materials: [
      { id: "m26-1", type: "video", title: "Premium Micro-Interactions", url: "https://www.youtube.com/watch?v=YpB01S0Eob0", description: "Building an Apple-tier interaction layout." },
      { id: "m26-2", type: "article", title: "Advanced Physics Layout Compilations", url: "https://animations.dev/examples", description: "Real-world interaction blueprints." },
      { id: "m26-3", type: "video", title: "Deploying to Production", url: "https://www.youtube.com/watch?v=QjeROPbupqM", description: "Hosting your portfolio on Vercel." }
    ],
    assignmentPrompt: "Submit your final architectural configuration file mapping all core states, flex parameters, and physics calculations flawlessly into a production compilation block."
  }
];
"""

with open("src/data/syllabus.ts", "w") as f:
    f.write(data)
