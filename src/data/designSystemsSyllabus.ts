import { ModuleItem } from './syllabus';

export const DS_SYLLABUS_DATA: ModuleItem[] = [
  // PHASE 1: Fundamentals & Strategy
  {
    id: "ds-u1",
    phase: "Phase 1: Fundamentals & Strategy",
    unit: "U1",
    title: "What is a Design System?",
    readContent: "Understand the core definition of a design system. It's not just a UI kit; it's a living product serving other products. We will explore how top organizations scale their design and development processes using robust systems.",
    materials: [
      {
        id: "ds-u1-m1",
        title: "A Design System is a Product",
        description: "Dan Mall on treating your design system like a product.",
        type: "article",
        url: "https://danmall.com/posts/design-system-product/"
      },
      {
        id: "ds-u1-m2",
        title: "Atomic Design Principles",
        description: "Brad Frost's foundational methodology.",
        type: "article",
        url: "https://atomicdesign.bradfrost.com/"
      }
    ],
    assignmentPrompt: "Step 1 — Audit: Identify 3 inconsistencies in your current product's UI (e.g., different button styles, inconsistent spacing). Document them with screenshots.\\nStep 2 — Propose: Write a short paragraph on how a design system would solve these specific issues. (Hint: Review the curated materials on why design systems exist if you are blocked.)"
  },
  {
    id: "ds-u2",
    phase: "Phase 1: Fundamentals & Strategy",
    unit: "U2",
    title: "Selling the System",
    readContent: "A design system without adoption is just a graveyard of components. Learn how to get executive buy-in, define your system's ROI, and secure the resources needed to build and maintain it.",
    materials: [
      {
        id: "ds-u2-m1",
        title: "Selling Design Systems",
        description: "How to pitch the business value.",
        type: "article",
        url: "https://www.designsystem.university/articles"
      }
    ],
    assignmentPrompt: "Step 1 — Elevator Pitch: Draft a 60-second pitch for your executive team explaining the ROI of a design system.\\nStep 2 — Metrics: List 3 KPIs you would use to measure the success of the system (e.g., time to market, accessibility score). (Hint: Review articles on design system ROI if you get stuck.)"
  },
  
  // PHASE 2: Design Architecture & Tokens
  {
    id: "ds-u3",
    phase: "Phase 2: Design Architecture & Tokens",
    unit: "U3",
    title: "Design Tokens Foundations",
    readContent: "Design tokens are the atomic values of your visual design (colors, typography, spacing). They bridge the gap between design tools and code. In this module, you will establish a semantic token architecture.",
    materials: [
      {
        id: "ds-u3-m1",
        title: "Design Tokens in Figma",
        description: "How to structure variables and tokens.",
        type: "video",
        url: "https://www.youtube.com/watch?v=123"
      }
    ],
    assignmentPrompt: "Step 1 — Primitives: Create a core color palette (primary, secondary, neutral, error, success) with 9 shades each.\\nStep 2 — Semantics: Map your primitive colors to semantic tokens (e.g., background-primary, text-danger, border-focus). (Hint: Review the video on Figma variables and token aliasing if you are blocked.)"
  },
  {
    id: "ds-u4",
    phase: "Phase 2: Design Architecture & Tokens",
    unit: "U4",
    title: "Typography & Spatial Systems",
    readContent: "A robust design system needs predictable rhythm. Learn to build a modular type scale and an 8pt spatial grid system that developers and designers can consistently apply.",
    materials: [
      {
        id: "ds-u4-m1",
        title: "The 8pt Grid System",
        description: "Why and how to use an 8pt grid.",
        type: "article",
        url: "https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632"
      }
    ],
    assignmentPrompt: "Step 1 — Type Scale: Define a modular scale (e.g., 1.2x ratio) and create Figma text styles for headings and body text.\\nStep 2 — Spacing: Define your spacing tokens (4, 8, 16, 24, 32, etc.) and apply them to a layout wireframe. (Hint: Review the 8pt grid article if you need guidance on spatial ratios.)"
  },
  {
    id: "ds-u5",
    phase: "Phase 2: Design Architecture & Tokens",
    unit: "U5",
    title: "Publishing & Handoff for Tokens",
    readContent: "Once your tokens are defined in Figma, you must publish and share them with developers. We'll explore tooling like Style Dictionary and Figma REST API plugins to sync design changes directly into codebases, ensuring a single source of truth.",
    materials: [
      {
        id: "ds-u5-m1",
        title: "Design Tokens W3C Community Group",
        description: "Understanding the standard format for tokens.",
        type: "article",
        url: "https://www.w3.org/community/design-tokens/"
      },
      {
        id: "ds-u5-m2",
        title: "Using Style Dictionary",
        description: "Amazon's build system for design tokens.",
        type: "article",
        url: "https://amzn.github.io/style-dictionary/"
      }
    ],
    assignmentPrompt: "Step 1 — Export: Use a Figma plugin (like Token Studio or Variables Export) to export your tokens as a JSON file.\\nStep 2 — Translate: Write a basic Style Dictionary configuration to transform that JSON into CSS Custom Properties (CSS variables) for developers. (Hint: Review the Style Dictionary quickstart guide if you get stuck.)"
  },

  // PHASE 3: Component Engineering
  {
    id: "ds-u6",
    phase: "Phase 3: Component Engineering",
    unit: "U6",
    title: "Building the Button (The Ultimate Test)",
    readContent: "The button is the quintessential design system component. It must handle states, sizes, icons, and accessibility. We will build a bulletproof button component in Figma and code.",
    materials: [
      {
        id: "ds-u6-m1",
        title: "Anatomy of a Button",
        description: "Everything that goes into a button component.",
        type: "article",
        url: "https://uxdesign.cc/button-design-user-interface-components-series-85243b6736c7"
      }
    ],
    assignmentPrompt: "Step 1 — Figma Component: Create a Button component with variants for Size (sm, md, lg), Hierarchy (primary, secondary, ghost), and State (default, hover, active, disabled).\\nStep 2 — Code Setup: Build the React component using Tailwind or standard CSS modules, mapping the props to the exact Figma variants. (Hint: Inspect Figma's Auto Layout documentation and React prop types if you get stuck.)"
  },
  {
    id: "ds-u7",
    phase: "Phase 3: Component Engineering",
    unit: "U7",
    title: "Form Inputs & Validation",
    readContent: "Forms are where users interact most heavily with data. Creating robust inputs, selects, and checkboxes that manage validation states cleanly is a core responsibility of a design system.",
    materials: [
      {
        id: "ds-u7-m1",
        title: "Designing Perfect Text Inputs",
        description: "Best practices for form design.",
        type: "article",
        url: "https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03"
      }
    ],
    assignmentPrompt: "Step 1 — Anatomy: Build a TextInput component that supports a label, placeholder, helper text, and error text.\\nStep 2 — Accessibility: Ensure your input uses correct aria-attributes (e.g., aria-invalid, aria-describedby) when in an error state. (Hint: Review MDN Web Docs on ARIA form accessibility if you are blocked.)"
  },

  // PHASE 4: Documentation & Tooling
  {
    id: "ds-u8",
    phase: "Phase 4: Documentation & Tooling",
    unit: "U8",
    title: "Component Driven Development with Storybook",
    readContent: "Storybook is the industry standard for developing UI components in isolation. It serves as both a testing sandbox and a living documentation site for developers.",
    materials: [
      {
        id: "ds-u8-m1",
        title: "Storybook Tutorial",
        description: "Official guide to getting started.",
        type: "video",
        url: "https://storybook.js.org/tutorials/"
      }
    ],
    assignmentPrompt: "Step 1 — Setup: Install Storybook in your React project.\\nStep 2 — First Story: Write stories for your Button component, showcasing every variant and state. Add documentation comments using JSDoc. (Hint: Check the Storybook docs on ArgTypes and controls if you need help.)"
  },
  {
    id: "ds-u9",
    phase: "Phase 4: Documentation & Tooling",
    unit: "U9",
    title: "Writing Excellent Guidelines",
    readContent: "Code is not enough. You must explain *how* and *when* to use components. Great documentation bridges the gap between designers, writers, and engineers.",
    materials: [
      {
        id: "ds-u9-m1",
        title: "Zeroheight & Documentation Strategies",
        description: "How to structure design system documentation.",
        type: "article",
        url: "https://zeroheight.com/blog/"
      }
    ],
    assignmentPrompt: "Step 1 — Do's and Don'ts: Write usage guidelines for your Modal component. Provide 2 clear 'Do' examples and 2 'Don\\'t' examples.\\nStep 2 — Voice and Tone: Draft a short paragraph defining how error messages should be written within your system. (Hint: Look at Shopify Polaris or Material Design guidelines for inspiration if blocked.)"
  },

  // PHASE 5: Governance & Scaling
  {
    id: "ds-u10",
    phase: "Phase 5: Governance & Scaling",
    unit: "U10",
    title: "Contribution Models",
    readContent: "As your organization grows, the core team cannot build everything. You need a clear process for other teams to propose, build, and merge new components into the design system.",
    materials: [
      {
        id: "ds-u10-m1",
        title: "Design System Governance",
        description: "Models for contribution and maintenance.",
        type: "article",
        url: "https://www.smashingmagazine.com/2021/08/design-system-governance/"
      }
    ],
    assignmentPrompt: "Step 1 — The Funnel: Draft a 4-step contribution process (e.g., Propose -> Design Review -> Code -> Publish).\\nStep 2 — Governance Model: Decide if your system will be Centralized, Federated, or Cyclical, and write a justification for why. (Hint: Review the Smashing Magazine article on governance models if you get stuck.)"
  },
  {
    id: "ds-u11",
    phase: "Phase 5: Governance & Scaling",
    unit: "U11",
    title: "Versioning and Releases",
    readContent: "When you break a component, you break dozens of products. Semantic versioning, changelogs, and deprecation strategies are critical for maintaining trust with your consuming teams.",
    materials: [
      {
        id: "ds-u11-m1",
        title: "Semantic Versioning for Design Systems",
        description: "How to handle breaking changes safely.",
        type: "article",
        url: "https://semver.org/"
      }
    ],
    assignmentPrompt: "Step 1 — Changelog: Write a sample release note for a Minor version bump where you added a new 'Ghost' button variant.\\nStep 2 — Deprecation: Write a deprecation warning message to display in the console when a developer uses an outdated 'LegacyBanner' component. (Hint: Review React deprecation warnings or SemVer rules if blocked.)"
  }
  ,
  // PHASE 6: Enterprise Scaling & B2C Complexity
  {
    id: "ds-u12",
    phase: "Phase 6: Enterprise Scaling & B2C",
    unit: "U12",
    title: "Multi-Brand & Theming",
    readContent: "Hyper-growth consumer apps need to adapt rapidly. Learn how to architect your token system to support seamless white-labeling, dark mode, and dynamic event-driven theming (like a 'Diwali mode' or 'IPL theme') without duplicating code.",
    materials: [
      {
        id: "ds-u12-m1",
        title: "Theming in Design Systems",
        description: "Strategies for scalable theming.",
        type: "article",
        url: "https://medium.com/eightshapes-llc/theming-in-design-systems-d2890539f99"
      }
    ],
    assignmentPrompt: `Step 1 — Architecture: Structure a JSON token file to support 'brand-a', 'brand-b', and 'dark-mode' utilizing a multi-layered token approach (Core -> Semantic -> Component).
Step 2 — Code: Implement a React Provider that swaps CSS variables on the root HTML element when a theme changes. (Hint: Review CSS Custom Properties and React Context if you are blocked.)`
  },
  {
    id: "ds-u13",
    phase: "Phase 6: Enterprise Scaling & B2C",
    unit: "U13",
    title: "Multi-Platform Sync (Web, iOS, Android)",
    readContent: "A unicorn scale system spans multiple platforms. We'll explore how to distribute tokens and core components to React Native, Swift, and Kotlin, ensuring the iOS app looks just as consistent as the Web app.",
    materials: [
      {
        id: "ds-u13-m1",
        title: "Cross-Platform Design Systems",
        description: "Managing a system across platforms.",
        type: "video",
        url: "https://www.youtube.com/watch?v=crossplatform"
      }
    ],
    assignmentPrompt: "Step 1 — Style Dictionary: Configure Style Dictionary to output XML for Android and Swift dictionaries for iOS from your core JSON tokens.
Step 2 — React Native: Create a basic Button component in React Native that consumes these shared tokens. (Hint: Look at the Style Dictionary iOS/Android formatting docs if you get stuck.)"
  },
  {
    id: "ds-u14",
    phase: "Phase 6: Enterprise Scaling & B2C",
    unit: "U14",
    title: "Localization (i18n) & Typography Scaling",
    readContent: "Building for a diverse market requires robust internationalization. We will cover Right-to-Left (RTL) layout flips, maintaining rhythm with complex regional font fallbacks, and handling string length variations.",
    materials: [
      {
        id: "ds-u14-m1",
        title: "Designing for Internationalization",
        description: "Best practices for i18n in UI.",
        type: "article",
        url: "https://www.w3.org/International/techniques/authoring-html"
      }
    ],
    assignmentPrompt: "Step 1 — RTL Support: Update your layout and spacing CSS to use logical properties (e.g., margin-inline-start instead of margin-left).
Step 2 — Font Fallbacks: Define a comprehensive font stack that elegantly degrades for Hindi, Tamil, and other regional scripts. (Hint: Review CSS Logical Properties on MDN if you are blocked.)"
  },
  {
    id: "ds-u15",
    phase: "Phase 6: Enterprise Scaling & B2C",
    unit: "U15",
    title: "Motion Systems & Micro-Interactions",
    readContent: "Consumer apps rely on delight to retain users. Learn how to codify motion into tokens (durations, easings, spring physics) and build standardized animation wrappers to ensure UI feels snappy and fluid.",
    materials: [
      {
        id: "ds-u15-m1",
        title: "Designing a Motion System",
        description: "How to tokenize animation.",
        type: "article",
        url: "https://material.io/design/motion/understanding-motion.html"
      }
    ],
    assignmentPrompt: "Step 1 — Motion Tokens: Define a set of duration (fast, base, slow) and easing (expressive, standard) tokens.
Step 2 — Implementation: Build a React wrapper component (using Framer Motion or pure CSS) that applies these tokens to standard entrance/exit animations. (Hint: Review the Framer Motion layout animations documentation if you get stuck.)"
  },
  {
    id: "ds-u16",
    phase: "Phase 6: Enterprise Scaling & B2C",
    unit: "U16",
    title: "Performance & Tree-Shaking at Scale",
    readContent: "In B2C, every kilobyte counts. We'll dive into optimizing your component library so consuming applications can aggressively tree-shake unused code and load CSS lazily, vital for lower-end mobile devices.",
    materials: [
      {
        id: "ds-u16-m1",
        title: "Optimizing UI Libraries",
        description: "Tree-shaking and bundle analysis.",
        type: "article",
        url: "https://web.dev/reduce-javascript-payloads-with-tree-shaking/"
      }
    ],
    assignmentPrompt: "Step 1 — Build Config: Configure Rollup or Webpack in your design system to preserve ES modules, enabling tree-shaking for consumers.
Step 2 — Bundle Analysis: Run a bundle analyzer on a sample consuming app to verify that importing only the 'Button' does not include the code for 'DatePicker'. (Hint: Review Rollup's preserveModules flag if you are blocked.)"
  },
  {
    id: "ds-u17",
    phase: "Phase 6: Enterprise Scaling & B2C",
    unit: "U17",
    title: "Analytics & Component Telemetry",
    readContent: "To scale effectively, you must understand how your system is being used. Learn how to inject non-intrusive telemetry into core components to track adoption metrics and confidently deprecate old patterns based on real usage data.",
    materials: [
      {
        id: "ds-u17-m1",
        title: "Measuring Design System Success",
        description: "Tracking usage and adoption.",
        type: "article",
        url: "https://figma.com/blog/measuring-design-system-adoption/"
      }
    ],
    assignmentPrompt: "Step 1 — Tracking: Wrap your Button component with an analytics hook that fires an event (in dev mode) detailing which variant is being used.
Step 2 — Dashboards: Design a simple schema (JSON) for aggregating this data to show which components are most heavily utilized across all company repos. (Hint: Review React Context for injecting analytics providers if you get stuck.)"
  }

];
