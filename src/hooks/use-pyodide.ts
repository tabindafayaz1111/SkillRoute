"use client";

import * as React from "react";

/**
 * Loads Pyodide (CPython compiled to WASM) from the official CDN and exposes a
 * `run` function that captures stdout/stderr. Loaded lazily on first use so it
 * never blocks initial page load. No server, no install — real Python in the tab.
 */
const PYODIDE_VERSION = "0.26.2";
const CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  loadPackagesFromImports: (code: string) => Promise<void>;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

export type PyStatus = "idle" | "loading" | "ready" | "error";

let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Pyodide"));
    document.head.appendChild(s);
  });
}

async function initPyodide() {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    await loadScript(`${CDN}pyodide.js`);
    if (!window.loadPyodide) throw new Error("Pyodide global missing");
    return window.loadPyodide({ indexURL: CDN });
  })();
  return pyodidePromise;
}

export function usePyodide() {
  const [status, setStatus] = React.useState<PyStatus>("idle");
  const pyRef = React.useRef<PyodideInterface | null>(null);

  const ensure = React.useCallback(async () => {
    if (pyRef.current) return pyRef.current;
    setStatus("loading");
    try {
      const py = await initPyodide();
      pyRef.current = py;
      setStatus("ready");
      return py;
    } catch (e) {
      setStatus("error");
      throw e;
    }
  }, []);

  const run = React.useCallback(
    async (code: string): Promise<{ output: string; ok: boolean }> => {
      let buffer = "";
      try {
        const py = await ensure();
        py.setStdout({ batched: (s) => (buffer += s + "\n") });
        py.setStderr({ batched: (s) => (buffer += s + "\n") });
        // Auto-install imports like numpy/pandas on demand.
        await py.loadPackagesFromImports(code);
        await py.runPythonAsync(code);
        return { output: buffer.trim() || "✓ Ran successfully (no output)", ok: true };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { output: (buffer + "\n" + msg).trim(), ok: false };
      }
    },
    [ensure]
  );

  return { status, run, ensure };
}
