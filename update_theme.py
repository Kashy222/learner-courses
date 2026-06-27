import re

with open("src/LearningDashboard.tsx", "r") as f:
    content = f.read()

# mapping of replacements
replacements = {
    'bg-[#09090b]': 'bg-anthropic-bg',
    'bg-[#18181b]': 'bg-anthropic-card',
    'bg-zinc-800/80': 'bg-anthropic-border',
    'bg-zinc-800/50': 'bg-anthropic-border',
    'bg-zinc-800/30': 'bg-anthropic-border',
    'bg-zinc-800': 'bg-anthropic-border',
    'bg-zinc-700/50': 'bg-anthropic-border',
    'bg-zinc-700': 'bg-anthropic-border',
    'bg-emerald-500/10': 'bg-anthropic-accent/10',
    'bg-emerald-500/20': 'bg-anthropic-accent/20',
    'bg-emerald-500/30': 'bg-anthropic-accent/30',
    'bg-emerald-500': 'bg-anthropic-accent',
    'hover:bg-emerald-400': 'hover:bg-anthropic-accentHover',
    'hover:bg-emerald-500/10': 'hover:bg-anthropic-accent/10',
    'hover:bg-zinc-800/30': 'hover:bg-anthropic-bg',
    'hover:bg-zinc-800': 'hover:bg-anthropic-bg',
    'hover:bg-[#18181b]': 'hover:bg-anthropic-card',
    'border-[#27272a]': 'border-anthropic-border',
    'border-[#3f3f46]': 'border-anthropic-accent/30',
    'border-[#09090b]': 'border-anthropic-bg',
    'border-zinc-700': 'border-anthropic-border',
    'border-zinc-600': 'border-anthropic-accent/30',
    'border-emerald-500/30': 'border-anthropic-accent/30',
    'border-emerald-500': 'border-anthropic-accent',
    'hover:border-zinc-500': 'hover:border-anthropic-accent/50',
    'hover:border-[#3f3f46]': 'hover:border-anthropic-accent/50',
    'text-[#a1a1aa]': 'text-anthropic-muted',
    'text-[#71717a]': 'text-anthropic-muted',
    'text-[#3f3f46]': 'text-anthropic-muted',
    'text-white': 'text-anthropic-text',
    'text-emerald-500': 'text-anthropic-accent',
    'text-emerald-400': 'text-anthropic-accent',
    'text-emerald-300': 'text-anthropic-accentHover',
    'text-zinc-500': 'text-anthropic-muted',
    'text-zinc-400': 'text-anthropic-muted',
    'text-zinc-300': 'text-anthropic-text',
    'text-neutral-950': 'text-white',
    'hover:text-emerald-500': 'hover:text-anthropic-accent',
    'hover:text-emerald-300': 'hover:text-anthropic-accentHover',
    'hover:text-[#a1a1aa]': 'hover:text-anthropic-text',
    'hover:text-white': 'hover:text-anthropic-text',
    'group-hover:text-[#71717a]': 'group-hover:text-anthropic-text',
    'group-hover:text-emerald-500': 'group-hover:text-anthropic-accent',
    'shadow-[0_0_20px_rgba(34,197,94,0.15)]': 'shadow-sm',
    'hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]': 'hover:shadow-md',
    'shadow-emerald-950/20': 'shadow-md',
    'ring-emerald-500/30': 'ring-anthropic-accent/30',
    'ring-emerald-500': 'ring-anthropic-accent',
    'focus:border-emerald-500': 'focus:border-anthropic-accent',
    'focus:ring-emerald-500/30': 'focus:ring-anthropic-accent/30',
    'font-bold': 'font-semibold',
    'selection:bg-emerald-500/30': 'selection:bg-anthropic-accent/30',
    'selection:text-emerald-200': 'selection:text-anthropic-bg',
}

for k, v in replacements.items():
    content = content.replace(k, v)

# Add font-serif to headers
content = content.replace('<h1 className="text-3xl', '<h1 className="text-3xl font-serif')
content = content.replace('<h2 className="text-anthropic-text', '<h2 className="text-anthropic-text font-serif')
content = content.replace('<h3 className={`font-medium', '<h3 className={`font-serif font-medium')
content = content.replace('<h4 className="text-sm', '<h4 className="text-sm font-serif')

with open("src/LearningDashboard.tsx", "w") as f:
    f.write(content)
