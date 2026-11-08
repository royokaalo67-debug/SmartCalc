import React, { useMemo, useState } from "react";

const calculators = [
  { id: "profit", name: "Profit calculator", short: "Work out profit, revenue and profit margin.", icon: "↗", category: "Business" },
  { id: "markup", name: "Markup calculator", short: "Set a selling price from your cost and markup.", icon: "%", category: "Business" },
  { id: "discount", name: "Discount calculator", short: "Find the savings and final price after a discount.", icon: "↓", category: "Shopping" },
  { id: "break-even", name: "Break-even calculator", short: "Find how many units you need to sell to cover costs.", icon: "⚖", category: "Business" },
  { id: "vat", name: "VAT calculator", short: "Add VAT to a price or extract VAT from a total.", icon: "▤", category: "Tax" },
];

const money = (value, currency) => new Intl.NumberFormat(undefined, {
  style: "currency", currency, maximumFractionDigits: 2
}).format(Number.isFinite(value) ? value : 0);

function NumberField({ label, value, onChange, min = "0", step = "any", hint }) {
  return <label className="field">
    <span>{label}</span>
    <input type="number" min={min} step={step} value={value} onChange={e => onChange(e.target.value)} />
    {hint && <small>{hint}</small>}
  </label>;
}

function Result({ label, value, note }) {
  return <div className="result-row">
    <span>{label}</span>
    <strong>{value}</strong>
    {note && <small>{note}</small>}
  </div>;
}

function Calculator({ id, currency }) {
  const [values, setValues] = useState({});
  const set = (key) => (value) => setValues(old => ({ ...old, [key]: value }));
  const n = (key, fallback = 0) => {
    const value = Number(values[key] ?? fallback);
    return Number.isFinite(value) ? value : 0;
  };
  const [vatMode, setVatMode] = useState("add");

  if (id === "profit") {
    const revenue = n("revenue", 1000), cost = n("cost", 650);
    const profit = revenue - cost;
    const margin = revenue > 0 ? profit / revenue * 100 : 0;
    return <CalculatorShell title="Profit calculator" intro="Calculate your gross profit and profit margin.">
      <NumberField label="Total sales / revenue" value={values.revenue ?? "1000"} onChange={set("revenue")} />
      <NumberField label="Total costs" value={values.cost ?? "650"} onChange={set("cost")} />
      <div className="results">
        <Result label="Profit" value={money(profit, currency)} />
        <Result label="Profit margin" value={`${margin.toFixed(2)}%`} />
        <Result label="Cost as a percentage of revenue" value={`${(revenue > 0 ? cost / revenue * 100 : 0).toFixed(2)}%`} />
      </div>
      {profit < 0 && <p className="notice warning">Your costs are higher than your revenue. This calculation shows a loss.</p>}
    </CalculatorShell>;
  }

  if (id === "markup") {
    const cost = n("cost", 500), markup = n("markup", 30);
    const selling = cost * (1 + markup / 100);
    return <CalculatorShell title="Markup calculator" intro="Calculate a selling price using a markup percentage.">
      <NumberField label="Product cost" value={values.cost ?? "500"} onChange={set("cost")} />
      <NumberField label="Markup percentage (%)" value={values.markup ?? "30"} onChange={set("markup")} />
      <div className="results">
        <Result label="Markup amount" value={money(cost * markup / 100, currency)} />
        <Result label="Suggested selling price" value={money(selling, currency)} />
        <Result label="Gross profit margin" value={`${(selling > 0 ? (selling - cost) / selling * 100 : 0).toFixed(2)}%`} />
      </div>
    </CalculatorShell>;
  }

  if (id === "discount") {
    const price = n("price", 2000), discount = n("discount", 15);
    const safeDiscount = Math.min(100, Math.max(0, discount));
    const savings = price * safeDiscount / 100;
    return <CalculatorShell title="Discount calculator" intro="Find the amount saved and the final price after a discount.">
      <NumberField label="Original price" value={values.price ?? "2000"} onChange={set("price")} />
      <NumberField label="Discount (%)" value={values.discount ?? "15"} onChange={set("discount")} hint="Discount is limited to a range of 0% to 100%." />
      <div className="results">
        <Result label="You save" value={money(savings, currency)} />
        <Result label="Final price" value={money(price - savings, currency)} />
      </div>
    </CalculatorShell>;
  }

  if (id === "break-even") {
    const fixed = n("fixed", 50000), price = n("price", 500), variable = n("variable", 250);
    const contribution = price - variable;
    const units = contribution > 0 ? Math.ceil(fixed / contribution) : null;
    return <CalculatorShell title="Break-even calculator" intro="Estimate the sales volume needed to cover your costs.">
      <NumberField label="Fixed costs" value={values.fixed ?? "50000"} onChange={set("fixed")} hint="Costs that do not change with the number of units sold." />
      <NumberField label="Selling price per unit" value={values.price ?? "500"} onChange={set("price")} />
      <NumberField label="Variable cost per unit" value={values.variable ?? "250"} onChange={set("variable")} hint="Cost incurred for each unit produced or sold." />
      <div className="results">
        <Result label="Contribution per unit" value={money(contribution, currency)} />
        <Result label="Break-even sales volume" value={units === null ? "Not achievable" : `${units.toLocaleString()} units`} />
        <Result label="Break-even revenue" value={units === null ? "—" : money(units * price, currency)} />
      </div>
      {contribution <= 0 && <p className="notice warning">Your selling price must be greater than variable cost to reach break-even.</p>}
    </CalculatorShell>;
  }

  const amount = n("amount", 1000), rate = Math.max(0, n("rate", 16));
  const vat = vatMode === "add" ? amount * rate / 100 : amount - amount / (1 + rate / 100);
  const total = vatMode === "add" ? amount + vat : amount;
  const net = vatMode === "add" ? amount : amount - vat;
  return <CalculatorShell title="VAT calculator" intro="Add VAT to a net price or extract VAT from a VAT-inclusive total.">
    <div className="mode-switch" role="group" aria-label="VAT calculation mode">
      <button className={vatMode === "add" ? "selected" : ""} onClick={() => setVatMode("add")}>Add VAT</button>
      <button className={vatMode === "remove" ? "selected" : ""} onClick={() => setVatMode("remove")}>Extract VAT</button>
    </div>
    <NumberField label={vatMode === "add" ? "Price before VAT" : "Price including VAT"} value={values.amount ?? "1000"} onChange={set("amount")} />
    <NumberField label="VAT rate (%)" value={values.rate ?? "16"} onChange={set("rate")} hint="Enter the applicable rate for your country or transaction." />
    <div className="results">
      <Result label="Net amount" value={money(net, currency)} />
      <Result label="VAT amount" value={money(vat, currency)} />
      <Result label="Total including VAT" value={money(total, currency)} />
    </div>
    <p className="notice">Tax rates and exemptions vary by jurisdiction. Confirm the applicable rate before using this result for tax filings.</p>
  </CalculatorShell>;
}

function CalculatorShell({ title, intro, children }) {
  return <section className="calculator-panel">
    <div className="panel-heading"><div><p className="eyebrow">SMARTCALC TOOL</p><h2>{title}</h2><p>{intro}</p></div><span className="panel-symbol">＝</span></div>
    <div className="fields">{children}</div>
  </section>;
}

export default function App() {
  const [active, setActive] = useState("profit");
  const [currency, setCurrency] = useState("KES");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => calculators.filter(c =>
    `${c.name} ${c.short} ${c.category}`.toLowerCase().includes(search.toLowerCase())
  ), [search]);
  const selected = calculators.find(c => c.id === active) ?? calculators[0];

  return <div className="app">
    <header className="topbar">
      <a className="brand" href="#" onClick={() => setActive("profit")} aria-label="SmartCalc home">
        <span className="brand-mark">S</span><span>Smart<span className="brand-accent">Calc</span></span>
      </a>
      <nav><a href="#calculators">Calculators</a><a href="#about">About</a></nav>
      <label className="currency-picker"><span>Currency</span>
        <select value={currency} onChange={e => setCurrency(e.target.value)} aria-label="Display currency">
          <option value="KES">KES — Kenyan shilling</option><option value="USD">USD — US dollar</option>
          <option value="GBP">GBP — British pound</option><option value="EUR">EUR — Euro</option>
          <option value="NGN">NGN — Nigerian naira</option><option value="ZAR">ZAR — South African rand</option>
        </select>
      </label>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-tag"><span className="live-dot"></span> FREE ONLINE TOOLS</span>
          <h1>Make smarter decisions<br/><em>with every calculation.</em></h1>
          <p>Simple, reliable calculators for your business, shopping and everyday numbers. Free to use, wherever you are.</p>
          <a className="primary-link" href="#calculators">Explore calculators <span>→</span></a>
          <div className="trust-line"><span>✓ No sign-up required</span><span>✓ Fast & easy</span><span>✓ Mobile friendly</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
          <div className="floating-card card-a"><small>PROFIT MARGIN</small><strong>28.5%</strong><span>↗ Healthy growth</span></div>
          <div className="floating-card card-b"><small>QUICK RESULT</small><strong>+ KSh 4,250</strong><span>Estimated profit</span></div>
          <div className="calculator-illustration"><div className="calc-top"><i></i><i></i><i></i></div><div className="calc-screen">1,250.00</div><div className="calc-keys"><b>+</b><b>−</b><b>×</b><b>÷</b><b>7</b><b>8</b><b>9</b><b>=</b></div></div>
        </div>
      </section>

      <section className="workspace" id="calculators">
        <div className="section-heading"><div><p className="eyebrow">THE TOOLKIT</p><h2>What would you like to calculate?</h2><p>Choose a tool and get your answer instantly.</p></div>
          <div className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a calculator..." aria-label="Find a calculator"/></div>
        </div>
        <div className="tool-layout">
          <aside className="tool-list" aria-label="Calculator list">
            {filtered.map(tool => <button key={tool.id} className={`tool-item ${active === tool.id ? "active" : ""}`} onClick={() => setActive(tool.id)}>
              <span className="tool-icon">{tool.icon}</span><span className="tool-text"><strong>{tool.name}</strong><small>{tool.short}</small></span><span className="tool-arrow">→</span>
            </button>)}
            {filtered.length === 0 && <p className="empty-state">No calculators match that search.</p>}
          </aside>
          <div className="tool-main">
            <div className="active-tool-label"><span>{selected.category}</span><span>Instant calculation</span></div>
            <Calculator key={active} id={active} currency={currency}/>
          </div>
        </div>
      </section>

      <section className="benefits" id="about">
        <div><span className="benefit-icon">◎</span><h3>Simple by design</h3><p>Clear inputs and straightforward results, without unnecessary steps.</p></div>
        <div><span className="benefit-icon">⌁</span><h3>Made for everyone</h3><p>Useful for students, shoppers, freelancers and growing businesses.</p></div>
        <div><span className="benefit-icon">◷</span><h3>Results in seconds</h3><p>Calculations happen in your browser. Your entries are not sent to a server.</p></div>
      </section>
      <section className="disclaimer"><strong>Calculation note:</strong> SmartCalc provides general estimates for informational purposes. Check important financial and tax calculations independently before making decisions.</section>
    </main>

    <footer><a className="brand footer-brand" href="#"><span className="brand-mark">S</span><span>Smart<span className="brand-accent">Calc</span></span></a>
      <p>Free tools for clearer everyday decisions.</p>
      <div className="footer-links"><a href="#about">About</a><a href="mailto:hello@smartcalc.example">Contact</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div>
      <small>© {new Date().getFullYear()} SmartCalc. All rights reserved. Replace placeholder contact and policy links before launch.</small>
    </footer>
  </div>;
}