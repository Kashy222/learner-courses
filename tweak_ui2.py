import re

# Update index.css
with open("src/index.css", "r") as f:
    css_content = f.read()

css_replacements = {
    '--color-anthropic-bg: #F9F8F6;': '--color-anthropic-bg: #FDFCFB;\n  --color-anthropic-sidebar: #F2EEE8;\n  --color-anthropic-peachLight: #E8E4DD;',
    '--color-anthropic-border: #E5E3DB;': '--color-anthropic-border: #E6E4DF;',
    '--color-anthropic-accent: #D97757;': '--color-anthropic-accent: #1A1A1A;',
    '--color-anthropic-accentHover: #C26547;': '--color-anthropic-accentHover: #333333;\n  --color-anthropic-peach: #D97757;',
    "'Playfair Display', Georgia, serif;": 'Georgia, Cambria, "Times New Roman", Times, serif;'
}

for k, v in css_replacements.items():
    css_content = css_content.replace(k, v)

with open("src/index.css", "w") as f:
    f.write(css_content)

# Update LearningDashboard.tsx
with open("src/LearningDashboard.tsx", "r") as f:
    tsx_content = f.read()

# Fix emerald links
tsx_content = tsx_content.replace('text-emerald-400 hover:text-emerald-300 underline', 'text-anthropic-text hover:text-anthropic-muted underline decoration-anthropic-border hover:decoration-anthropic-text underline-offset-4 font-medium')

# Make sidebar bg-anthropic-sidebar instead of card
tsx_content = tsx_content.replace('bg-anthropic-card border border-anthropic-border rounded-2xl p-5 max-h-[calc(100vh-8rem)]', 'bg-anthropic-sidebar border-none rounded-2xl p-5 max-h-[calc(100vh-8rem)]')

# Make progress bar sleek black
tsx_content = tsx_content.replace('bg-anthropic-accent rounded-full transition-all duration-700 ease-out', 'bg-anthropic-text rounded-full transition-all duration-700 ease-out')

# Make cards have soft claude shadow
tsx_content = tsx_content.replace('bg-anthropic-card border border-anthropic-border rounded-2xl p-6', 'bg-anthropic-card border border-anthropic-border rounded-2xl p-6 shadow-claude')
tsx_content = tsx_content.replace('bg-anthropic-card border border-anthropic-border rounded-2xl overflow-hidden', 'bg-anthropic-card border border-anthropic-border rounded-2xl overflow-hidden shadow-claude')

# Remove borders from the phase header buttons
tsx_content = tsx_content.replace('border-t border-anthropic-border', 'border-t border-anthropic-border/50')

# Active state in sidebar to use peachLight
tsx_content = tsx_content.replace('bg-anthropic-border/50 border-anthropic-accent/30 text-anthropic-text', 'bg-anthropic-peachLight border-transparent text-anthropic-text font-medium shadow-sm')

# Icons inside sidebar
tsx_content = tsx_content.replace('bg-anthropic-border text-anthropic-text', 'bg-white text-anthropic-text shadow-sm')

# "completed" checkmark color
tsx_content = tsx_content.replace('text-anthropic-accent', 'text-anthropic-peach') # The accent is now black, so we use peach for the checkmarks or success states
tsx_content = tsx_content.replace('text-anthropic-accentHover', 'text-anthropic-peach')
tsx_content = tsx_content.replace('bg-anthropic-accent/10 text-anthropic-peach', 'bg-anthropic-peachLight text-anthropic-peach')

# Change "Resume Learning" button from using accent (black) shadow to a crisp black button
tsx_content = tsx_content.replace('shadow-sm hover:shadow-md', 'shadow-claude hover:shadow-lg')

with open("src/LearningDashboard.tsx", "w") as f:
    f.write(tsx_content)
