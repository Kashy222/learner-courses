import re
import json

new_data = [
  {
    "id": "phase-1",
    "title": "PHASE 1: LAYOUT CRAFTSMANSHIP",
    "modules": [
      {
        "id": "u1",
        "unit": "U1",
        "title": "HTML as a Layout Layer (Boxes inside Boxes)",
        "concept": "Every element rendered on a digital screen is interpreted by the browser's graphics engine as a geometric bounding box. Writing structural HTML means defining layout hierarchy and intent before applying stylistic flair. A parent element creates an isolated, structural boundary box that safely frames and encapsulates its child nodes.",
        "videoUrl": "https://www.youtube.com/watch?v=sK2ed_tE3X0",
        "resources": [
          { "label": "Frontend Mentor Layouts", "url": "https://www.frontendmentor.io" },
          { "label": "MDN HTML Primitives", "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" }
        ],
        "assignment": "Take a standard Figma card layout. Map out its exact structural nesting tree using plain text code blocks. Use <div> for container blocks, <h1> for title boundaries, <p> for secondary typography layers, and <button> for clickable action frames."
      },
      {
        "id": "u2",
        "unit": "U2",
        "title": "The Figma-to-CSS Translation (Properties & Box Model)",
        "concept": "The CSS Box Model is the immutable blueprint behind internet rendering architecture. It divides space into four contiguous rings: Core Content, internal Padding spacing, the bounding visible Border, and external isolating Margins. Every property configured inside the Figma developer inspect pane correlates directly to these absolute math limits.",
        "videoUrl": "https://www.youtube.com/watch?v=zD_exLzPMMY",
        "resources": [
          { "label": "MDN Box Model Guide", "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model" },
          { "label": "Josh W. Comeau Interactive", "url": "https://www.joshwcomeau.com" }
        ],
        "assignment": "Translate a static Figma button asset specification sheet (Padding: 16px top/bottom and 32px left/right, Border Radius: 12px, Background: #22c55e) into an inline CSS object style declaration."
      },
      {
        "id": "u3",
        "unit": "U3",
        "title": "Deep-Dive Flexbox (The Auto Layout Twin)",
        "concept": "Flexbox functions identically to Figma's Auto Layout engine. Activating flex layout properties transforms a rigid container into a fluid alignment vector line. The direction rule controls the axes flow path (horizontal or vertical orientation arrows). Justify-content calculates element distribution along the primary baseline, while align-items locks cross-axis positioning.",
        "videoUrl": "https://www.youtube.com/watch?v=u044iM9xsWU",
        "resources": [
          { "label": "Kevin Powell Flexbox Hub", "url": "https://www.youtube.com/@KevinPowell" },
          { "label": "CSS-Tricks Flexbox Almanac", "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }
        ],
        "assignment": "Configure the exact layout constraints for a responsive app navigation shell that separates brand graphics to the far left edge and tool handles to the far right limit using layout spacing rules."
      },
      {
        "id": "u4",
        "unit": "U4",
        "title": "Stacking Layers (Absolute vs. Relative Flow)",
        "concept": "Elements normally march down a layout viewport following predictable, block-level alignment flow paths. Declaring a container position as relative anchors its local spatial tracking map. Declaring an internal node position as absolute completely removes it from standard layout lines, enabling developers to precisely float elements on top of each other using grid spacing variables.",
        "videoUrl": "https://www.youtube.com/watch?v=jx5hdo50a2M",
        "resources": [
          { "label": "Josh W. Comeau Coordinate Guide", "url": "https://www.joshwcomeau.com/css/position-absolute-relative/" }
        ],
        "assignment": "Write out the structural block layer markup required to overlay a micro close badge thumbnail cleanly over the upper right hand corner frame of an expanded relative parent media container canvas."
      }
    ]
  },
  {
    "id": "phase-2",
    "title": "PHASE 2: REACT & INTERACTION STATES",
    "modules": [
      {
        "id": "u5",
        "unit": "U5",
        "title": "JavaScript through a Designer's Lens",
        "concept": "JavaScript serves as the kinetic engine powering static layouts. Think of programming functions as interactive click triggers, variables as persistent design token values, and event listeners as custom interaction tracks. It connects canvas actions to state adjustments.",
        "videoUrl": "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        "resources": [
          { "label": "Dan Abramov's Just JavaScript", "url": "https://justjavascript.com" },
          { "label": "MDN JavaScript First Steps", "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps" }
        ],
        "assignment": "Draft a compact pseudo-code event callback structure that listens for a user interface gesture tap and switches an internal active state toggle boolean rule back and forth."
      },
      {
        "id": "u6",
        "unit": "U6",
        "title": "React Components & Architecture",
        "concept": "React architecture is the process of atomizing complex visual compositions into granular, self-contained, re-usable custom blocks. Instead of authoring giant single-page text structures, developers construct micro primitives (Buttons, Inputs, Cards) that inherit localized rendering instructions.",
        "videoUrl": "https://www.youtube.com/watch?v=gnkrDse9QKc",
        "resources": [
          { "label": "React Team: Thinking in React", "url": "https://react.dev/learn/thinking-in-react" }
        ],
        "assignment": "Analyze a data analytics dashboard concept layout screen. Draw or list out the precise hierarchy layout model breakdown, tracking from the global header frame down to modular data cells."
      },
      {
        "id": "u7",
        "unit": "U7",
        "title": "State & Conditional Rendering",
        "concept": "State functions as a component interface's internal brain data tracker. It allows an isolated node to remember vital operational parameters over time (e.g., input field text lines, open panel switches). Conditional rendering checks these data variables to serve up alternative visual layouts automatically.",
        "videoUrl": "https://www.youtube.com/watch?v=35lXJeWeOnA",
        "resources": [
          { "label": "React Memory Systems Documentation", "url": "https://react.dev/learn/state-a-components-memory" },
          { "label": "Frontend Masters Core Tracks", "url": "https://frontendmasters.com" }
        ],
        "assignment": "Map out the code structure matrix checking a dynamic action button layout state machine as it traverses across 'idle', 'loading', and 'success' visualization variants."
      }
    ]
  },
  {
    "id": "phase-3",
    "title": "PHASE 3: HIGH-FIDELITY MOTION PHYSICS",
    "modules": [
      {
        "id": "u8",
        "unit": "U8",
        "title": "Introduction to motion/react (Framer Motion)",
        "concept": "Abandon basic, linear transition durations that feel robotic. High-end user interface interaction relies on declarative animation states. We pass standard component tags explicit initial, animate, and exit maps, transferring calculation loads to physics calculation matrices.",
        "videoUrl": "https://www.youtube.com/watch?v=Go8nTmfrQd8",
        "resources": [
          { "label": "Motion for React API Specification", "url": "https://motion.dev" },
          { "label": "Net Ninja Framer Motion Guides", "url": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVWaS5C40u6N7" }
        ],
        "assignment": "Write out the declarative properties configuration mapping a clean slide-up and fade-in container entry track for an incoming UI notification menu card."
      },
      {
        "id": "u9",
        "unit": "U9",
        "title": "Spring Physics Masterclass",
        "concept": "Premium digital interactions emulate real-world physics mass. Rather than relying on simple ease curves, high-tier layouts leverage spring physics variables: Mass dictates object weight inertia, Stiffness controls speed snap energy, and Damping handles kinetic friction braking bounds.",
        "videoUrl": "https://www.youtube.com/watch?v=1tavDv5h_X0",
        "resources": [
          { "label": "Emil Kowalski's Animations Sandbox", "url": "https://animations.dev" },
          { "label": "Motion for React Spring Engines", "url": "https://motion.dev/docs/react-animation#spring" }
        ],
        "assignment": "Calibrate a spring physics dictionary that achieves a high-velocity responsive snap but restricts total bounce overshoot. Detail your precise damping ratios."
      },
      {
        "id": "u10",
        "unit": "U10",
        "title": "Layout Animations & Morphing",
        "concept": "Traditional browser resizing layout updates trigger harsh frame paint reflow cycles that visually stutter. Framer Motion tracks spatial offsets using advanced matrix calculations. This enables container shapes (width, height, radius) to morph smoothly while maintaining proper typography proportion structures.",
        "videoUrl": "https://www.youtube.com/watch?v=5-0Z7V4-klo",
        "resources": [
          { "label": "Motion for React Layout Synced Pipelines", "url": "https://motion.dev/docs/react-layout-animation" }
        ],
        "assignment": "Diagram the structural layout calculations required to animate a small floating circle profile button as it smoothly expands outwards into an open modal panel container."
      },
      {
        "id": "u11",
        "unit": "U11",
        "title": "AnimatePresence & Exit Animations",
        "concept": "When a React element's data conditional drops to false, it immediately vanishes from the screen with no transition room. AnimatePresence acts as an orchestration layer, freezing state destruction tasks just long enough to let exit animations execute gracefully before full memory unmounting.",
        "videoUrl": "https://www.youtube.com/watch?v=N4tLskE8Y0A",
        "resources": [
          { "label": "Motion for React Exit Animation Ecosystem", "url": "https://motion.dev/docs/react-animate-presence" }
        ],
        "assignment": "Construct a functional code map detailing an active user dismissal swipe gesture track that animates an error card fading out smoothly into hidden coordinates."
      }
    ]
  },
  {
    "id": "phase-4",
    "title": "PHASE 4: PRODUCTION-GRADE PROJECTS",
    "modules": [
      {
        "id": "u12",
        "unit": "U12",
        "title": "Design Engineering Accessibility (A11y)",
        "concept": "High-fidelity motion must never compromise core accessibility guidelines. Modern engineering systems detect motion restriction preferences to bypass flash loops, preserve clear keyboard navigation tab loops, and safely inject inert attributes to hide active background elements from screen readers.",
        "videoUrl": "https://www.youtube.com/watch?v=cOmehxCgg_s",
        "resources": [
          { "label": "W3C Web Accessibility Core Blueprint", "url": "https://www.w3.org/WAI/fundamentals/" },
          { "label": "MDN Web Accessibility Implementation", "url": "https://developer.mozilla.org/en-US/docs/Web/Accessibility" }
        ],
        "assignment": "Write an automated check verifying that an invisible, off-screen mobile slide navigation panel correctly locks out and prevents active keyboard navigation loops."
      },
      {
        "id": "u13",
        "unit": "U13",
        "title": "Capstone Build 1: ADHD Cognitive Scaffolding App",
        "concept": "Synthesize state variables, conditional logic structures, and immediate layout notifications into an active productivity interface engine. The application operates as a rule tracker, breaking large tasks into manageable segments while updating progress records in local caching frameworks.",
        "videoUrl": "https://www.youtube.com/watch?v=938gWf3FzZg",
        "resources": [
          { "label": "Production Design Engineering Repositories", "url": "https://github.com" }
        ],
        "assignment": "Ship a fully functional code routine that monitors nested user milestone items, calculates completion percentages, and pushes values to persistent cache loops instantly."
      },
      {
        "id": "u14",
        "unit": "U14",
        "title": "Capstone Build 2: The Morphing Timer Picker",
        "concept": "Bring your entire design engineering skill set together into a portfolio-defining interaction asset. Construct an integrated state controller that shifts continuously across a compact capsule banner, a rolling 3D wheel list column, and a real-time SVG countdown circle path.",
        "videoUrl": "https://www.youtube.com/watch?v=YpB01S0Eob0",
        "resources": [
          { "label": "Advanced Physics Engineering Blueprints", "url": "https://github.com" }
        ],
        "assignment": "Assemble and integrate your complete layout state variables, connecting custom spring parameters to an active countdown system that functions flawlessly across multiple platforms."
      }
    ]
  }
]

import json

with open("src/LearningDashboard.tsx", "r") as f:
    content = f.read()

# Replace COURSE_DATA
match = re.search(r'const COURSE_DATA = \[(.*?)\];', content, re.DOTALL)
if match:
    data_str = json.dumps(new_data, indent=2)
    # The JSON output uses double quotes, which is fine for JS
    content = content[:match.start()] + "const COURSE_DATA = " + data_str + ";" + content[match.end():]

# Replace JSX for Video Resource
old_video_jsx = """{/* External Video Link */}
                              <a 
                                href={mod.resources?.[0]?.url || "https://youtube.com"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-anthropic-bg border border-anthropic-border hover:border-anthropic-accent/50 hover:bg-anthropic-card transition-all group my-6"
                              >
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-anthropic-accent/10 transition-colors">
                                  <PlayCircle size={16} className="text-anthropic-muted group-hover:text-anthropic-accent transition-colors" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-anthropic-text group-hover:text-anthropic-accent transition-colors">Watch Lesson Video</span>
                                  <span className="text-xs text-anthropic-muted">Opens in new tab</span>
                                </div>
                                <ExternalLink size={14} className="text-anthropic-muted ml-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                              </a>"""

# Let's match the old video JSX flexibly because some classes might have changed.
video_jsx_pattern = r'\{\/\* External Video Link \*\/\}.*?<\/a>'

new_video_jsx = """{/* External Video Link */}
                              {mod.videoUrl && (
                                <a 
                                  href={mod.videoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-anthropic-bg border border-anthropic-border hover:border-anthropic-accent/50 hover:bg-anthropic-card transition-all group my-6"
                                >
                                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-anthropic-accent/10 transition-colors">
                                    <PlayCircle size={16} className="text-anthropic-muted group-hover:text-anthropic-accent transition-colors" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-anthropic-text group-hover:text-anthropic-accent transition-colors">Watch Lesson Video</span>
                                    <span className="text-xs text-anthropic-muted">Opens in new tab</span>
                                  </div>
                                  <ExternalLink size={14} className="text-anthropic-muted ml-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                </a>
                              )}"""

content = re.sub(video_jsx_pattern, new_video_jsx, content, flags=re.DOTALL)

# Replace JSX for Resources link styles
resource_link_pattern = r'className="inline-flex items-center gap-2 text-sm text-anthropic-accent hover:text-anthropic-accentHover transition-colors py-1 px-3 -ml-3 rounded-lg hover:bg-anthropic-accent/10"'

new_resource_link_classes = 'className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 underline transition-colors py-1 px-3 -ml-3 rounded-lg hover:bg-emerald-500/10"'

content = content.replace(resource_link_pattern, new_resource_link_classes)


with open("src/LearningDashboard.tsx", "w") as f:
    f.write(content)
