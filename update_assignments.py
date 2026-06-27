import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        prompt = match.group(1)
        # Split by \n
        parts = prompt.split('\\n')
        new_parts = []
        for part in parts:
            part = part.replace('Part 1', 'Step 1').replace('Part 2', 'Step 2').replace('Part 3', 'Step 3').replace('Part 4', 'Step 4')
            hint = ""
            lower = part.lower()
            if 'figma' in lower:
                hint = " (Hint: Check Figma's Auto Layout or Components documentation if you are blocked.)"
            elif 'react' in lower or 'state' in lower or 'hook' in lower:
                hint = " (Hint: Review React hooks documentation or the provided videos if you get stuck.)"
            elif 'css' in lower or 'tailwind' in lower or 'layout' in lower:
                hint = " (Hint: Use browser DevTools to inspect layout issues if you are blocked.)"
            elif 'github' in lower or 'repo' in lower:
                hint = " (Hint: Refer to Git CLI documentation for commands if blocked.)"
            else:
                hint = " (Hint: Review the curated reading materials above if you are blocked.)"
            
            new_parts.append(part + hint)
        
        return 'assignmentPrompt: "' + '\\n'.join(new_parts) + '"'

    new_content = re.sub(r'assignmentPrompt:\s*"(.*?)"', replacer, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

process_file('/Users/apple/.gemini/antigravity/scratch/learning-dashboard/src/data/syllabus.ts')
process_file('/Users/apple/.gemini/antigravity/scratch/learning-dashboard/src/data/designSystemsSyllabus.ts')
print("Updated files successfully")
