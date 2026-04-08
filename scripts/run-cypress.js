const { spawn } = require("node:child_process");
const path = require("node:path");

const { validateTestEnvironment } = require("./validate-env");

const cypressBin = path.join(__dirname, "..", "node_modules", "cypress", "bin", "cypress");
const args = process.argv.slice(2);
const env = { ...process.env };

delete env.ELECTRON_RUN_AS_NODE;

if (args[0] === "run") {
  validateTestEnvironment();
}

const child = spawn(process.execPath, [cypressBin, ...args], {
  env,
  stdio: "inherit",
  windowsHide: false,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
