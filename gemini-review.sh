#!/bin/bash
# Gemini Code Review for GitHub PRs
# Usage: ./scripts/gemini-review.sh <pr-number> [focus-instructions]
#
# Features:
#   - Code review with PASS/NEEDS WORK/FAIL verdict
#   - Recommends specialized reviewers (security, mobile, brand, design, ux)
#   - Creates GitHub tasks for critical issues
#   - Requests Claude review for complex PRs
#
# Examples:
#   ./scripts/gemini-review.sh 236
#   ./scripts/gemini-review.sh 236 "focus on backward compatibility"
#   ./scripts/gemini-review.sh 236 "check if worktree and approve rules are preserved"

set -euo pipefail

PR_NUMBER="${1:-}"
FOCUS="${2:-}"

if [[ -z "$PR_NUMBER" ]]; then
  echo "Usage: $0 <pr-number> [focus-instructions]"
  echo ""
  echo "Examples:"
  echo "  $0 236"
  echo "  $0 236 \"focus on security\""
  echo "  $0 236 \"check backward compatibility\""
  exit 1
fi

echo "Fetching PR #$PR_NUMBER info..."
DIFF=$(gh pr diff "$PR_NUMBER" 2>/dev/null)

if [[ -z "$DIFF" ]]; then
  echo "Error: Could not fetch diff for PR #$PR_NUMBER"
  exit 1
fi

# Get PR info for context
PR_TITLE=$(gh pr view "$PR_NUMBER" --json title -q '.title')
PR_BODY=$(gh pr view "$PR_NUMBER" --json body -q '.body' | head -50)

# Get changed files for reviewer recommendation
CHANGED_FILES=$(gh pr diff "$PR_NUMBER" --name-only 2>/dev/null)
FILE_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')
ADDITION_COUNT=$(gh pr view "$PR_NUMBER" --json additions -q '.additions')
DELETION_COUNT=$(gh pr view "$PR_NUMBER" --json deletions -q '.deletions')
TOTAL_CHANGES=$((ADDITION_COUNT + DELETION_COUNT))

echo "Changed files: $FILE_COUNT, Lines changed: $TOTAL_CHANGES"

# Detect file categories for reviewer recommendations
HAS_UI_FILES=$(echo "$CHANGED_FILES" | grep -E '\.(tsx|css)$' | grep -v '\.test\.' | head -1 || true)
HAS_API_FILES=$(echo "$CHANGED_FILES" | grep -E 'api/|route\.ts|middleware' | head -1 || true)
HAS_AUTH_FILES=$(echo "$CHANGED_FILES" | grep -E 'auth|session|login|password|token' | head -1 || true)
HAS_MOBILE_FILES=$(echo "$CHANGED_FILES" | grep -E 'mobile|responsive|breakpoint' | head -1 || true)
HAS_DESIGN_FILES=$(echo "$CHANGED_FILES" | grep -E 'components/|design|theme|color|style' | head -1 || true)
HAS_COPY_FILES=$(echo "$CHANGED_FILES" | grep -E 'copy|text|message|label|content' | head -1 || true)

# Journey-related files (new CRUDs, navigation, routes, empty states)
HAS_NEW_ROUTES=$(echo "$CHANGED_FILES" | grep -E 'app/.*page\.tsx$|app/.*route\.ts$' | head -1 || true)
HAS_NAVIGATION=$(echo "$CHANGED_FILES" | grep -Ei 'sidebar|nav|header|menu|breadcrumb' | head -1 || true)
HAS_EMPTY_STATES=$(echo "$CHANGED_FILES" | grep -Ei 'empty|emptystate|getting-?started|onboarding' | head -1 || true)
HAS_LINKS=$(echo "$CHANGED_FILES" | grep -E 'Link|router\.push|redirect|navigate' | head -1 || true)

# Check for CRUD operations in diff
HAS_CRUD_IN_DIFF="false"
if echo "$DIFF" | grep -qE '(create|delete|destroy|remove|POST|DELETE|PUT|PATCH)'; then
  HAS_CRUD_IN_DIFF="true"
fi

# Determine complexity
IS_COMPLEX="false"
if [[ $FILE_COUNT -gt 10 ]] || [[ $TOTAL_CHANGES -gt 500 ]]; then
  IS_COMPLEX="true"
  echo "⚠️  Complex PR detected ($FILE_COUNT files, $TOTAL_CHANGES lines)"
fi

# Build focus section if provided
FOCUS_SECTION=""
if [[ -n "$FOCUS" ]]; then
  FOCUS_SECTION="
**SPECIAL FOCUS (prioritize this!):**
$FOCUS
"
  echo "Special focus: $FOCUS"
fi

# Build file context for reviewer recommendations
FILE_CONTEXT="
**Changed Files ($FILE_COUNT files, $TOTAL_CHANGES lines):**
- UI Components (tsx/css): $([ -n "$HAS_UI_FILES" ] && echo "YES" || echo "no")
- API Routes: $([ -n "$HAS_API_FILES" ] && echo "YES" || echo "no")
- Auth/Security: $([ -n "$HAS_AUTH_FILES" ] && echo "YES" || echo "no")
- Mobile/Responsive: $([ -n "$HAS_MOBILE_FILES" ] && echo "YES" || echo "no")
- Design System: $([ -n "$HAS_DESIGN_FILES" ] && echo "YES" || echo "no")
- Copy/Text: $([ -n "$HAS_COPY_FILES" ] && echo "YES" || echo "no")
- Complex PR (>10 files or >500 lines): $IS_COMPLEX

**Journey-Related Changes (triggers user-journey-reviewer):**
- New Routes/Pages: $([ -n "$HAS_NEW_ROUTES" ] && echo "YES" || echo "no")
- Navigation Changes: $([ -n "$HAS_NAVIGATION" ] && echo "YES" || echo "no")
- Empty States: $([ -n "$HAS_EMPTY_STATES" ] && echo "YES" || echo "no")
- CRUD Operations in Diff: $HAS_CRUD_IN_DIFF
"

echo "Running Gemini review..."

REVIEW=$(gemini --model gemini-3-pro-preview -p "
You are a senior code reviewer for ChronicleForge. Review this GitHub PR diff.

**PR Title:** $PR_TITLE

**PR Description:**
$PR_BODY
$FOCUS_SECTION
$FILE_CONTEXT
**Diff:**
\`\`\`diff
$DIFF
\`\`\`

**Review for:**
1. Security vulnerabilities (SQL injection, XSS, auth issues)
2. Error handling (silent failures, missing validation)
3. Type safety issues
4. Architecture concerns
5. Performance issues

**IMPORTANT - Recommend specialized reviewers based on the code changes:**
Available Claude Code subagents:
- \`security-pentest-reviewer\`: For API routes, auth, user input handling, OWASP Top 10
- \`mobile-responsive-reviewer\`: For UI components, touch targets (44px min), responsive layouts
- \`mythical-design-reviewer\`: For design system compliance, colors, typography
- \`brand-voice-writer\`: For user-facing copy, microcopy, labels
- \`ux-designer\`: For user flows on single screens, interaction patterns, accessibility
- \`user-journey-reviewer\`: For complete user journeys, click paths (max 3 clicks), empty state coherence, CRUD extensions. **REQUIRE when: new routes/pages, navigation changes, empty states, CRUD operations, feature extensions**
- \`pr-review-toolkit:code-reviewer\`: For comprehensive code review (REQUIRE for complex PRs)
- \`loose-ends-hunter\`: For refactoring, deletions, new features (finds dead code, orphaned imports)

**Format your response as:**
## Gemini Code Review

**Verdict:** PASS | NEEDS WORK | FAIL

### Critical Issues
- [List or 'None found']

### Warnings
- [List or 'None']

### Suggestions
- [List or 'None']

### 🔍 Recommended Reviewers
Based on the changes, these Claude Code subagents should review:
- [ ] \`agent-name\`: Reason why (e.g., \"UI components added\")
[Include ALL relevant agents. If complex PR or NEEDS WORK/FAIL, ALWAYS include \`pr-review-toolkit:code-reviewer\`]

### 📋 GitHub Tasks
[If Critical Issues found, list as actionable tasks:]
- [ ] Task 1: Description
- [ ] Task 2: Description
[Or 'No tasks needed' if PASS with no critical issues]

### Summary
[1-2 sentence summary]

---
## ⚡ Required Before Merge

### 1. Run Recommended Reviewers
Execute the Claude Code subagents listed above.

### 2. End-to-End Testing (REQUIRED)
\`\`\`bash
# Start production-like server
make prod-local

# Test the changed features manually at http://localhost:3000
# Verify: Happy path works, error states handled, mobile responsive
\`\`\`

### 3. Automated Tests
\`\`\`bash
make test  # All tests must pass
\`\`\`

### 4. Visual Verification (for UI changes)
- [ ] Desktop: Chrome/Safari at 1920x1080
- [ ] Tablet: iPad (1024x768)
- [ ] Mobile: iPhone (390x844)

### 5. Get Approval & Merge
\`\`\`bash
# After approval:
gh pr merge --squash --delete-branch
\`\`\`

---
⚠️ **DO NOT MERGE** without completing E2E testing against \`make prod-local\`!

Be concise. Only flag real issues, not style preferences.
")

echo ""
echo "Posting review as PR comment..."

gh pr comment "$PR_NUMBER" --body "$REVIEW"

echo ""
echo "=========================================="
echo "Review posted to PR #$PR_NUMBER"
echo "=========================================="

# Extract and display recommended reviewers
echo ""
echo "📋 RECOMMENDED REVIEWERS:"
echo "$REVIEW" | grep -E '^\- \[ \] `' | sed 's/- \[ \] /  → /' || echo "  (none detected)"

# Extract verdict
VERDICT=$(echo "$REVIEW" | grep -E '\*\*Verdict:\*\*' | head -1)
echo ""
echo "$VERDICT"

# Check for critical issues and suggest GitHub task creation
CRITICAL_ISSUES=$(echo "$REVIEW" | sed -n '/### Critical Issues/,/### Warnings/p' | grep -E '^- ' | grep -v 'None found' || true)

if [[ -n "$CRITICAL_ISSUES" ]]; then
  echo ""
  echo "🚨 CRITICAL ISSUES FOUND:"
  echo "$CRITICAL_ISSUES" | while read -r issue; do
    echo "  $issue"
  done
  echo ""
  echo "💡 Consider creating GitHub tasks for these issues:"
  echo "   gh issue create --title 'PR #$PR_NUMBER: [Issue Title]' --label 'bug,from-review' --body '[Description]'"
fi

# E2E reminder
echo ""
echo "=========================================="
echo "⚡ NEXT STEPS:"
echo "  1. Run recommended Claude reviewers"
echo "  2. E2E test: make prod-local → http://localhost:3000"
echo "  3. Run: make test"
echo "  4. Get approval, then merge"
echo "=========================================="
