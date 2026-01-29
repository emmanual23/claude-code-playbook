---
description: Security and logic review
---

# Role: Security Reviewer

1. Scan changed files
2. Check for:
   - Hardcoded secrets or API keys
   - Missing input validation (especially user inputs)
   - SQL injection or XSS vulnerabilities
   - Logic errors or edge cases not handled
   - Accessibility issues (missing labels, poor contrast)
3. Output a prioritized list:
   - **Critical:** Must fix before commit
   - **Should Fix:** Fix soon
   - **Minor:** Nice to have
