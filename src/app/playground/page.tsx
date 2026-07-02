"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, FlaskConical } from "lucide-react";
import { PythonEditor } from "@/components/playground/python-editor";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SNIPPETS: Record<string, { label: string; code: string }> = {
  hello: {
    label: "Hello ML",
    code: `# Welcome to the SkillRoute Playground!
# This is REAL Python running in your browser (via Pyodide).
print("Hello, future developer! 🚀")

for i in range(1, 4):
    print(f"Day {i}: I'm learning to build things")`,
  },
  numpy: {
    label: "NumPy arrays",
    code: `import numpy as np

data = np.array([12, 15, 9, 20, 7])
print("Mean:", data.mean())
print("Max:", data.max())
print("Normalized:", np.round((data - data.mean()) / data.std(), 2))`,
  },
  regression: {
    label: "Train a model",
    code: `import numpy as np
from sklearn.linear_model import LinearRegression

# house size (sq-ft) -> price (lakhs)
X = np.array([[500],[750],[1000],[1250],[1500]])
y = np.array([25, 38, 50, 61, 74])

model = LinearRegression().fit(X, y)
print("Price per sq-ft:", round(model.coef_[0], 3))
print("1100 sq-ft ->", round(model.predict([[1100]])[0], 1), "lakhs")`,
  },
  pandas: {
    label: "Pandas dataframe",
    code: `import pandas as pd

df = pd.DataFrame({
    "name": ["Ravi", "Mei", "Sara", "John"],
    "hours": [2, 5, 3, 8],
    "passed": [0, 1, 0, 1],
})
print(df)
print("\\nAvg study hours of those who passed:",
      df[df.passed == 1]["hours"].mean())`,
  },
};

export default function PlaygroundPage() {
  const [active, setActive] = React.useState<keyof typeof SNIPPETS>("hello");

  return (
    <div className="container py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Badge className="mb-3"><FlaskConical className="h-3.5 w-3.5" /> Live Python · no install</Badge>
        <h1 className="text-3xl font-black md:text-4xl">Coding Playground</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Write and run real Python right in your browser — NumPy, Pandas and scikit-learn included.
          Pick a starter below or write your own experiment.
        </p>
      </motion.div>

      <div className="mt-6 flex flex-wrap gap-2">
        {Object.entries(SNIPPETS).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setActive(key as keyof typeof SNIPPETS)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {/* key forces remount so the editor resets to the chosen snippet */}
        <PythonEditor key={active} initialCode={SNIPPETS[active].code} height={340} />
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          First run downloads the Python runtime (~a few seconds) — after that it&apos;s instant.
          Stuck on an error? The console explains it in plain English, or ask your AI Mentor
          bottom-right.
        </p>
      </div>
    </div>
  );
}
