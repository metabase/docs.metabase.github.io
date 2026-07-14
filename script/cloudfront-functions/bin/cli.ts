// Shared plumbing for the redirect-build CLI wrappers: a top-level runner that turns a
// thrown action error into a clean one-line message + non-zero exit instead of an uncaught
// stack trace.

import type { Command } from "commander";

export function runCli(program: Command): void {
  program.parseAsync(process.argv).catch((err) => {
    process.stderr.write(`${err instanceof Error ? err.message : err}\n`);
    process.exit(1);
  });
}
