const fs = require("fs");
const process = require("process");
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
app.use(express.static(__dirname + "\\public"));

console.log("VERSÃO NODE: ", process.version);
console.log("__dirname  : ", __dirname);

app.get("/", function (req, res) {
  res.status(200).send("Node - Express - Respondendo...OK");
});

app.get("/cap", async (req, res) => {
  xr = await CapturaTelaSite();
  res.status(200).sendFile(__dirname + "/public/mostracap.html");
});

app.listen(3000);
console.log("http://localhost:3000");

async function CapturaTelaSite() {
  var urlParaCapturar = "https://kaldiris.com.br";
  var esconderBrowse = "new";
  var tamanhoSiteTodo = true;
  var screenshot;
  var nomeCompletoImagem = __dirname + "\\public\\teste.png";

  if (fs.existsSync(nomeCompletoImagem)) {
    fs.unlinkSync(nomeCompletoImagem);
  }
  // // Cria o Objeto Browser
  // browser = await puppeteer.launch({
  //   headless: esconderBrowse,
  //   timeout: 60000,
  //   args: [`--window-size=1920,1080`],
  // });

  // // Cria uma nova página
  // page = await browser.newPage();
  // await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  // Abre a página da URL Informada
  console.log("Navengando para URL:", urlParaCapturar);
  await page.goto(urlParaCapturar);
  await page.waitForNetworkIdle();

  // Captura a URL
  console.log("Gerando Imagem da URL...");
  screenshot = await page.screenshot({
    fullPage: tamanhoSiteTodo,
    encoding: "binary", // Salvar como imagem binária
  });

  // Salva a captura em um arquivo de imagem
  await fs.writeFileSync(nomeCompletoImagem, screenshot);
  console.log("Imagem Gerada: ", nomeCompletoImagem);
  return nomeCompletoImagem;
}
