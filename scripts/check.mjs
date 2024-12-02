import { execSync } from "child_process";

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

const logMessage = (color, message) => {
  process.stdout.write(
    `${colors.bright}${colors[color]}${message}${colors.reset}\n`,
  );
};

const execCommand = (command, title) => {
  logMessage("blue", `\nRunning ${title}...\n`);

  try {
    execSync(command, { stdio: "inherit" });
    logMessage("green", `\n✓ ${title} passed\n`);
    return true;
  } catch {
    logMessage("red", `\n✗ ${title} failed\n`);
    return false;
  }
};

const runChecks = async () => {
  logMessage("magenta", "Starting comprehensive check...\n");

  const checks = [
    { title: "TypeScript compilation", command: "pnpm tsc --noEmit" },
    { title: "ESLint check", command: "pnpm eslint . --ext .ts,.tsx,.js,.jsx" },
    { title: "Prettier check", command: "pnpm prettier --check ." },
    { title: "Next.js build", command: "pnpm next build" },
  ];

  let failedChecks = 0;

  for (const { title, command } of checks) {
    const passed = execCommand(command, title);
    if (!passed) failedChecks++;
  }

  if (failedChecks > 0) {
    logMessage("red", `\n❌ ${failedChecks} check(s) failed\n`);
    process.exit(1);
  } else {
    logMessage("green", "\n✅ All checks passed successfully!\n");
    process.exit(0);
  }
};

runChecks().catch((error) => {
  logMessage("red", "\nError running checks:");
  if (error instanceof Error) {
    logMessage("red", error.message);
  }
  process.exit(1);
});

export {};
