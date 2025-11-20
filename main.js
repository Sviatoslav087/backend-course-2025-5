const http = require("http");
const fs = require("fs/promises");
const { Command } = require("commander");

const program = new Command();

program
  .requiredOption("-h, --host <host>", "server host")
  .requiredOption("-p, --port <port>", "server port")
  .requiredOption("-c, --cache <path>", "cache directory");

program.parse(process.argv);

const { host, port, cache } = program.opts();

(async () => {
  try {
    await fs.mkdir(cache, { recursive: true });
  } catch {}

  const server = http.createServer((req, res) => {
    res.end("Server is working");
  });

  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
})();

