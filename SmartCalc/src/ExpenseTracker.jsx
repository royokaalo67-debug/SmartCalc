
import React, { useMemo, useState } from "react";

const categories = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Shopping",
  "Business",
  "Health",
  "Other",
];

const today = new Date().toISOString().slice(0, 10);

const loadExpenses = () => {
  try {
    const saved = localStorage.getItem("smartcalc-expenses");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today);
  const [filter, setFilter] = useState("All");

  const saveExpenses = (updated) => {
    setExpenses(updated);
    localStorage.setItem("smartcalc-expenses", JSON.stringify(updated));
  };

  const total = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses]
  );

  const categoryTotals = useMemo(
    () =>
      categories
        .map((item) => ({
          name: item,
          total: expenses
            .filter((expense) => expense.category === item)
            .reduce((sum, expense) => sum + expense.amount, 0),
        }))
        .filter((item) => item.total > 0)
        .sort((a, b) => b.total - a.total),
    [expenses]
  );

  const filteredExpenses = useMemo(
    () =>
      expenses
        .filter((item) => filter === "All" || item.category === filter)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [expenses, filter]
  );

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(value);

  const addExpense = (event) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!name.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0 || !date) {
      return;
    }

    const newExpense = {
      id: Date.now() + Math.random(),
      name: name.trim(),
      category,
      amount: numericAmount,
      date,
    };

    saveExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
    setCategory("Food");
    setDate(today);
  };

  const deleteExpense = (id) => {
    saveExpenses(expenses.filter((item) => item.id !== id));
  };

  return (
    <div className="expense-page">
      <div className="expense-heading">
        <div>
          <span className="expense-tag">SMARTCALC BUSINESS TOOLS</span>
          <h1>Expense Tracker</h1>
          <p>Track your spending and understand where your money goes.</p>
        </div>
      </div>

      <div className="expense-summary">
        <div className="expense-stat">
          <span>Total expenses</span>
          <strong>{formatMoney(total)}</strong>
        </div>
        <div className="expense-stat">
          <span>Number of records</span>
          <strong>{expenses.length}</strong>
        </div>
        <div className="expense-stat">
          <span>Categories used</span>
          <strong>{categoryTotals.length}</strong>
        </div>
      </div>

      <div className="expense-layout">
        <section className="expense-card">
          <h2>Add an expense</h2>

          <form onSubmit={addExpense} className="expense-form">
            <label>
              Expense name
              <input
                type="text"
                placeholder="e.g. Grocery shopping"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>

            <label>
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              Amount (KES)
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>

            <button type="submit" className="expense-submit">
              + Add Expense
            </button>
          </form>
        </section>

        <section className="expense-card">
          <h2>Spending by category</h2>

          {categoryTotals.length === 0 ? (
            <p className="expense-empty">Your category summaries will appear here.</p>
          ) : (
            <div className="expense-category-list">
              {categoryTotals.map((item) => (
                <div className="expense-category" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{formatMoney(item.total)}</span>
                  </div>
                  <div className="expense-progress">
                    <span style={{ width: `${total ? (item.total / total) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="expense-card expense-records">
        <div className="expense-record-heading">
          <h2>Expense history</h2>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter expenses by category"
          >
            <option value="All">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {filteredExpenses.length === 0 ? (
          <p className="expense-empty">No expenses to display. Add your first expense above.</p>
        ) : (
          <div className="expense-table-wrap">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td><span className="expense-category-tag">{item.category}</span></td>
                    <td>{item.date}</td>
                    <td className="expense-money">{formatMoney(item.amount)}</td>
                    <td>
                      <button
                        type="button"
                        className="expense-delete"
                        onClick={() => deleteExpense(item.id)}
                        aria-label={`Delete ${item.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="expense-privacy">
        Your expense records are saved locally in this browser. They are not uploaded to SmartCalc.
        Clearing your browser data may remove them.
      </p>
    </div>
  );
}
