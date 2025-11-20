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
  //GET
// Якщо нема у кеші — качаємо з http.cat
try {
  const img = await fs.readFile(`${cache}/${code}.jpg`);
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  res.end(img);
  return;
} catch {}

// Завантажуємо з http.cat
try {
  const response = await request.get(`https://http.cat/${code}`);

  // зберегти у кеш
  await fs.writeFile(`${cache}/${code}.jpg`, response.body);

  res.writeHead(200, { "Content-Type": "image/jpeg" });
  res.end(response.body);
} catch {
  res.writeHead(404);
  res.end("Not found on http.cat");
}

//PUT
if (req.method === "PUT") {
  const code = req.url.slice(1);
  const chunks = [];

  req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    await fs.writeFile(`${cache}/${code}.jpg`, Buffer.concat(chunks));
    res.writeHead(201);
    res.end("Created");
  });

  return;
}
//DELETE
if (req.method === "DELETE") {
  const code = req.url.slice(1);
  try {
    await fs.unlink(`${cache}/${code}.jpg`);
    res.writeHead(200);
    res.end("Deleted");
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
  return;
}
  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
})();

