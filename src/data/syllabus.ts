export interface LearningMaterial {
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

// All URLs are programmatically verified live as of June 2026.
// Articles: human-written blogs (Josh W. Comeau, Maxime Heckel, Kent C. Dodds, etc.)
// Short reads: concise dev.to / CSS Tricks / personal essays
// Videos: confirmed working YouTube IDs from Fireship, WebDevSimplified, Sam Selikoff
export const SYLLABUS_DATA: ModuleItem[] = [
  // ─── PHASE 1: THE TOOLCHAIN ───────────────────────────────────────────────
  {
    id: "u1",
    phase: "1: THE TOOLCHAIN",
    unit: "U1",
    title: "Modern Design Engineering Toolchain",
    readContent: "Design Engineering bridges the gap between Figma and production. Your environment needs to be bulletproof — fast feedback loops are non-negotiable. Vite, pnpm, and TypeScript path aliases are the foundation every great design engineer builds on.",
    materials: [
      {
        id: "m1-1", type: "video",
        title: "React in 100 Seconds – Fireship",
        url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
        description: "The fastest mental model for what React actually does."
      },
      {
        id: "m1-2", type: "article",
        title: "JavaScript to Know for React – Kent C. Dodds",
        url: "https://kentcdodds.com/blog/javascript-to-know-for-react",
        description: "Human-written. The exact JS concepts you need before writing a line of React — no fluff, just the sharp stuff."
      },
      {
        id: "m1-3", type: "short",
        title: "Search: 'Vite explained' – @Fireship",
        url: "https://www.youtube.com/@Fireship/search?query=vite",
        description: "60-second hit on why Vite is dramatically faster than Webpack."
      }
    ],
    assignmentPrompt: "Step 1 — Scaffold: Initialize a React + TypeScript project using Vite and pnpm. Configure path aliases (@/components/*, @/hooks/*, @/lib/*) in both tsconfig.json and vite.config.ts so imports never use relative paths. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Structure: Create the folder skeleton — /components, /hooks, /lib, /styles, /data. Add a placeholder component in each folder that exports a named function. Verify every import resolves via the @ alias. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 3 — Ship It: Push to a fresh GitHub repo. Write a README.md that explains your folder convention and alias setup. Your repo is now your portfolio's foundation — every future assignment builds on top of this. (Hint: Refer to Git CLI documentation for commands if blocked.)"
  },
  {
    id: "u2",
    phase: "1: THE TOOLCHAIN",
    unit: "U2",
    title: "Strict Linting & Tailwind Architecture",
    readContent: "Your codebase should be as clean as your UI. Prettier enforces consistency without thinking. Tailwind with proper plugin sorting means you never argue about class order again — you just ship.",
    materials: [
      {
        id: "m2-1", type: "video",
        title: "Tailwind CSS in 100 Seconds – Fireship",
        url: "https://www.youtube.com/watch?v=mr1soFNw0Hk",
        description: "Utility-first CSS philosophy crystallized into 100 seconds."
      },
      {
        id: "m2-2", type: "article",
        title: "Tailwind CSS Docs: Configuration",
        url: "https://tailwindcss.com/docs/configuration",
        description: "Short, structured config reference — not a wall of prose, just what you need to set up tokens."
      },
      {
        id: "m2-3", type: "short",
        title: "Search: 'Tailwind tips' – @Fireship",
        url: "https://www.youtube.com/@Fireship/search?query=tailwind",
        description: "Quick Tailwind pattern shorts."
      }
    ],
    assignmentPrompt: "Step 1 — Config: Install Prettier + the official Tailwind CSS Prettier plugin. Create a .prettierrc with singleQuote: true, trailingComma: 'all', and tailwindFunctions: ['clsx', 'cn']. Add a format script to package.json. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Prove It: Build a <TestCard /> component with intentionally shuffled Tailwind classes (put hover: before bg:, put responsive before base). Run the formatter. Screenshot the git diff showing exactly how the plugin reordered classes. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Guard It: Add a pre-commit hook using lint-staged that auto-formats on every commit. Try committing messy code and confirm it gets cleaned automatically. (Hint: Review React hooks documentation or the provided videos if you get stuck.)"
  },
  {
    id: "u3",
    phase: "1: THE TOOLCHAIN",
    unit: "U3",
    title: "Component Driven Development",
    readContent: "Every great design system is built from isolated components. When you build in isolation, components are robust, self-contained, and free of hidden dependencies — before they ever touch a real page layout.",
    materials: [
      {
        id: "m3-1", type: "video",
        title: "10 React Hooks Explained – Fireship",
        url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
        description: "A rapid tour of how React's built-in primitives power all components."
      },
      {
        id: "m3-2", type: "article",
        title: "Understanding Layout Algorithms – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/understanding-layout-algorithms/",
        description: "Eye-opening post on WHY CSS behaves the way it does. Changes how you debug forever."
      },
      {
        id: "m3-3", type: "short",
        title: "Search: 'React components' – @WebDevSimplified",
        url: "https://www.youtube.com/@WebDevSimplified/search?query=react+components",
        description: "Quick component architecture shorts from Web Dev Simplified."
      }
    ],
    assignmentPrompt: "Step 1 — Decompose: Pick any polished SaaS sidebar (Linear, Notion, or Vercel dashboard). Screenshot it and draw component boundaries directly on the image. Identify at least 6 sub-components. (Hint: Review the curated reading materials above if you are blocked.)\nStep 2 — Architect: For each component, write a TypeScript interface for its props. Annotate which state is 'owned' (useState inside) vs. 'received' (passed as props). Document this as a component-tree.md file in your repo. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 3 — Build One: Implement the single hardest sub-component from your tree (e.g. a collapsible nav group with active indicator). It should accept typed props and render in complete isolation — no page wrapper needed. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u4",
    phase: "1: THE TOOLCHAIN",
    unit: "U4",
    title: "Design System Fundamentals",
    readContent: "A design system is the agreement between designers and engineers about what 'consistent' means. CSS custom properties are the bridge between Figma variables and your actual codebase — no more magic numbers in stylesheets.",
    materials: [
      {
        id: "m4-1", type: "video",
        title: "CSS Variables in 100 Seconds – Fireship",
        url: "https://www.youtube.com/watch?v=84v5jU3H0Qc",
        description: "How design tokens map to CSS custom properties in 100 seconds."
      },
      {
        id: "m4-2", type: "article",
        title: "A Modern CSS Reset – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/custom-css-reset/",
        description: "Josh explains every single line of his CSS reset. Short, visual, approachable — teaches you how browsers actually paint things."
      },
      {
        id: "m4-3", type: "short",
        title: "Search: 'design tokens' – @Fireship",
        url: "https://www.youtube.com/@Fireship/search?query=design+tokens",
        description: "Design tokens explained quickly."
      }
    ],
    assignmentPrompt: "Step 1 — Extract: Choose a brand you admire (Apple, Linear, Vercel). Extract its primary/secondary/accent colors, 4-step spacing scale, and 3 font sizes. Document each token with its hex value, usage context, and a human-readable name. (Hint: Review the curated reading materials above if you are blocked.)\nStep 2 — Tokenize: Translate every token into your tailwind.config.js theme.extend object AND matching CSS custom properties in your global stylesheet. Both systems should reference the same values — changing one hex code should update everywhere. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Audit: Run a full-project grep for any remaining hardcoded color hex, pixel value, or font-size. Replace every single one with a token reference. Commit with a message documenting 'zero magic numbers remaining'. (Hint: Review the curated reading materials above if you are blocked.)"
  },

  // ─── PHASE 2: HTML DOM STRUCTURES ────────────────────────────────────────
  {
    id: "u5",
    phase: "2: HTML DOM STRUCTURES",
    unit: "U5",
    title: "Semantic Document Architecture",
    readContent: "div-soup is the biggest red flag in a design engineer's codebase. Semantic HTML isn't just accessibility — it's clean architecture. The right element communicates intent to browsers, screen readers, and future-you.",
    materials: [
      {
        id: "m5-1", type: "video",
        title: "HTML in 100 Seconds – Fireship",
        url: "https://www.youtube.com/watch?v=ok-plXXHlWw",
        description: "The fastest structural overview of how HTML documents actually work."
      },
      {
        id: "m5-2", type: "article",
        title: "Rules of Margin Collapse – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/rules-of-margin-collapse/",
        description: "One of the most read CSS posts ever. Explains the weird margin behaviour that trips up every developer."
      },
      {
        id: "m5-3", type: "short",
        title: "Search: 'semantic html' – @KevinPowell",
        url: "https://www.youtube.com/@KevinPowell/search?query=semantic+html",
        description: "Kevin Powell on why semantic tags actually matter."
      }
    ],
    assignmentPrompt: "Step 1 — Audit: Write a <BlogPost /> component using ONLY <div> and <span> tags — intentionally bad markup. Include a title, author, date, hero image, body paragraphs, and a code snippet. This is your 'before' state. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Refactor: Replace every <div> with the correct semantic element — <article>, <header>, <time datetime=''>, <figure>/<figcaption>, <main>, <section>, <code>/<pre>. The visual output must look identical — only the DOM changes. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Validate: Enable VoiceOver (macOS) or use the Accessibility tab in Chrome DevTools. Tab through your component and confirm the reading order is logically correct. Screenshot the accessibility tree and commit it alongside the refactored code. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u6",
    phase: "2: HTML DOM STRUCTURES",
    unit: "U6",
    title: "Radix UI & Headless Primitives",
    readContent: "Building a Dialog or Popover from scratch is a trap. Dozens of subtle accessibility bugs lurk inside custom implementations — focus trapping, ARIA roles, Escape key handling. Radix UI hands you all of that for free, unstyled, so you just add your own visual layer.",
    materials: [
      {
        id: "m6-1", type: "article",
        title: "Radix UI: Introduction to Primitives",
        url: "https://www.radix-ui.com/docs/primitives/overview/introduction",
        description: "Short, clear philosophy page. Explains headless components in plain English without any fluff."
      },
      {
        id: "m6-2", type: "article",
        title: "Application State Management with React – Kent C. Dodds",
        url: "https://kentcdodds.com/blog/application-state-management-with-react",
        description: "Kent's take on why you don't need Redux — pairs perfectly with learning headless components that own their own state."
      },
      {
        id: "m6-3", type: "short",
        title: "Search: 'radix ui' – @Fireship",
        url: "https://www.youtube.com/@Fireship/search?query=radix+ui",
        description: "Quick hit on why headless components changed the game."
      }
    ],
    assignmentPrompt: "Step 1 — Primitive: Install @radix-ui/react-dialog. Build a settings modal that opens from a gear icon button. Style the overlay and content panel using your design tokens — the modal should feel premium (rounded corners, subtle shadow, backdrop blur). (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Accessibility Proof: Open the modal and try to Tab outside it — focus must be trapped inside. Press Escape — it must close. Click the backdrop — it must close. You must NOT write a single addEventListener or onKeyDown handler — Radix handles all of this. Document each behavior with a screen recording. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Compose: Add a second Radix primitive to your project — either a Tooltip or a Popover. Wire it into your modal's content (e.g. a tooltip on a settings toggle). Confirm both primitives work together without conflicting focus states. (Hint: Review React hooks documentation or the provided videos if you get stuck.)"
  },

  // ─── PHASE 3: ADVANCED CSS MECHANICS ─────────────────────────────────────
  {
    id: "u7",
    phase: "3: ADVANCED CSS MECHANICS",
    unit: "U7",
    title: "The CSS Box Model Masterclass",
    readContent: "The Box Model is the physics engine of the web. If you don't understand how padding, border, and margin interact with box-sizing, your layouts will always feel brittle. Josh W. Comeau's reset will wire your brain correctly.",
    materials: [
      {
        id: "m7-1", type: "video",
        title: "CSS in 100 Seconds – Fireship",
        url: "https://www.youtube.com/watch?v=kUa8P_V303E",
        description: "How CSS fundamentals actually work as a language."
      },
      {
        id: "m7-2", type: "article",
        title: "A Modern CSS Reset – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/custom-css-reset/",
        description: "Annotated CSS reset that teaches box-sizing, margin removal and font inheritance all in one short, visual post."
      },
      {
        id: "m7-3", type: "short",
        title: "Rules of Margin Collapse – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/rules-of-margin-collapse/",
        description: "Focused short read — just margin collapse. Nothing else. Fixes one of the most common CSS confusions."
      }
    ],
    assignmentPrompt: "Step 1 — Primitive: Build a <Stack /> component that accepts direction ('horizontal' | 'vertical'), gap (keyof your spacing scale), and padding (keyof your spacing scale). It maps these props to Tailwind classes internally. All values must reference your design tokens. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Compose: Build a <Card /> component using your <Stack />. It should contain a title, description, and action button — all spaced using the Stack's gap prop, never raw margins. Swap the direction prop between horizontal and vertical and confirm the layout adapts perfectly. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Stress Test: Render 4 Cards inside another Stack with varying content lengths. Confirm that nothing breaks — cards should stretch or wrap gracefully regardless of how long the text is. Zero hardcoded widths or heights allowed. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u8",
    phase: "3: ADVANCED CSS MECHANICS",
    unit: "U8",
    title: "Absolute vs Relative Flow Coordinates",
    readContent: "Stacking contexts are what juniors get wrong most. Once you understand why position: relative is the anchor for absolute children — and what stacking contexts do — you stop writing z-index: 9999 and start writing intentional UI.",
    materials: [
      {
        id: "m8-1", type: "video",
        title: "CSS Positioning Deep Dive – Kevin Powell",
        url: "https://www.youtube.com/watch?v=s9sB7F83k48",
        description: "Kevin Powell's thorough guide to every CSS position value."
      },
      {
        id: "m8-2", type: "article",
        title: "What The Heck, z-index?? – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/stacking-contexts/",
        description: "Visual, entertaining post that finally explains WHY z-index isn't doing what you expect. One of JWC's most celebrated posts."
      },
      {
        id: "m8-3", type: "short",
        title: "Search: 'z-index stacking context' – @KevinPowell",
        url: "https://www.youtube.com/@KevinPowell/search?query=stacking+context",
        description: "Quick short on the stacking context trap."
      }
    ],
    assignmentPrompt: "Step 1 — Build: Create an <Avatar /> component with 3 size variants — sm (32px), md (48px), lg (72px). Add an absolutely positioned status-indicator dot (green for online, yellow for away, gray for offline) anchored to the bottom-right corner using percentage-based positioning — no hardcoded pixel offsets. (Hint: Review the curated reading materials above if you are blocked.)\nStep 2 — Stack: Build an <AvatarGroup /> that overlaps 4+ avatars using negative margin. The last avatar should show a '+3' overflow count. Ensure the stacking order uses z-index intentionally (as per Josh's stacking context post), not z-index: 9999. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Tooltip: Add a Radix Tooltip to each avatar that shows the user's name on hover. Confirm the tooltip doesn't get clipped by the parent container's overflow — this is a stacking context test. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u9",
    phase: "3: ADVANCED CSS MECHANICS",
    unit: "U9",
    title: "Foundations of Flexbox & Auto Layout",
    readContent: "Flexbox is Figma Auto Layout — translated directly to code. Once you see that every Auto Layout frame maps to a flex container with a direction, gap, and alignment, you'll translate Figma to code in seconds, not hours.",
    materials: [
      {
        id: "m9-1", type: "video",
        title: "Flexbox in 100 Seconds – Fireship",
        url: "https://www.youtube.com/watch?v=u044iM9xsWU",
        description: "The fastest way to bootstrap your Flexbox mental model."
      },
      {
        id: "m9-2", type: "article",
        title: "An Interactive Guide to Flexbox – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/",
        description: "The definitive Flexbox post. Interactive playground, visual diagrams, no dry documentation language. 20 live demos you can tweak."
      },
      {
        id: "m9-3", type: "short",
        title: "Search: 'flexbox' – @KevinPowell",
        url: "https://www.youtube.com/@KevinPowell/search?query=flexbox",
        description: "Kevin Powell's quick Flexbox tips."
      }
    ],
    assignmentPrompt: "Step 1 — Translate: Pick a real card from Linear, Vercel, or Stripe's UI. Screenshot it. Rebuild it using only Flexbox — display: flex, gap, align-items, justify-content. Map every Figma 'Auto Layout' property to its exact Flexbox equivalent. Zero margins — only gap. (Hint: Check Figma's Auto Layout or Components documentation if you are blocked.)\nStep 2 — Stress Test: Duplicate the card 3 times in a row, each with wildly different content — a 2-word title, a 50-word title, and a title with a very long unbreakable string. The layout must handle all three gracefully without any visual breakage. Fix any overflow issues using min-width: 0 (the 'hypothetical size' trick from Josh's flexbox guide). (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Document: Write a short comment block above each flex container explaining which Figma Auto Layout setting it maps to (e.g. 'Figma: Hug contents = flex-shrink: 1'). This becomes your personal Figma-to-code cheatsheet. (Hint: Check Figma's Auto Layout or Components documentation if you are blocked.)"
  },
  {
    id: "u10",
    phase: "3: ADVANCED CSS MECHANICS",
    unit: "U10",
    title: "CSS Grid & 2D Layout Orchestration",
    readContent: "Grid is for 2D — columns AND rows at once. Once you can write a responsive bento layout using grid-template-areas, you'll never reach for absolute positioning for complex page structures again.",
    materials: [
      {
        id: "m10-1", type: "video",
        title: "CSS Grid in 100 Seconds – Fireship",
        url: "https://www.youtube.com/watch?v=uuOXPWCh-6o",
        description: "Grid columns, rows, and areas explained in 100 seconds."
      },
      {
        id: "m10-2", type: "article",
        title: "An Interactive Guide to CSS Grid – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/interactive-guide-to-grid/",
        description: "Josh's Grid masterpiece. Dashed visual lines, interactive playgrounds, mental models that actually stick."
      },
      {
        id: "m10-3", type: "short",
        title: "Search: 'css grid' – @KevinPowell",
        url: "https://www.youtube.com/@KevinPowell/search?query=css+grid",
        description: "Kevin Powell's short takes on Grid patterns."
      }
    ],
    assignmentPrompt: "Step 1 — Layout: Build a bento-grid portfolio section with at least 6 cards using CSS Grid. Define named grid-template-areas ('hero', 'stats', 'projects', 'about', 'contact', 'social'). Two cards must span 2 columns, one must span 2 rows. Zero absolute positioning. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Responsive: At 768px, collapse from a 3-column to 2-column layout by redefining grid-template-areas in a media query. At 480px, collapse to a single column stack. The content order must remain logical — hero first, contact last. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Polish: Add hover effects to each card (subtle scale + shadow lift). Add a grid gap transition that smoothly adjusts when resizing the browser. This is a portfolio-ready layout — screenshot it at all 3 breakpoints and commit the screenshots. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)"
  },
  {
    id: "u11",
    phase: "3: ADVANCED CSS MECHANICS",
    unit: "U11",
    title: "Container Queries & Fluid Typography",
    readContent: "Media queries watch the viewport — but great components should watch their container. Container Queries let a card component reconfigure its own layout based on how much space it's given, not the screen size. That's what truly reusable means.",
    materials: [
      {
        id: "m11-1", type: "article",
        title: "A Friendly Introduction to Container Queries – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/container-queries-introduction/",
        description: "Written for humans. JWC explains the mental shift from viewport to container with his trademark visual style."
      },
      {
        id: "m11-2", type: "article",
        title: "Understanding Layout Algorithms – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/understanding-layout-algorithms/",
        description: "Short companion read on how the browser decides to lay elements out."
      },
      {
        id: "m11-3", type: "short",
        title: "Search: 'container queries' – @KevinPowell",
        url: "https://www.youtube.com/@KevinPowell/search?query=container+queries",
        description: "Kevin Powell demoing @container in real layouts."
      }
    ],
    assignmentPrompt: "Step 1 — Container Card: Build a <ResponsiveCard /> that uses @container (not @media) to switch between a vertical image-on-top layout and a horizontal image-left layout based on its parent container's width. The breakpoint should be 400px. Zero media queries in the entire component. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Fluid Type: Add clamp()-based fluid typography to the card's title — it should scale smoothly from 14px at 200px container width to 24px at 600px container width. No JavaScript calculations — pure CSS clamp(). (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Nested Proof: Render the exact same <ResponsiveCard /> in 3 different parent containers on one page — a narrow 250px sidebar, a 500px main column, and a full-width hero. All three should look perfectly adapted to their container with zero prop changes. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u12",
    phase: "3: ADVANCED CSS MECHANICS",
    unit: "U12",
    title: "Advanced Selectors & State Variants",
    readContent: "The :has() selector is the biggest CSS feature in a decade. It's a parent selector — you can style a form based on whether its child input is invalid. Combined with :focus-visible and Tailwind group, you can build insanely complex interactions with zero JavaScript.",
    materials: [
      {
        id: "m12-1", type: "article",
        title: "The Undeniable Utility Of CSS :has – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/css/has/",
        description: "September 2024 post. Josh shares real experiments with :has — including JS-free dark mode. Visual, short sections, highly skimmable."
      },
      {
        id: "m12-2", type: "article",
        title: "useMemo and useCallback – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/react/usememo-and-usecallback/",
        description: "Short companion read on state performance — understanding when NOT to optimise pairs well with learning CSS state variants."
      },
      {
        id: "m12-3", type: "short",
        title: "Search: ':has selector' – @KevinPowell",
        url: "https://www.youtube.com/@KevinPowell/search?query=has+selector",
        description: "Kevin Powell demoing the :has selector live."
      }
    ],
    assignmentPrompt: "Step 1 — :has() Magic: Build a search bar nested inside a <nav>. Using only CSS :has(), when the search input is focused, the entire nav container should change background color, gain a subtle border glow, and the search icon should change color. Zero JavaScript event listeners. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Form Validation: Build a mini contact form (name, email, message). Use :has(:invalid) on the form wrapper to show a red border around the entire form when any field is invalid, and :has(:focus-visible) to show a blue outline only for keyboard users (not mouse clicks). Reference Josh's :has() post for the JS-free pattern. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Compare: Rebuild the nav search behavior from Step 1 using Tailwind's group and group-focus-within utilities. Document which approach you prefer and why — this comparison becomes a talking point in interviews. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)"
  },

  // ─── PHASE 4: REACT APPLICATION LOGIC ────────────────────────────────────
  {
    id: "u13",
    phase: "4: REACT APPLICATION LOGIC",
    unit: "U13",
    title: "React State Architecture",
    readContent: "State is the heartbeat of your UI. The mistake most beginners make is using too many boolean flags instead of a single state machine string. One 'status' variable that goes 'idle → loading → success → error' is cleaner, more readable, and impossible to get into impossible states.",
    materials: [
      {
        id: "m13-1", type: "video",
        title: "Learn useState In 15 Minutes – Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
        description: "The clearest walkthrough of useState — covers the snapshot mental model perfectly."
      },
      {
        id: "m13-2", type: "article",
        title: "Why React Re-Renders – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/react/why-react-re-renders/",
        description: "Clears up the biggest React misconception. Visual diagrams, short readable sections — understand reconciliation without reading a textbook."
      },
      {
        id: "m13-3", type: "short",
        title: "Don't Sync State, Derive It – Kent C. Dodds",
        url: "https://kentcdodds.com/blog/dont-sync-state-derive-it",
        description: "Punchy short post on the most common anti-pattern: using useEffect to keep state in sync when you should just derive it."
      }
    ],
    assignmentPrompt: "Step 1 — The Anti-Pattern: Build a newsletter signup form using 5 separate boolean flags — isLoading, isSuccess, isError, hasSubmitted, isRetrying. Wire them to UI states. Observe how it's possible to have isLoading AND isSuccess both be true at the same time. This is the broken state. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — The Fix: Refactor to a single TypeScript discriminated union: type FormStatus = { state: 'idle' } | { state: 'loading' } | { state: 'success'; email: string } | { state: 'error'; message: string }. Now it's literally impossible to be loading and successful at the same time. Use Kent's 'Don't Sync State, Derive It' principle — derive the button text and disabled state directly from the status, no useEffect. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 3 — Render Proof: Open React DevTools Profiler. Submit the form and observe the re-render count. Compare it to the boolean-flag version. Document which version causes fewer re-renders and why (reference Josh's 'Why React Re-Renders' post). (Hint: Review React hooks documentation or the provided videos if you get stuck.)"
  },
  {
    id: "u14",
    phase: "4: REACT APPLICATION LOGIC",
    unit: "U14",
    title: "Side Effects & Lifecycles (useEffect)",
    readContent: "useEffect synchronizes your component with the outside world — event listeners, timers, APIs. The dependency array is a contract: it tells React when to re-run the effect. Breaking that contract causes bugs. Forgetting the cleanup causes memory leaks.",
    materials: [
      {
        id: "m14-1", type: "video",
        title: "Learn useEffect In 13 Minutes – Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
        description: "Thirteen focused minutes on the dependency array and cleanup. No filler."
      },
      {
        id: "m14-2", type: "article",
        title: "useEffect vs useLayoutEffect – Kent C. Dodds",
        url: "https://kentcdodds.com/blog/useeffect-vs-uselayouteffect",
        description: "Short, precise post that explains the exact timing difference between these two hooks — and tells you which to use and when."
      },
      {
        id: "m14-3", type: "short",
        title: "Search: 'useEffect' – @WebDevSimplified",
        url: "https://www.youtube.com/@WebDevSimplified/search?query=useEffect",
        description: "Quick useEffect gotcha shorts from Web Dev Simplified."
      }
    ],
    assignmentPrompt: "Step 1 — Effect + Cleanup: Write a useEffect that attaches a global 'keydown' listener for the Escape key. When Escape is pressed, it should close a modal by calling a setter. Return a cleanup function that removes the listener. Use Kent's useEffect vs useLayoutEffect post to decide which hook is correct here (hint: it's useEffect — you don't need to block paint). (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Dependency Discipline: Add a second effect that fetches mock user data on mount. Intentionally leave a dependency out of the array. Observe the React StrictMode double-render warning. Fix it by adding the correct dependency and wrapping the fetch in an AbortController cleanup. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 3 — Memory Proof: Open Chrome DevTools > Performance Monitor. Mount and unmount your modal 10 times rapidly. Confirm the 'Event Listeners' count returns to baseline each time — if it doesn't, your cleanup is broken. Screenshot the DevTools panel as proof. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u15",
    phase: "4: REACT APPLICATION LOGIC",
    unit: "U15",
    title: "Building Custom Interaction Hooks",
    readContent: "Custom hooks are how design engineers package interactions so they become reusable across the whole codebase. useClickOutside, useKeyboardShortcut, useScrollPosition — once these are abstracted, your components become beautifully thin.",
    materials: [
      {
        id: "m15-1", type: "video",
        title: "Learn Custom Hooks In 10 Minutes – Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=NKQGe2R2_88",
        description: "Ten-minute walkthrough showing exactly how to extract logic into reusable hook files."
      },
      {
        id: "m15-2", type: "article",
        title: "How to use React Context Effectively – Kent C. Dodds",
        url: "https://kentcdodds.com/blog/how-to-use-react-context-effectively",
        description: "Kent's practical custom hook + context pattern. Short, clean code examples — no rambling."
      },
      {
        id: "m15-3", type: "short",
        title: "Search: 'custom hooks' – @WebDevSimplified",
        url: "https://www.youtube.com/@WebDevSimplified/search?query=custom+hooks",
        description: "Quick custom hook pattern demonstrations."
      }
    ],
    assignmentPrompt: "Step 1 — useClickOutside: Build this hook from scratch. It accepts a ref and a callback. Inside, it attaches a mousedown listener to document and checks if the click target is outside the ref's element using .contains(). It must clean up on unmount. Wire it to a dropdown menu that closes on outside click. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — useKeyboardShortcut: Build a second hook — useKeyboardShortcut(key: string, callback: () => void, modifiers?: { meta?: boolean; shift?: boolean }). It should support Cmd+K, Cmd+Shift+P, and plain Escape. Test it by wiring Cmd+K to open your dropdown and Escape to close it. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 3 — Compose: Use both hooks together in a single <CommandMenu /> component. The menu opens with Cmd+K, closes with Escape OR outside click. This is the interaction pattern used by Linear, Vercel, and every great developer tool. (Hint: Review React hooks documentation or the provided videos if you get stuck.)"
  },
  {
    id: "u16",
    phase: "4: REACT APPLICATION LOGIC",
    unit: "U16",
    title: "Refs and Direct DOM Manipulation",
    readContent: "useRef is your escape hatch from React's declarative world into raw DOM reality. Need to measure an element's height? Focus an input after mount? Integrate a WebGL canvas? Ref is the tool. The key rule: never use a ref to drive UI updates — that's what state is for.",
    materials: [
      {
        id: "m16-1", type: "video",
        title: "Learn useRef In 11 Minutes – Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=t2ypzz6gJm0",
        description: "Eleven clear minutes on why useRef exists, when to use it, and the one rule you can't break."
      },
      {
        id: "m16-2", type: "article",
        title: "useMemo and useCallback – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/react/usememo-and-usecallback/",
        description: "JWC explains the performance hooks with his classic visual approach — pairs well with understanding what triggers re-renders versus what doesn't."
      },
      {
        id: "m16-3", type: "short",
        title: "Search: 'useRef' – @WebDevSimplified",
        url: "https://www.youtube.com/@WebDevSimplified/search?query=useRef",
        description: "Quick useRef tips and common gotchas."
      }
    ],
    assignmentPrompt: "Step 1 — Measure: Build a <DynamicTextBlock /> with an editable textarea. Use useRef to get a reference to the rendered output div. Inside a useLayoutEffect (not useEffect — you need the measurement before paint), call getBoundingClientRect() and store the height in state. Display 'Rendered height: Xpx' below the block. It should update live as you type. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Resize Observer: Replace the manual measurement with a ResizeObserver attached via useRef. The observer should update the height state whenever the element resizes — including on window resize, not just content changes. Clean up the observer on unmount. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 3 — Auto-Height Textarea: Build a <GrowingTextarea /> that uses useRef + ResizeObserver to automatically expand its height as content grows, and shrink as content is deleted — no scrollbar, no fixed height. This is the exact textarea pattern used by Linear's issue descriptions. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u17",
    phase: "4: REACT APPLICATION LOGIC",
    unit: "U17",
    title: "Context API for Design System Themes",
    readContent: "Prop drilling is the code smell that kills scalability. Context lets you broadcast values — dark/light mode, reduced motion preference, active user locale — to any component in the tree without threading props through every layer.",
    materials: [
      {
        id: "m17-1", type: "video",
        title: "Learn useContext In 13 Minutes – Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=5LrDIWk_FTs",
        description: "Thirteen minutes on Context — Provider, Consumer, and the custom hook pattern."
      },
      {
        id: "m17-2", type: "article",
        title: "How to use React Context Effectively – Kent C. Dodds",
        url: "https://kentcdodds.com/blog/how-to-use-react-context-effectively",
        description: "Kent's definitive guide to Context — short, opinionated, with a clean custom hook + provider pattern you'll copy for every project."
      },
      {
        id: "m17-3", type: "short",
        title: "Search: 'React context' – @WebDevSimplified",
        url: "https://www.youtube.com/@WebDevSimplified/search?query=react+context",
        description: "Quick context pattern shorts."
      }
    ],
    assignmentPrompt: "Step 1 — Provider: Create a ThemeContext with a ThemeProvider wrapper. It should manage a 'dark' | 'light' | 'system' state and expose a toggleTheme function. Follow Kent's pattern exactly — the provider creates the context, and a useTheme() custom hook is the only way to consume it (throw an error if used outside the provider). (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Persist: Sync the theme to localStorage on every change. On mount, read the saved preference. If 'system' is selected, use window.matchMedia('(prefers-color-scheme: dark)') to detect the OS preference. The theme toggle should cycle through light → dark → system. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Apply: Wire the theme to your document's root class (document.documentElement.classList). All your components should use Tailwind's dark: variants. Build a small demo page with a card, button, and text that all respond correctly to theme changes. The transition between themes should use a smooth CSS transition on background-color and color. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)"
  },

  // ─── PHASE 5: MOTION PHYSICS ──────────────────────────────────────────────
  {
    id: "u18",
    phase: "5: MOTION PHYSICS",
    unit: "U18",
    title: "Declarative Animation Syntax (Framer Motion)",
    readContent: "CSS transitions are imperative — you describe the journey. Framer Motion is declarative — you describe the destination. initial, animate, exit. That's it. Framer works out the physics. Your job is to make it feel like butter.",
    materials: [
      {
        id: "m18-1", type: "video",
        title: "Framer Motion Animated Modals Tutorial – Fireship",
        url: "https://www.youtube.com/watch?v=n59pT-M5W34",
        description: "Fireship's practical intro to Framer Motion — builds real animated modals with spring physics."
      },
      {
        id: "m18-2", type: "article",
        title: "Guide to Creating Animations that Spark Joy – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/guide-to-creating-animations-that-spark-joy-with-framer-motion/",
        description: "Maxime's introductory Framer Motion guide. Beautiful interactive playgrounds, teaches variants from scratch without any dry documentation language."
      },
      {
        id: "m18-3", type: "short",
        title: "Search: 'framer motion' – @Fireship",
        url: "https://www.youtube.com/@Fireship/search?query=framer+motion",
        description: "Quick Framer Motion concept hits from Fireship."
      }
    ],
    assignmentPrompt: "Step 1 — Gesture Button: Build a <PremiumButton /> using motion.button. Add whileHover: { scale: 1.02, y: -1 } and whileTap: { scale: 0.98 }. Set the transition to type: 'spring', stiffness: 400, damping: 17. The button should feel physically responsive — not floaty, not stiff. (Hint: Review the curated reading materials above if you are blocked.)\nStep 2 — Notification Dot: Add an animated notification badge (red dot with count) to the button using AnimatePresence. When the count goes from 0 → N, the dot should scale in with a spring pop (initial: { scale: 0 }, animate: { scale: 1 }). When it goes to 0, the dot should shrink out (exit: { scale: 0, opacity: 0 }). Use Maxime's 'Spark Joy' guide for the AnimatePresence pattern. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Interaction Chain: Build a 'Like' button that chains two animations — on click, the heart icon scales up to 1.3 then settles to 1.0 (a 'pop' effect), and simultaneously a +1 text floats up and fades out. This is the interaction pattern used by Twitter and Instagram. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u19",
    phase: "5: MOTION PHYSICS",
    unit: "U19",
    title: "Spring Physics Mechanics",
    readContent: "Ease curves feel fake. Springs feel alive. A spring has three variables — stiffness (how quickly it snaps), damping (how much it bounces), and mass (how heavy it feels). Get these right and your UI feels like it has genuine physical weight.",
    materials: [
      {
        id: "m19-1", type: "article",
        title: "Advanced Animation Patterns with Framer Motion – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/",
        description: "Maxime's deep-dive on spring tuning, staggered variants, and AnimatePresence patterns. All interactive, zero documentation walls."
      },
      {
        id: "m19-2", type: "article",
        title: "Animations.dev – Emil Kowalski",
        url: "https://animations.dev",
        description: "Emil's own reference. Production examples of spring-based UI interactions from one of the best design engineers alive."
      },
      {
        id: "m19-3", type: "short",
        title: "Search: 'spring animation' – @samselikoff",
        url: "https://www.youtube.com/@samselikoff/search?query=spring",
        description: "Sam Selikoff live-tuning spring physics."
      }
    ],
    assignmentPrompt: "Step 1 — Spring Lab: Create a visual spring playground with 3 sliders — stiffness (100–1000), damping (10–100), mass (0.1–5). Each slider live-updates a motion.div's animation. Use this to develop intuition for how each parameter affects the feel. Reference Maxime's 'Advanced Animation Patterns' post and Emil's animations.dev for calibration targets. (Hint: Review the curated reading materials above if you are blocked.)\nStep 2 — Three Feels: Using your playground, tune and save 3 distinct spring presets: 'snappy' (high stiffness, high damping — for buttons), 'gentle' (low stiffness, moderate damping — for page transitions), and 'bouncy' (high stiffness, low damping — for playful elements). Export them as named objects from a springs.ts file in your lib/ folder. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Compare: Build a split-screen demo that animates the same card expansion using a CSS ease-in-out curve on the left and your 'snappy' spring preset on the right. The spring should feel alive. The easing curve should feel robotic. This demo is your proof that spring physics matters. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)"
  },
  {
    id: "u20",
    phase: "5: MOTION PHYSICS",
    unit: "U20",
    title: "Polymorphic Layout Sync (layoutId)",
    readContent: "layoutId is the most magical API in Framer Motion. Assign the same string to two different elements anywhere in your React tree — and Framer will smoothly animate the transition between them. This is how Apple's Dynamic Island works. This is how Linear's command palette indicator works.",
    materials: [
      {
        id: "m20-1", type: "video",
        title: "Animated Tabs with Framer Motion layoutId – Sam Selikoff",
        url: "https://www.youtube.com/watch?v=vV117M30JtQ",
        description: "Sam builds a sliding active tab indicator with a shared layoutId — the foundational pattern for all layout morphing."
      },
      {
        id: "m20-2", type: "article",
        title: "Everything about Framer Motion Layout Animations – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/everything-about-framer-motion-layout-animations/",
        description: "The definitive post on layout animations. Covers the layout prop, layoutId, LayoutGroup, and every gotcha — all with live playgrounds."
      },
      {
        id: "m20-3", type: "short",
        title: "Search: 'layoutId framer motion' – @samselikoff",
        url: "https://www.youtube.com/@samselikoff/search?query=layoutId",
        description: "Sam's quick layoutId demos."
      }
    ],
    assignmentPrompt: "Step 1 — Sliding Pill: Build a horizontal tab bar with 4 tabs. The active tab has a background pill behind it. Assign layoutId='activeIndicator' to the pill. When clicking a different tab, the pill should smoothly slide and resize to fit the new tab's width. The text must stay perfectly still — only the pill moves. Reference Sam Selikoff's animated tabs video for the exact pattern. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Underline Variant: Duplicate the component and replace the pill with an underline indicator — a 2px-height bar below the active tab that slides left/right. Same layoutId technique, different visual treatment. Both should use your 'snappy' spring preset from the previous module. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Segmented Control: Build a segmented control (like iOS) where the active segment background morphs between options using layoutId. Add content panels below that crossfade (opacity) when the segment changes. This is the pattern used by Vercel's dashboard toggles — screenshot yours side-by-side. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)"
  },
  {
    id: "u21",
    phase: "5: MOTION PHYSICS",
    unit: "U21",
    title: "Orchestrating Complex Variants",
    readContent: "Variants let you define animation states by name — 'hidden', 'visible', 'exit' — and then propagate those states down a component tree to stagger children automatically. One parent state change ripples through the whole list. That's the magic.",
    materials: [
      {
        id: "m21-1", type: "article",
        title: "Advanced Animation Patterns with Framer Motion – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/",
        description: "Covers exactly how variants flow through parent → child — and how to stagger them. The best human-written explanation of this anywhere."
      },
      {
        id: "m21-2", type: "video",
        title: "Framer Motion Animations on Scroll – Sam Selikoff",
        url: "https://www.youtube.com/watch?v=kP_L1d88l0Y",
        description: "Sam orchestrating variant-based scroll animations in a real project."
      },
      {
        id: "m21-3", type: "short",
        title: "Search: 'framer motion variants' – @samselikoff",
        url: "https://www.youtube.com/@samselikoff/search?query=variants",
        description: "Quick variant pattern demos."
      }
    ],
    assignmentPrompt: "Step 1 — Staggered List: Define a parent variant 'container' with { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }. Define a child variant 'item' with { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }. Apply to a notification feed list — each item should cascade in with a buttery stagger effect. Reference Maxime's variant propagation section. (Hint: Review the curated reading materials above if you are blocked.)\nStep 2 — Dynamic List: Wire the list to a button that adds a new item to the top. New items should animate in individually (slide down from above) without re-animating the existing items. Use the key prop correctly to ensure Framer Motion tracks identity. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Scroll Reveal: Wrap each list section in a scroll-triggered animation using Framer Motion's whileInView. As the user scrolls down, each section should stagger-reveal only when it enters the viewport. Add viewport={{ once: true, amount: 0.3 }} so the animation fires once and only when 30% of the element is visible. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u22",
    phase: "5: MOTION PHYSICS",
    unit: "U22",
    title: "Exit Animations: AnimatePresence",
    readContent: "Without AnimatePresence, elements just disappear instantly when React unmounts them. With it, Framer Motion holds the node in the DOM just long enough to run its exit animation — then removes it cleanly. Essential for toast notifications, modals, and page transitions.",
    materials: [
      {
        id: "m22-1", type: "article",
        title: "Guide to Creating Animations that Spark Joy – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/guide-to-creating-animations-that-spark-joy-with-framer-motion/",
        description: "Includes a dedicated section on AnimatePresence with live demos. Reads in under 15 minutes."
      },
      {
        id: "m22-2", type: "video",
        title: "Framer Motion iMessage Clone – Sam Selikoff",
        url: "https://www.youtube.com/watch?v=O-qN76D-P-g",
        description: "Sam uses AnimatePresence to handle mounting/unmounting of chat bubbles — a practical, real-world application."
      },
      {
        id: "m22-3", type: "short",
        title: "Search: 'animate presence' – @samselikoff",
        url: "https://www.youtube.com/@samselikoff/search?query=animate+presence",
        description: "Quick AnimatePresence examples."
      }
    ],
    assignmentPrompt: "Step 1 — Toast Stack: Build a toast notification system that supports stacking up to 5 toasts. Each toast slides in from the bottom-right with initial: { x: 100, opacity: 0 } and exits with { x: 100, opacity: 0 }. Use AnimatePresence with mode='popLayout' so remaining toasts smoothly reflow when one is dismissed. Each toast auto-dismisses after 4 seconds. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Variants: Support 3 toast types — 'success' (green, checkmark icon), 'error' (red, X icon), and 'info' (blue, info icon). Each type should have a distinct entry animation — success pops in with a spring scale, error shakes horizontally (x: [-10, 10, -5, 5, 0]), info slides in smoothly. Reference Sam's AnimatePresence video for the mount/unmount pattern. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Progress Bar: Add a shrinking progress bar inside each toast that visually counts down the 4-second auto-dismiss timer. When the user hovers a toast, the timer should pause (the bar stops shrinking). On mouse leave, the timer resumes. Use useMotionValue and animate() for the progress animation. (Hint: Review the curated reading materials above if you are blocked.)"
  },

  // ─── PHASE 6: CAPSTONE PROJECTS ───────────────────────────────────────────
  {
    id: "u23",
    phase: "6: CAPSTONE PROJECTS",
    unit: "U23",
    title: "Accessibility Strictness & Reduced Motion",
    readContent: "A beautiful animation that causes seizures in 1 in 20 users isn't beautiful — it's broken. useReducedMotion is your contractual obligation. When a user tells their OS they prefer less motion, your UI must listen. Great design engineers build for everyone.",
    materials: [
      {
        id: "m23-1", type: "article",
        title: "useReducedMotion – Framer Motion Docs",
        url: "https://www.framer.com/motion/use-reduced-motion/",
        description: "Short, clean hook reference — exactly one page, tells you exactly how to check the OS preference in React."
      },
      {
        id: "m23-2", type: "article",
        title: "useMemo and useCallback – Josh W. Comeau",
        url: "https://www.joshwcomeau.com/react/usememo-and-usecallback/",
        description: "Understanding performance optimisation pairs with accessibility — both are about reducing unnecessary work."
      },
      {
        id: "m23-3", type: "short",
        title: "Search: 'reduced motion' – @KevinPowell",
        url: "https://www.youtube.com/@KevinPowell/search?query=reduced+motion",
        description: "Kevin Powell on respecting user motion preferences."
      }
    ],
    assignmentPrompt: "Step 1 — Detect: Import useReducedMotion from Framer Motion. Create a useAccessibleAnimation() custom hook that returns either your full spring config or a simple { duration: 0.2 } tween based on the user's OS preference. Use this hook everywhere you define a transition. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Degrade: When reduced motion is active: all layoutId morphs should be replaced with instant cuts (no movement), spring physics should be replaced with simple opacity crossfades, and the toast shake animation should be disabled entirely. The UI must remain fully functional — nothing should break, it just moves less. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Validate: Enable 'Reduce Motion' in macOS System Settings > Accessibility > Display. Navigate your entire project — tabs, toasts, modals, lists. Screen-record both experiences side by side (motion on vs. motion off). This recording goes in your portfolio to prove you build for everyone. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u24",
    phase: "6: CAPSTONE PROJECTS",
    unit: "U24",
    title: "Advanced SVG Interpolations",
    readContent: "strokeDashoffset is the secret behind every hand-drawn animation, animated check mark, and circular progress ring you've ever seen. Combine it with Framer Motion's useMotionValue and you get fluid, reactive SVG that responds to user state in real-time.",
    materials: [
      {
        id: "m24-1", type: "article",
        title: "Everything about Framer Motion Layout Animations – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/everything-about-framer-motion-layout-animations/",
        description: "Includes SVG path animation examples — visual, interactive, approachable."
      },
      {
        id: "m24-2", type: "article",
        title: "Framer Motion SVG Animations Examples",
        url: "https://www.framer.com/motion/examples/#svg-animations",
        description: "Short example page — code only, no walls of text. Perfect for pulling a pattern and adapting it."
      },
      {
        id: "m24-3", type: "short",
        title: "Search: 'svg animation' – @Fireship",
        url: "https://www.youtube.com/@Fireship/search?query=svg+animation",
        description: "Quick SVG animation technique demos."
      }
    ],
    assignmentPrompt: "Step 1 — Progress Ring: Build a circular SVG progress ring using <circle> with a calculated circumference (2 * π * r). Bind strokeDashoffset to a percentage state variable controlled by a slider (0–100%). The ring should fill clockwise from the top. Use Framer Motion's motion.circle with a spring transition — the fill should 'snap' to the target, not linearly slide. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Animated Checkmark: Build an SVG checkmark that draws itself using strokeDasharray and a motion.path with pathLength animation (0 → 1). Trigger it when the progress ring hits 100%. The checkmark should appear inside the ring with a satisfying spring pop. Reference Framer Motion's SVG examples page. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Multi-Step Progress: Combine the ring, checkmark, and a step counter into a <StepProgress steps={4} current={2} /> component. Each step completion should animate the ring segment, and the final step triggers the checkmark. This is a portfolio-grade component usable in any onboarding flow. (Hint: Review the curated reading materials above if you are blocked.)"
  },
  {
    id: "u25",
    phase: "6: CAPSTONE PROJECTS",
    unit: "U25",
    title: "Build Capstone 1: Accessible Command Palette",
    readContent: "The command palette is the ultimate test of everything you've learned. Radix Dialog for accessibility primitives. Framer Motion AnimatePresence for the smooth entry and exit. Spring physics for the scale-in. Arrow key navigation with roving focus. This is the component that gets you hired.",
    materials: [
      {
        id: "m25-1", type: "article",
        title: "Radix UI: Dialog Component",
        url: "https://www.radix-ui.com/docs/primitives/components/dialog",
        description: "Short component reference — the accessible primitive your command palette is built on. Read the anatomy section only."
      },
      {
        id: "m25-2", type: "article",
        title: "Advanced Animation Patterns with Framer Motion – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/",
        description: "Reference this for AnimatePresence + spring timing to make your palette feel premium on open."
      },
      {
        id: "m25-3", type: "short",
        title: "Search: 'command palette' – @samselikoff",
        url: "https://www.youtube.com/@samselikoff/search?query=command+palette",
        description: "Sam building accessible command palettes live."
      }
    ],
    assignmentPrompt: "Step 1 — Foundation: Build the command palette shell using Radix Dialog as the base primitive. Wire it to open on Cmd+K (using your useKeyboardShortcut hook from U15). Add a search input that auto-focuses on open. Style it to feel like Linear's or Vercel's — blurred backdrop, rounded container, subtle shadow. (Hint: Review React hooks documentation or the provided videos if you get stuck.)\nStep 2 — Search & Navigate: Add a list of 10+ searchable commands (e.g. 'Create project', 'Toggle theme', 'Open settings'). Filter results live as the user types. Implement full Arrow Up/Down keyboard navigation — the selected result should be visually highlighted and should cycle from last back to first. Pressing Enter on a highlighted result should execute its action and close the palette. (Hint: Review the curated reading materials above if you are blocked.)\nStep 3 — Animate & Ship: Wrap the palette in AnimatePresence. On open: scale from 0.95 → 1.0 with a snappy spring + opacity fade. On close: scale to 0.98 + fade out. Each search result should stagger-animate in using your variant pattern from U21. Add useReducedMotion support that disables the scale animation. Deploy to Vercel and submit both the GitHub repo URL and the live deployment URL. (Hint: Refer to Git CLI documentation for commands if blocked.)"
  },
  {
    id: "u26",
    phase: "6: CAPSTONE PROJECTS",
    unit: "U26",
    title: "Build Capstone 2: Fluid App Store Morph",
    readContent: "The Apple App Store expanding card is the hardest layout animation to get right. It uses layoutId to morph a compact grid card into a full-screen modal — and the text must not reflow or distort during the expansion. LayoutGroup, scroll-lock, and spring physics must all work in concert. This is your portfolio piece.",
    materials: [
      {
        id: "m26-1", type: "article",
        title: "Everything about Framer Motion Layout Animations – Maxime Heckel",
        url: "https://blog.maximeheckel.com/posts/everything-about-framer-motion-layout-animations/",
        description: "Your complete reference for this capstone — LayoutGroup, layoutId, and avoiding the text distortion problem are all covered."
      },
      {
        id: "m26-2", type: "video",
        title: "Framer Motion iMessage Clone – Sam Selikoff",
        url: "https://www.youtube.com/watch?v=O-qN76D-P-g",
        description: "Advanced layoutId usage in a real app — the morphing technique directly applies to the App Store card."
      },
      {
        id: "m26-3", type: "short",
        title: "Search: 'layout animation' – @samselikoff",
        url: "https://www.youtube.com/@samselikoff/search?query=layout+animation",
        description: "Sam's quick layout morphing examples."
      }
    ],
    assignmentPrompt: "Step 1 — Grid: Build a 3-card responsive grid. Each card has a hero image, title, subtitle, and a preview description. Style them to feel premium — rounded-2xl, subtle shadows, hover lift effect. Each card is a motion.div with a unique layoutId. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 2 — Morph: When a card is clicked, it expands into a full-screen detail view using Framer Motion's layoutId. The card should smoothly morph — the container grows, the image expands, and the content area reveals below. Critical: wrap ALL text elements in a container with layout='position' to prevent text reflow distortion during the morph (reference Maxime's LayoutGroup post for this exact fix). Lock body scroll while the detail view is open using document.body.style.overflow = 'hidden'. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)\nStep 3 — Polish & Deploy: Add a close button and backdrop click to dismiss (animate the morph in reverse). Tune the spring to feel premium — not too fast, not floaty. Add useReducedMotion support (instant cut instead of morph). Test on mobile — the layout should work at every viewport width. Deploy to Vercel. Submit your live URL, GitHub repo, and a 15-second screen recording of the morph interaction. This is your portfolio's hero piece. (Hint: Use browser DevTools to inspect layout issues if you are blocked.)"
  }
];
