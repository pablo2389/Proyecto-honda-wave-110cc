const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Cambia a true en deploy
  const page = await browser.newPage();

  console.log("Cargando la página...");
  await page.goto('https://proyecto-honda-wave-110cc-cdf2.vercel.app/', {
    waitUntil: 'networkidle2',
    timeout: 0,
  });

  console.log("Esperando las imágenes...");

  // Espera hasta que el contenedor de imágenes esté presente
  await page.waitForSelector('[data-testid="image-container"]', { timeout: 20000 });

  // Extrae todas las URLs de las imágenes dentro de ese contenedor
  const imageUrls = await page.$$eval(
    '[data-testid="image-container"] img',
    imgs => imgs.map(img => img.src)
  );

  console.log('✅ Imágenes encontradas:');
  imageUrls.forEach(url => console.log(url));

  await browser.close();
})();
