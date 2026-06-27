import os

files = [
    'src/components/Sidebar.tsx',
    'src/components/ModuleFeed.tsx',
    'src/components/ProgressCard.tsx',
    'src/LearningPlatform.tsx'
]

for file in files:
    if os.path.exists(file):
        with open(file, 'r') as f:
            content = f.read()
        
        # Replace rounded-2xl -> rounded-xl, and rounded-xl -> rounded-lg
        # We need to do this carefully so we don't double replace
        content = content.replace('rounded-xl', 'rounded-lg')
        content = content.replace('rounded-2xl', 'rounded-xl')
        
        with open(file, 'w') as f:
            f.write(content)

# Update index.css to hide/style scrollbars sleekly
css = """
@layer utilities {
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-subtle::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-subtle::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-subtle::-webkit-scrollbar-thumb {
    background: #E6E4DF;
    border-radius: 10px;
  }
  .scrollbar-subtle:hover::-webkit-scrollbar-thumb {
    background: #D4D2CD;
  }
}
"""
with open('src/index.css', 'a') as f:
    f.write(css)
