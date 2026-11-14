import Contact from "./Contact.jsx";
import InvoiceGenerator from "./InvoiceGenerator.jsx";
import ExpenseTracker from "./ExpenseTracker.jsx";
import About from "./About.jsx";
import Privacy from "./Privacy.jsx";
import Terms from "./Terms.jsx";
import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CalculatorPage from "./CalculatorPage.jsx";

export const calculators = [
  { id: "profit", name: "Profit calculator", short: "Work out profit, revenue and profit margin.", icon: "↗", category: "Business" },
  { id: "markup", name: "Markup calculator", short: "Set a selling price from your cost and markup.", icon: "%", category: "Business" },
  { id: "discount", name: "Discount calculator", short: "Find the savings and final price after a discount.", icon: "↓", category: "Shopping" },
  { id: "break-even", name: "Break-even calculator", short: "Find how many units you need to sell to cover costs.", icon: "⚖", category: "Business" },
  { id: "vat", name: "VAT calculator", short: "Add VAT to a price or extract VAT from a total.", icon: "▤", category: "Tax" },
  { id: "stock-profit", name: "Stock profit calculator", short: "Calculate stock investment, sales revenue and profit.", icon: "📦", category: "Business" },
  { id: "sales-target", name: "Sales target calculator", short: "Calculate the sales and units needed to reach your business target.", icon: "🎯", category: "Business" },
];

const pageRoutes = {
  "/profit-calculator": "profit",
  "/markup-calculator": "markup",
  "/discount-calculator": "discount",
  "/break-even-calculator": "break-even",
  "/vat-calculator": "vat",
  "/stock-profit-calculator": "stock-profit",
  "/sales-target-calculator": "sales-target",
};

const pageUrl = {
  profit: "/profit-calculator",
  markup: "/markup-calculator",
  discount: "/discount-calculator",
  "break-even": "/break-even-calculator",
  vat: "/vat-calculator",
  "stock-profit": "/stock-profit-calculator",
  "sales-target": "/sales-target-calculator",
};

const money = (value, currency) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

function NumberField({ label, value, onChange, min = "0", step = "any", hint }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function Result({ label, value, note }) {
  return (
    <div className="result-row">
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}

export function Calculator({ id, currency }) {
  const [values, setValues] = useState({});
  const set = (key) => (value) =>
    setValues((old) => ({ ...old, [key]: value }));

  const n = (key, fallback = 0) => {
    const value = Number(values[key] ?? fallback);
    return Number.isFinite(value) ? value : 0;
  };

  const [vatMode, setVatMode] = useState("add");

  
if (id === "profit") {
  const revenue = n("revenue", 1000);
  const cost = n("cost", 650);
  const profit = revenue - cost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return (
    <>
      <CalculatorShell
        title="Profit calculator"
        intro="Calculate your business profit and profit margin using your sales revenue and total costs."
      >
        <NumberField
          label="Total sales / revenue"
          value={values.revenue ?? "1000"}
          onChange={set("revenue")}
        />
        <NumberField
          label="Total costs"
          value={values.cost ?? "650"}
          onChange={set("cost")}
        />
        <div className="results">
          <Result label="Profit" value={money(profit, currency)} />
          <Result label="Profit margin" value={`${margin.toFixed(2)}%`} />
          <Result
            label="Cost as a percentage of revenue"
            value={`${(revenue > 0 ? (cost / revenue) * 100 : 0).toFixed(2)}%`}
          />
        </div>
        {profit < 0 && (
          <p className="notice warning">
            Your costs are higher than your revenue. This calculation shows a loss.
          </p>
        )}
      </CalculatorShell>

      <section className="calculator-guide">
        <h2>How to calculate profit</h2>
        <p>
          Profit is the amount of money remaining after subtracting
          business costs from total sales revenue. Understanding
          your profit helps you evaluate business performance and
          make better financial decisions.
        </p>

        <h2>Profit calculation formula</h2>
        <p>
          To calculate profit, subtract your total costs from
          your total revenue.
        </p>
        <p><strong>Profit = Total Revenue − Total Costs</strong></p>

        <h2>How to calculate profit margin</h2>
        <p>
          Profit margin measures the percentage of revenue that
          remains as profit after costs.
        </p>
        <p>
          <strong>
            Profit Margin = (Profit ÷ Total Revenue) × 100
          </strong>
        </p>

        <h2>Practical profit calculation example</h2>
        <p>
          Imagine your business generates KES 100,000 in sales
          and spends KES 65,000 on costs.
        </p>
        <ul>
          <li>Total revenue: KES 100,000</li>
          <li>Total costs: KES 65,000</li>
          <li>Profit: KES 35,000</li>
          <li>Profit margin: 35%</li>
        </ul>

        <h2>How to use this profit calculator</h2>
        <ol>
          <li>Enter your total sales revenue.</li>
          <li>Enter your total business costs.</li>
          <li>Select your preferred display currency.</li>
          <li>View your profit and profit margin instantly.</li>
        </ol>

        <h2>Frequently asked questions</h2>

        <h3>What is profit?</h3>
        <p>
          Profit is the amount remaining when business costs
          are subtracted from revenue.
        </p>

        <h3>What is a good profit margin?</h3>
        <p>
          A good profit margin depends on your industry,
          operating costs, competition, and business model.
          Compare your margin with similar businesses.
        </p>

        <h3>What happens if costs are higher than revenue?</h3>
        <p>
          Your business has made a loss. The calculator displays
          a negative profit when costs exceed revenue.
        </p>

        <h3>Can I use this calculator for a small business?</h3>
        <p>
          Yes. It can help small businesses, freelancers,
          entrepreneurs, and shop owners estimate their profit
          and profit margin.
        </p>
      </section>
    </>
  );
}


  
if (id === "markup") {
  const cost = n("cost", 500);
  const markup = n("markup", 30);
  const selling = cost * (1 + markup / 100);

  return (
    <>
      <CalculatorShell
        title="Markup calculator"
        intro="Calculate your product selling price using a markup percentage. Find your markup amount and gross profit margin instantly."
      >
        <NumberField
          label="Product cost"
          value={values.cost ?? "500"}
          onChange={set("cost")}
        />
        <NumberField
          label="Markup percentage (%)"
          value={values.markup ?? "30"}
          onChange={set("markup")}
        />
        <div className="results">
          <Result
            label="Markup amount"
            value={money((cost * markup) / 100, currency)}
          />
          <Result
            label="Suggested selling price"
            value={money(selling, currency)}
          />
          <Result
            label="Gross profit margin"
            value={`${(selling > 0 ? ((selling - cost) / selling) * 100 : 0).toFixed(2)}%`}
          />
        </div>
      </CalculatorShell>

      <section className="calculator-guide">
        <h2>What is markup?</h2>
        <p>
          Markup is the amount added to the cost of a product or
          service to determine its selling price. Businesses use
          markup to cover costs and generate profit from sales.
        </p>

        <h2>Markup calculation formula</h2>
        <p>
          To calculate markup, multiply the product cost by the
          markup percentage and add the result to the original cost.
        </p>
        <p>
          <strong>Markup Amount = Product Cost × (Markup Percentage ÷ 100)</strong>
        </p>
        <p>
          <strong>Selling Price = Product Cost + Markup Amount</strong>
        </p>

        <h2>Practical markup calculation example</h2>
        <p>
          Imagine you purchase a product for KES 500 and want
          to apply a 30% markup.
        </p>
        <ul>
          <li>Product cost: KES 500</li>
          <li>Markup percentage: 30%</li>
          <li>Markup amount: KES 150</li>
          <li>Selling price: KES 650</li>
          <li>Gross profit margin: 23.08%</li>
        </ul>

        <h2>How to use this markup calculator</h2>
        <ol>
          <li>Enter the cost of your product or service.</li>
          <li>Enter the markup percentage you want to apply.</li>
          <li>Select your preferred display currency.</li>
          <li>View the markup amount and suggested selling price.</li>
        </ol>

        <h2>Frequently asked questions</h2>

        <h3>What is a good markup percentage?</h3>
        <p>
          A suitable markup depends on your industry, operating
          expenses, competition, and business goals. Compare your
          pricing with similar products and services.
        </p>

        <h3>Is markup the same as profit margin?</h3>
        <p>
          No. Markup is calculated using the original product cost,
          while profit margin is calculated using the selling price.
        </p>

        <h3>How do I calculate a 30% markup?</h3>
        <p>
          Multiply the product cost by 0.30 and add that amount
          to the original cost. For a KES 500 product, the selling
          price would be KES 650.
        </p>

        <h3>Can small businesses use this calculator?</h3>
        <p>
          Yes. Retailers, wholesalers, shop owners, freelancers,
          and other entrepreneurs can use it to estimate selling
          prices.
        </p>
      </section>
    </>
  );
}

  
if (id === "discount") {
  const price = n("price", 2000);
  const discount = n("discount", 15);
  const safeDiscount = Math.min(100, Math.max(0, discount));
  const savings = (price * safeDiscount) / 100;
  const finalPrice = price - savings;

  return (
    <>
      <CalculatorShell
        title="Discount calculator"
        intro="Calculate how much you save during a sale and find the final price after applying a percentage discount."
      >
        <NumberField
          label="Original price"
          value={values.price ?? "2000"}
          onChange={set("price")}
        />
        <NumberField
          label="Discount (%)"
          value={values.discount ?? "15"}
          onChange={set("discount")}
          hint="Discount is limited to a range of 0% to 100%."
        />
        <div className="results">
          <Result label="You save" value={money(savings, currency)} />
          <Result label="Final price" value={money(finalPrice, currency)} />
        </div>
      </CalculatorShell>

      <section className="calculator-guide">
        <h2>What is a discount?</h2>
        <p>
          A discount is a reduction in the original selling price
          of a product or service. Businesses use discounts to
          attract customers, increase sales, and clear stock.
          Shoppers use them to reduce their spending.
        </p>

        <h2>Discount calculation formula</h2>
        <p>
          Calculate the discount amount by multiplying the
          original price by the discount percentage.
        </p>
        <p>
          <strong>Discount Amount = Original Price × (Discount Percentage ÷ 100)</strong>
        </p>
        <p>
          <strong>Final Price = Original Price − Discount Amount</strong>
        </p>

        <h2>Practical discount calculation example</h2>
        <p>
          Imagine a product costs KES 2,000 and a shop offers
          a 15% discount.
        </p>
        <ul>
          <li>Original price: KES 2,000</li>
          <li>Discount percentage: 15%</li>
          <li>Amount saved: KES 300</li>
          <li>Final price: KES 1,700</li>
        </ul>

        <h2>How to use this discount calculator</h2>
        <ol>
          <li>Enter the original price of the product.</li>
          <li>Enter the discount percentage.</li>
          <li>Select your preferred display currency.</li>
          <li>View your savings and the final discounted price.</li>
        </ol>

        <h2>Frequently asked questions</h2>

        <h3>How do I calculate 10% off a price?</h3>
        <p>
          Multiply the original price by 0.10 to find the
          discount amount, then subtract that amount from
          the original price.
        </p>

        <h3>How do I calculate a 20% discount?</h3>
        <p>
          Multiply the original price by 0.20. For example,
          a KES 1,000 product has a KES 200 discount, leaving
          a final price of KES 800.
        </p>

        <h3>Can a discount be 100%?</h3>
        <p>
          Yes. A 100% discount means the customer pays nothing
          because the entire original price has been deducted.
        </p>

        <h3>Can businesses use this calculator?</h3>
        <p>
          Yes. Retailers, online sellers, wholesalers, and
          small business owners can use it to calculate
          promotional prices and customer savings.
        </p>
      </section>
    </>
  );
}


  
if (id === "break-even") {
  const fixed = n("fixed", 50000);
  const price = n("price", 500);
  const variable = n("variable", 250);
  const contribution = price - variable;
  const units = contribution > 0 ? Math.ceil(fixed / contribution) : null;

  return (
    <>
      <CalculatorShell
        title="Break-even calculator"
        intro="Calculate how many units your business needs to sell to cover all its costs without making a loss or profit."
      >
        <NumberField
          label="Fixed costs"
          value={values.fixed ?? "50000"}
          onChange={set("fixed")}
          hint="Costs that do not change with the number of units sold."
        />
        <NumberField
          label="Selling price per unit"
          value={values.price ?? "500"}
          onChange={set("price")}
        />
        <NumberField
          label="Variable cost per unit"
          value={values.variable ?? "250"}
          onChange={set("variable")}
          hint="Cost incurred for each unit produced or sold."
        />
        <div className="results">
          <Result
            label="Contribution per unit"
            value={money(contribution, currency)}
          />
          <Result
            label="Break-even sales volume"
            value={units === null ? "Not achievable" : `${units.toLocaleString()} units`}
          />
          <Result
            label="Break-even revenue"
            value={units === null ? "—" : money(units * price, currency)}
          />
        </div>
        {contribution <= 0 && (
          <p className="notice warning">
            Your selling price must be greater than variable cost to reach break-even.
          </p>
        )}
      </CalculatorShell>

      <section className="calculator-guide">
        <h2>What is the break-even point?</h2>
        <p>
          The break-even point is the level of sales at which
          total revenue equals total costs. At this point,
          a business makes neither a profit nor a loss.
        </p>

        <h2>Break-even calculation formula</h2>
        <p>
          First, calculate the contribution earned from selling
          one unit. Then divide total fixed costs by that contribution.
        </p>
        <p>
          <strong>Contribution per Unit = Selling Price − Variable Cost per Unit</strong>
        </p>
        <p>
          <strong>Break-even Units = Fixed Costs ÷ Contribution per Unit</strong>
        </p>

        <h2>Practical break-even calculation example</h2>
        <p>
          Imagine a business has fixed costs of KES 50,000,
          sells each product for KES 500, and spends KES 250
          to produce each unit.
        </p>
        <ul>
          <li>Fixed costs: KES 50,000</li>
          <li>Selling price per unit: KES 500</li>
          <li>Variable cost per unit: KES 250</li>
          <li>Contribution per unit: KES 250</li>
          <li>Break-even sales volume: 200 units</li>
          <li>Break-even revenue: KES 100,000</li>
        </ul>

        <h2>How to use this break-even calculator</h2>
        <ol>
          <li>Enter your total fixed business costs.</li>
          <li>Enter the selling price of one unit.</li>
          <li>Enter the variable cost of producing or selling one unit.</li>
          <li>View the contribution per unit and required sales volume.</li>
        </ol>

        <h2>Frequently asked questions</h2>

        <h3>What are fixed costs?</h3>
        <p>
          Fixed costs are expenses that generally remain the same
          regardless of production or sales volume, such as rent
          and certain salaries.
        </p>

        <h3>What are variable costs?</h3>
        <p>
          Variable costs change with production or sales volume.
          Examples include raw materials, packaging, and
          production costs per unit.
        </p>

        <h3>Why is the break-even point important?</h3>
        <p>
          It helps business owners understand the minimum sales
          required to cover costs, set sales targets, and evaluate
          pricing decisions.
        </p>

        <h3>What happens after reaching break-even?</h3>
        <p>
          Additional sales can generate profit when the selling
          price remains above variable cost and other assumptions
          remain unchanged.
        </p>
      </section>
    </>
  );
}


  
// STOCK PROFIT CALCULATOR
if (id === "stock-profit") {
  const quantity = n("stockQuantity", 10);
  const purchasePrice = n("purchasePrice", 500);
  const expenses = n("stockExpenses", 0);
  const sellingPrice = n("sellingPrice", 700);

  const totalPurchaseCost = quantity * purchasePrice;
  const totalInvestment = totalPurchaseCost + expenses;
  const revenue = quantity * sellingPrice;
  const profit = revenue - totalInvestment;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const breakEvenPrice = quantity > 0 ? totalInvestment / quantity : 0;
  const profitPerUnit = quantity > 0 ? profit / quantity : 0;

  return (
    <>
      <CalculatorShell
        title="Stock Profit Calculator"
        intro="Calculate your stock investment, expected sales revenue and profit."
      >
        <NumberField
          label="Quantity of products purchased"
          value={values.stockQuantity ?? "10"}
          onChange={set("stockQuantity")}
          min="1"
          step="1"
        />

        <NumberField
          label="Purchase price per unit"
          value={values.purchasePrice ?? "500"}
          onChange={set("purchasePrice")}
        />

        <NumberField
          label="Additional expenses"
          value={values.stockExpenses ?? "0"}
          onChange={set("stockExpenses")}
          hint="Transport, packaging and other stock-related costs."
        />

        <NumberField
          label="Selling price per unit"
          value={values.sellingPrice ?? "700"}
          onChange={set("sellingPrice")}
        />

        <div className="results">
          <Result
            label="Total purchase cost"
            value={money(totalPurchaseCost, currency)}
          />
          <Result
            label="Total investment"
            value={money(totalInvestment, currency)}
          />
          <Result
            label="Expected sales revenue"
            value={money(revenue, currency)}
          />
          <Result
            label="Total profit"
            value={money(profit, currency)}
          />
          <Result
            label="Profit per unit"
            value={money(profitPerUnit, currency)}
          />
          <Result
            label="Profit margin"
            value={`${profitMargin.toFixed(2)}%`}
          />
          <Result
            label="Break-even selling price per unit"
            value={money(breakEvenPrice, currency)}
          />
        </div>

        {profit < 0 && (
          <p className="notice warning">
            Your selling price is too low to cover your total stock costs.
            You are making a loss.
          </p>
        )}
      </CalculatorShell>
    </>
  );
}


if (id === "sales-target") {
  const target = n("target", 100000);
  const averagePrice = n("averagePrice", 1000);
  const days = n("days", 30);
  const achieved = n("achieved", 25000);

  const remaining = Math.max(target - achieved, 0);
  const unitsRequired =
    averagePrice > 0 ? Math.ceil(remaining / averagePrice) : 0;
  const dailyRevenue = days > 0 ? remaining / days : 0;
  const dailyUnits =
    days > 0 ? Math.ceil(unitsRequired / days) : 0;
  const progress =
    target > 0 ? Math.min((achieved / target) * 100, 100) : 0;

  return (
    <CalculatorShell
      title="Sales target calculator"
      intro="Calculate how much your business needs to sell daily and how many units are required to reach your sales target."
    >
      <NumberField
        label="Sales target"
        value={values.target ?? "100000"}
        onChange={set("target")}
        hint="Your total revenue goal for the period."
      />

      <NumberField
        label="Average selling price per unit"
        value={values.averagePrice ?? "1000"}
        onChange={set("averagePrice")}
        hint="Average amount received for one unit."
      />

      <NumberField
        label="Number of selling days"
        value={values.days ?? "30"}
        onChange={set("days")}
        step="1"
        hint="Number of days available to reach your target."
      />

      <NumberField
        label="Sales already achieved"
        value={values.achieved ?? "25000"}
        onChange={set("achieved")}
        hint="Revenue already generated during this period."
      />

      <div className="results">
        <Result
          label="Remaining sales revenue"
          value={money(remaining, currency)}
        />
        <Result
          label="Units still required"
          value={unitsRequired.toLocaleString()}
        />
        <Result
          label="Daily revenue target"
          value={money(dailyRevenue, currency)}
        />
        <Result
          label="Daily units target"
          value={dailyUnits.toLocaleString()}
        />
        <Result
          label="Target achieved"
          value={`${progress.toFixed(1)}%`}
        />
      </div>

      {achieved >= target && target > 0 && (
        <p className="notice">
          Congratulations! You have reached your sales target.
        </p>
      )}

      {averagePrice <= 0 && (
        <p className="notice">
          Enter an average selling price greater than zero to calculate units.
        </p>
      )}

      {days <= 0 && (
        <p className="notice">
          Enter at least one selling day to calculate daily targets.
        </p>
      )}
    </CalculatorShell>
  );
}


if (id === "sales-target") {
  const target = n("target", 100000);
  const averagePrice = n("averagePrice", 1000);
  const days = n("days", 30);
  const achieved = n("achieved", 25000);

  const remaining = Math.max(target - achieved, 0);
  const unitsRequired =
    averagePrice > 0 ? Math.ceil(remaining / averagePrice) : 0;
  const dailyRevenue = days > 0 ? remaining / days : 0;
  const dailyUnits =
    days > 0 ? Math.ceil(unitsRequired / days) : 0;
  const progress =
    target > 0 ? Math.min((achieved / target) * 100, 100) : 0;

  return (
    <CalculatorShell
      title="Sales Target Calculator"
      intro="Calculate how much your business needs to sell daily and how many units are required to reach your sales target."
    >
      <NumberField
        label="Sales target"
        value={values.target ?? "100000"}
        onChange={set("target")}
      />

      <NumberField
        label="Average selling price per unit"
        value={values.averagePrice ?? "1000"}
        onChange={set("averagePrice")}
      />

      <NumberField
        label="Number of selling days"
        value={values.days ?? "30"}
        onChange={set("days")}
        step="1"
      />

      <NumberField
        label="Sales already achieved"
        value={values.achieved ?? "25000"}
        onChange={set("achieved")}
      />

      <div className="results">
        <Result label="Remaining sales revenue" value={money(remaining, currency)} />
        <Result label="Units still required" value={unitsRequired.toLocaleString()} />
        <Result label="Daily revenue target" value={money(dailyRevenue, currency)} />
        <Result label="Daily units target" value={dailyUnits.toLocaleString()} />
        <Result label="Target achieved" value={`${progress.toFixed(1)}%`} />
      </div>

      {achieved >= target && target > 0 && (
        <p className="notice">
          Congratulations! You have reached your sales target.
        </p>
      )}
    </CalculatorShell>
  );
}


const amount = n("amount", 1000);
const rate = Math.max(0, n("rate", 16));
const vat =
  vatMode === "add"
    ? (amount * rate) / 100
    : amount - amount / (1 + rate / 100);
const total = vatMode === "add" ? amount + vat : amount;
const net = vatMode === "add" ? amount : amount - vat;

return (
  <>
    <CalculatorShell
      title="VAT calculator"
      intro="Calculate value added tax by adding VAT to a price or extracting VAT from a VAT-inclusive total."
    >
      <div className="mode-switch" role="group" aria-label="VAT calculation mode">
        <button
          className={vatMode === "add" ? "selected" : ""}
          onClick={() => setVatMode("add")}
        >
          Add VAT
        </button>
        <button
          className={vatMode === "remove" ? "selected" : ""}
          onClick={() => setVatMode("remove")}
        >
          Extract VAT
        </button>
      </div>

      <NumberField
        label={vatMode === "add" ? "Price before VAT" : "Price including VAT"}
        value={values.amount ?? "1000"}
        onChange={set("amount")}
      />

      <NumberField
        label="VAT rate (%)"
        value={values.rate ?? "16"}
        onChange={set("rate")}
        hint="Enter the applicable rate for your country or transaction."
      />

      <div className="results">
        <Result label="Net amount" value={money(net, currency)} />
        <Result label="VAT amount" value={money(vat, currency)} />
        <Result label="Total including VAT" value={money(total, currency)} />
      </div>

      <p className="notice">
        Tax rates and exemptions vary by jurisdiction. Confirm the applicable
        rate before using this result for tax filings.
      </p>
    </CalculatorShell>

    <section className="calculator-guide">
      <h2>What is VAT?</h2>
      <p>
        Value Added Tax (VAT) is a consumption tax charged on
        taxable goods and services. Businesses collect VAT on
        taxable sales and account for it according to the tax
        rules applicable in their jurisdiction.
      </p>

      <h2>How to calculate VAT</h2>
      <p>
        When adding VAT, multiply the price before VAT by the
        VAT rate divided by 100.
      </p>
      <p>
        <strong>VAT Amount = Net Price × (VAT Rate ÷ 100)</strong>
      </p>
      <p>
        <strong>Total Price = Net Price + VAT Amount</strong>
      </p>

      <h2>How to extract VAT</h2>
      <p>
        If a price already includes VAT, divide the total price
        by 1 plus the VAT rate expressed as a decimal to find
        the original price before VAT.
      </p>
      <p>
        <strong>Net Price = VAT-inclusive Price ÷ (1 + VAT Rate ÷ 100)</strong>
      </p>
      <p>
        <strong>VAT Amount = VAT-inclusive Price − Net Price</strong>
      </p>

      <h2>Practical VAT calculation example</h2>
      <p>
        Assume a taxable product costs KES 1,000 before VAT
        and an applicable VAT rate of 16% is used.
      </p>
      <ul>
        <li>Price before VAT: KES 1,000</li>
        <li>VAT rate: 16%</li>
        <li>VAT amount: KES 160</li>
        <li>Total including VAT: KES 1,160</li>
      </ul>

      <p>
        If KES 1,160 already includes VAT at 16%, extracting
        VAT gives a net price of KES 1,000 and VAT of KES 160.
      </p>

      <h2>How to use this VAT calculator</h2>
      <ol>
        <li>Select Add VAT or Extract VAT.</li>
        <li>Enter the price before VAT or the VAT-inclusive price.</li>
        <li>Enter the applicable VAT percentage.</li>
        <li>Select your preferred display currency.</li>
        <li>View the net amount, VAT amount, and total.</li>
      </ol>

      <h2>Frequently asked questions</h2>

      <h3>What does VAT stand for?</h3>
      <p>
        VAT stands for Value Added Tax. It is a consumption
        tax applied to taxable goods and services.
      </p>

      <h3>What is the VAT rate in Kenya?</h3>
      <p>
        Kenya's standard VAT rate is 16%. However, some goods
        and services may have different tax treatment, including
        zero-rating or exemption. Check the current Kenya
        Revenue Authority guidance before applying a rate.
      </p>

      <h3>What is the difference between adding and extracting VAT?</h3>
      <p>
        Adding VAT calculates tax on a price that does not
        include VAT. Extracting VAT separates the tax amount
        from a price that already includes VAT.
      </p>

      <h3>Is VAT the same in every country?</h3>
      <p>
        No. VAT rates, exemptions, and rules differ between
        countries. Always use the rate applicable to your
        location and transaction.
      </p>

      <h3>Can businesses use this calculator?</h3>
      <p>
        Yes. Businesses, retailers, freelancers, and individuals
        can use it to estimate VAT amounts and VAT-inclusive prices.
      </p>
    </section>
  </>
);
}

export function CalculatorShell({ title, intro, children }) {
  return (
    <section className="calculator-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">SMARTCALC TOOL</p>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>
        <span className="panel-symbol">＝</span>
      </div>
      <div className="fields">{children}</div>
    </section>
  );
}

export default function App() {
  const location = useLocation();

  const [active, setActive] = useState("profit");
  const [currency, setCurrency] = useState("KES");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      calculators.filter((c) =>
        `${c.name} ${c.short} ${c.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const selected =
    calculators.find((c) => c.id === active) ?? calculators[0];

  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
const pageId = pageRoutes[normalizedPath];
const pageTool = calculators.find((tool) => tool.id === pageId);

if (location.pathname === "/about") {
  return <About />;
}

if (location.pathname === "/contact") {
  return <Contact />;
}

if (location.pathname === "/privacy-policy") {
  return <Privacy />;
}

if (location.pathname === "/invoice-generator") {
  return (
    <div className="app">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">S</span>
          <span>
            Smart<span className="brand-accent">Calc</span>
          </span>
        </Link>
      </header>

      <main className="page-transition">
        <InvoiceGenerator />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} SmartCalc. All rights reserved.</p>
        <Link to="/">Back to Home</Link>
      </footer>
    </div>
  );
}

if (location.pathname === "/expense-tracker") {
  return (
    <div className="app">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">S</span>
          <span>
            Smart<span className="brand-accent">Calc</span>
          </span>
        </Link>
      </header>

      <main className="page-transition">
        <ExpenseTracker />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} SmartCalc. All rights reserved.</p>
        <Link to="/">Back to Home</Link>
      </footer>
    </div>
  );
}

if (location.pathname === "/terms-and-conditions") {
  return <Terms />;
}

  const currencyPicker = (
    <label className="currency-picker">
      <span>Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        aria-label="Display currency"
      >
        <option value="KES">KES — Kenyan shilling</option>
        <option value="USD">USD — US dollar</option>
        <option value="GBP">GBP — British pound</option>
        <option value="EUR">EUR — Euro</option>
        <option value="NGN">NGN — Nigerian naira</option>
        <option value="ZAR">ZAR — South African rand</option>
      </select>
    </label>
  );

  if (pageTool) {
    return (
      <div className="app">
        <header className="topbar">
          <Link className="brand" to="/">
            <span className="brand-mark">S</span>
            <span>
              Smart<span className="brand-accent">Calc</span>
            </span>
          </Link>
          {currencyPicker}
        </header>

        <CalculatorPage
  title={pageTool.name}
  description={pageTool.short}
  canonicalPath={pageUrl[pageTool.id]}
>
          <Calculator id={pageTool.id} currency={currency} />
          <p>
            <Link to="/">← Back to all calculators</Link>
          </p>
        </CalculatorPage>

        <footer>
          <p>Free tools for clearer everyday decisions.</p>
          <small>© {new Date().getFullYear()} SmartCalc. All rights reserved.</small>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="SmartCalc home">
          <span className="brand-mark">S</span>
          <span>
            Smart<span className="brand-accent">Calc</span>
          </span>
        </Link>

        <nav>
  <a href="#calculators">Calculators</a>
  <Link to="/invoice-generator">Invoice Generator</Link>
  <Link to="/expense-tracker">Expense Tracker</Link>
  <Link to="/about">About</Link>
</nav>

        {currencyPicker}
      </header>

      <main className="page-transition">
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-tag">
              <span className="live-dot"></span> FREE ONLINE TOOLS
            </span>
            <h1>
              Make smarter decisions
              <br />
              <em>with every calculation.</em>
            </h1>
            <p>
              Simple, reliable calculators for your business, shopping and
              everyday numbers. Free to use, wherever you are.
            </p>
            <a className="primary-link" href="#calculators">
              Explore calculators <span>→</span>
            </a>
            <div className="trust-line">
              <span>✓ No sign-up required</span>
              <span>✓ Fast & easy</span>
              <span>✓ Mobile friendly</span>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one"></div>
            <div className="art-orbit orbit-two"></div>
            <div className="floating-card card-a">
              <small>PROFIT MARGIN</small>
              <strong>28.5%</strong>
              <span>↗ Healthy growth</span>
            </div>
            <div className="floating-card card-b">
              <small>QUICK RESULT</small>
              <strong>+ KSh 4,250</strong>
              <span>Estimated profit</span>
            </div>
            <div className="calculator-illustration">
              <div className="calc-top">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="calc-screen">1,250.00</div>
              <div className="calc-keys">
                <b>+</b>
                <b>−</b>
                <b>×</b>
                <b>÷</b>
                <b>7</b>
                <b>8</b>
                <b>9</b>
                <b>=</b>
              </div>
            </div>
          </div>
        </section>

        <section className="workspace" id="calculators">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE TOOLKIT</p>
              <h2>What would you like to calculate?</h2>
              <p>Choose a tool and get your answer instantly.</p>
            </div>
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a calculator..."
                aria-label="Find a calculator"
              />
            </div>
          </div>

          <div className="tool-layout">
            <aside className="tool-list" aria-label="Calculator list">
              {filtered.map((tool) => (
                <button
                  key={tool.id}
                  className={`tool-item ${active === tool.id ? "active" : ""}`}
                  onClick={() => setActive(tool.id)}
                >
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-text">
                    <strong>{tool.name}</strong>
                    <small>{tool.short}</small>
                  </span>
                  <span className="tool-arrow">→</span>
                </button>
              ))}

              {filtered.length === 0 && (
                <p className="empty-state">
                  No calculators match that search.
                </p>
              )}
            </aside>

            <div className="tool-main">
              <div className="active-tool-label">
                <span>{selected.category}</span>
                <span>Instant calculation</span>
              </div>
              <Calculator key={active} id={active} currency={currency} />
              <p>
                <Link to={pageUrl[active]}>
                  Open dedicated {selected.name.toLowerCase()} page →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="benefits" id="about">
          <div>
            <span className="benefit-icon">◎</span>
            <h3>Simple by design</h3>
            <p>
              Clear inputs and straightforward results, without unnecessary
              steps.
            </p>
          </div>
          <div>
            <span className="benefit-icon">⌁</span>
            <h3>Made for everyone</h3>
            <p>
              Useful for students, shoppers, freelancers and growing
              businesses.
            </p>
          </div>
          <div>
            <span className="benefit-icon">◷</span>
            <h3>Results in seconds</h3>
            <p>
              Calculations happen in your browser. Your entries are not sent
              to a server.
            </p>
          </div>
        </section>

        <section className="disclaimer">
          <strong>Calculation note:</strong> SmartCalc provides general
          estimates for informational purposes. Check important financial
          and tax calculations independently before making decisions.
        </section>
      </main>

      <footer>
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark">S</span>
          <span>
            Smart<span className="brand-accent">Calc</span>
          </span>
        </Link>
        <p>Free tools for clearer everyday decisions.</p>
        <div className="footer-links">
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
<Link to="/privacy-policy">Privacy</Link>
<Link to="/terms-and-conditions">Terms</Link>
</div>
        <small>
          © {new Date().getFullYear()} SmartCalc. All rights reserved.
        </small>
      </footer>
    </div>
  );
}
