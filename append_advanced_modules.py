import re

filepath = '/Users/apple/.gemini/antigravity/scratch/learning-dashboard/src/data/designSystemsSyllabus.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

advanced_modules = """  ,
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
    assignmentPrompt: "Step 1 — Architecture: Structure a JSON token file to support 'brand-a', 'brand-b', and 'dark-mode' utilizing a multi-layered token approach (Core -> Semantic -> Component).\\nStep 2 — Code: Implement a React Provider that swaps CSS variables on the root HTML element when a theme changes. (Hint: Review CSS Custom Properties and React Context if you are blocked.)"
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
    assignmentPrompt: "Step 1 — Style Dictionary: Configure Style Dictionary to output XML for Android and Swift dictionaries for iOS from your core JSON tokens.\\nStep 2 — React Native: Create a basic Button component in React Native that consumes these shared tokens. (Hint: Look at the Style Dictionary iOS/Android formatting docs if you get stuck.)"
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
    assignmentPrompt: "Step 1 — RTL Support: Update your layout and spacing CSS to use logical properties (e.g., margin-inline-start instead of margin-left).\\nStep 2 — Font Fallbacks: Define a comprehensive font stack that elegantly degrades for Hindi, Tamil, and other regional scripts. (Hint: Review CSS Logical Properties on MDN if you are blocked.)"
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
    assignmentPrompt: "Step 1 — Motion Tokens: Define a set of duration (fast, base, slow) and easing (expressive, standard) tokens.\\nStep 2 — Implementation: Build a React wrapper component (using Framer Motion or pure CSS) that applies these tokens to standard entrance/exit animations. (Hint: Review the Framer Motion layout animations documentation if you get stuck.)"
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
    assignmentPrompt: "Step 1 — Build Config: Configure Rollup or Webpack in your design system to preserve ES modules, enabling tree-shaking for consumers.\\nStep 2 — Bundle Analysis: Run a bundle analyzer on a sample consuming app to verify that importing only the 'Button' does not include the code for 'DatePicker'. (Hint: Review Rollup's preserveModules flag if you are blocked.)"
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
    assignmentPrompt: "Step 1 — Tracking: Wrap your Button component with an analytics hook that fires an event (in dev mode) detailing which variant is being used.\\nStep 2 — Dashboards: Design a simple schema (JSON) for aggregating this data to show which components are most heavily utilized across all company repos. (Hint: Review React Context for injecting analytics providers if you get stuck.)"
  }
"""

if "Phase 6: Enterprise Scaling" not in content:
    # Find the last closing bracket of the array
    content = re.sub(r'\];\s*$', advanced_modules + '\n];\n', content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Appended advanced modules successfully.")
else:
    print("Modules already exist.")
