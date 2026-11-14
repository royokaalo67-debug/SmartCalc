import fs from "node:fs";
import path from "node:path";

const pages = [
  {
    route: "profit-calculator",
    title: "Profit Calculator | SmartCalc",
    description: "Work out profit, revenue and profit margin with SmartCalc's free online profit calculator."
  },
  {
    route: "markup-calculator",
    title: "Markup Calculator | SmartCalc",
    description: "Set a selling price from your cost and markup using SmartCalc's free markup calculator."
  },
  {
    route: "discount-calculator",
    title: "Discount Calculator | SmartCalc",
    description: "Find your savings and final price after a discount with SmartCalc's free discount calculator."
  },
  {
    route: "break-even-calculator",
    title: "Break-even Calculator | SmartCalc",
    description: "Find how many units you need to sell to cover costs using SmartCalc's break-even calculator."
  },
  {
    route: "vat-calculator",
    title: "VAT Calculator | SmartCalc",
    description: "Add VAT to a price or extract VAT from a total using SmartCalc's free VAT calculator."
  },
  {
    route: "stock-profit-calculator",
    title: "Stock Profit Calculator | SmartCalc",
    description: "Calculate stock investment, sales revenue and profit with SmartCalc's stock profit calculator."
  },
  {
    route: "sales-target-calculator",
    title: "Sales Target Calculator | SmartCalc",
    description: "Calculate the sales and units needed to reach your business target with SmartCalc."
  }
];

const outputDir = path.resolve("dist");
const templatePath = path.join(outputDir, "index.html");

if (!fs.existsSync(templatePath)) {
  throw new Error("dist/index.html not found. Run the Vite build first.");
}

const template = fs.readFileSync(templatePath, "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

for (const page of pages) {
  let html = template;

  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = `https://smartcalc-55t.pages.dev/${page.route}`;

  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${title}</title>`
  );

  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${description}" />`
  );

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${title}" />`
  );

  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${description}" />`
  );

  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`
  );

  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${title}" />`
  );

  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${description}" />`
  );

  const pageDir = path.join(outputDir, page.route);
  fs.mkdirSync(pageDir, { recursive: true });

  fs.writeFileSync(
    path.join(pageDir, "index.html"),
    html,
    "utf8"
  );

  console.log(`Generated: /${page.route}/`);
}

console.log("SEO page generation completed.");
