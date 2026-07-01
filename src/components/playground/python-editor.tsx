"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
  Play,
  RotateCcw,
  Lightbulb,
  Eye,
  Loader2,
  TerminalSquare,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePyodide } from "@/hooks/use-pyodide";
import { explainPyError } from "@/lib/error-explainer";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-[#1e1e1e] text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  ),
});

interface PythonEditorProps {
  initialCode: string;
  solution?: string;
  hint?: string;
  height?: number;
}

export function PythonEditor({ initialCode, solution, hint, height = 280 }: PythonEditorProps) {
  const { resolvedTheme } = useTheme();
  const { status, run } = usePyodide();
  const [code, setCode] = React.useState(initialCode);
  const [output, setOutput] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(true);
  const [running, setRunning] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);

  async function handleRun() {
    setRunning(true);
    setOutput(null);
    const res = await run(code);
    setOutput(res.output);
    setOk(res.ok);
    setRunning(false);
  }

  const errorHelp = !ok && output ? explainPyError(output) : null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-3 py-2">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <TerminalSquare className="h-3.5 w-3.5" /> Python
        </span>
        <Button size="sm" variant="gradient" onClick={handleRun} disabled={running}>
          {running || status === "loading" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
          {status === "loading" ? "Loading Python…" : "Run"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setCode(initialCode); setOutput(null); }}>
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
        {hint && (
          <Button size="sm" variant="ghost" onClick={() => setShowHint((s) => !s)}>
            <Lightbulb className="h-3.5 w-3.5" /> Hint
          </Button>
        )}
        {solution && (
          <Button size="sm" variant="ghost" onClick={() => setCode(solution)}>
            <Eye className="h-3.5 w-3.5" /> Solution
          </Button>
        )}
      </div>

      {showHint && hint && (
        <div className="border-b border-border bg-warning/10 px-4 py-2.5 text-sm text-foreground">
          💡 {hint}
        </div>
      )}

      <MonacoEditor
        height={height}
        language="python"
        theme={resolvedTheme === "light" ? "vs" : "vs-dark"}
        value={code}
        onChange={(v) => setCode(v ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-mono), monospace",
          scrollBeyondLastLine: false,
          padding: { top: 12 },
          lineNumbersMinChars: 3,
          tabSize: 4,
          automaticLayout: true,
        }}
      />

      {/* Output console */}
      <div className="border-t border-border">
        <div className="flex items-center gap-2 bg-secondary/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {ok ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <XCircle className="h-3.5 w-3.5 text-danger" />}
          Output
        </div>
        <pre
          className={cn(
            "max-h-52 overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-sm",
            output === null && "text-muted-foreground",
            !ok && "text-danger"
          )}
        >
          {output ?? "Press Run to execute your code ▶"}
        </pre>
        {errorHelp && (
          <div className="border-t border-border bg-danger/5 px-4 py-3 text-sm">
            <p className="font-semibold text-danger">🤔 What went wrong</p>
            <p className="mt-1 text-foreground">{errorHelp}</p>
          </div>
        )}
      </div>
    </div>
  );
}
