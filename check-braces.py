with open('/home/iain/ba-training/app/tutorial/chapter-3/page.tsx', 'r') as f:
    content = f.read()

# Track brace balance with exact positions
balance = 0
lines = content.split('\n')

for i, line in enumerate(lines):
    old_balance = balance
    line_opens = line.count('{')
    line_closes = line.count('}')
    balance += line_opens - line_closes
    
    if balance < 0:
        print(f'Line {i+1}: Unmatched closing brace! Balance: {balance}')
        break
    elif old_balance != balance:
        if i < 20 or i > 450:  # Show first 20 lines and last part of file
            print(f'Line {i+1}: Balance changed from {old_balance} to {balance} (opens: {line_opens}, closes: {line_closes})')
        
print(f'Final balance: {balance}')
if balance > 0:
    print(f'Missing {balance} closing braces')