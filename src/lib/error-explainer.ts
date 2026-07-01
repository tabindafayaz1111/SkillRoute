/**
 * Turns cryptic Python tracebacks into friendly, beginner-facing hints.
 * This is the "error explanation" feature — a real teacher explains the *why*.
 */
const RULES: { match: RegExp; explain: (m: RegExpMatchArray) => string }[] = [
  {
    match: /NameError: name '(\w+)' is not defined/,
    explain: (m) =>
      `Python doesn't know what "${m[1]}" is. You either misspelled it, or you're using it before creating it. Define ${m[1]} = ... first.`,
  },
  {
    match: /IndentationError/,
    explain: () =>
      "Python cares about spacing. Lines inside a loop, function, or if-block must be indented (usually 4 spaces). Check that your indentation is consistent.",
  },
  {
    match: /SyntaxError/,
    explain: () =>
      "There's a typo in the structure — often a missing colon (:), bracket, or quote. Look at the line just before where Python complains.",
  },
  {
    match: /ModuleNotFoundError: No module named '(\w+)'/,
    explain: (m) =>
      `The library "${m[1]}" isn't available here yet. Common ones like numpy, pandas, and scikit-learn load automatically when you import them — check the spelling.`,
  },
  {
    match: /TypeError/,
    explain: () =>
      "You mixed incompatible types — like adding a number to text. Make sure both sides of the operation are the same kind of thing (use int(), str(), or float() to convert).",
  },
  {
    match: /ZeroDivisionError/,
    explain: () =>
      "You divided by zero. Add a check so the denominator is never 0 before dividing.",
  },
  {
    match: /IndexError/,
    explain: () =>
      "You asked for an item past the end of a list. Remember lists start at index 0, so the last item is at len(list) - 1.",
  },
  {
    match: /KeyError: '?(\w+)'?/,
    explain: (m) =>
      `The key "${m[1]}" isn't in your dictionary. Check the spelling, or use .get("${m[1]}") to avoid the crash.`,
  },
];

export function explainPyError(traceback: string): string {
  for (const rule of RULES) {
    const m = traceback.match(rule.match);
    if (m) return rule.explain(m);
  }
  return "Read the last line of the error first — it usually names the problem. Then check the line number it points to. Ask your AI Mentor if you're stuck!";
}
