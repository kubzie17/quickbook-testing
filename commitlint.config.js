// ── COMMITLINT CONFIGURATION ────────────────────────────────
// Enforces conventional commit messages across the team.
// Format: type(scope): description
//
// Why this matters in fintech/insurtech:
// - Automated changelog generation
// - Semantic versioning (feat = minor, fix = patch)
// - Clean, searchable git history
// - CI/CD pipelines can trigger different actions based on commit type

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Commit type must be one of these
    "type-enum": [
      2, // 2 = error (blocks commit), 1 = warning, 0 = disabled
      "always",
      [
        "feat",     // New feature
        "fix",      // Bug fix
        "docs",     // Documentation only
        "style",    // Formatting, no code change
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf",     // Performance improvement
        "test",     // Adding or updating tests
        "build",    // Build system or external dependencies
        "ci",       // CI/CD configuration
        "chore",    // Maintenance tasks
        "revert",   // Reverting a previous commit
      ],
    ],
    // Subject (description) rules
    "subject-case": [2, "never", ["upper-case"]],  // No ALL CAPS subjects
    "subject-empty": [2, "never"],                   // Subject is required
    "subject-max-length": [2, "always", 100],        // Keep it concise
    // Type rules
    "type-case": [2, "always", "lower-case"],        // Type must be lowercase
    "type-empty": [2, "never"],                       // Type is required
  },
};
