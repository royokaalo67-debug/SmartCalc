import React, { useMemo, useState } from "react";

const createItem = () => ({
  id: Date.now() + Math.random(),
  description: "",
  quantity: 1,
  price: 0,
});

export default function InvoiceGenerator() {
  const [business, setBusiness] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("KES");
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState([createItem()]);
  const [notes, setNotes] = useState("Thank you for your business!");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Math.max(0, Number(item.quantity) || 0) *
            Math.max(0, Number(item.price) || 0),
        0
      ),
    [items]
  );

  const tax = subtotal * (Math.max(0, Number(taxRate) || 0) / 100);
  const total = subtotal + tax;

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    }).format(amount);

  const updateItem = (id, field, value) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const updateDetails = (setter, field, value) => {
    setter((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="invoice-page">
      <div className="invoice-heading">
        <div>
          <span className="invoice-tag">FREE BUSINESS TOOL</span>
          <h1>Invoice Generator</h1>
          <p>Create professional invoices for your customers in minutes.</p>
        </div>
        <button className="invoice-download" onClick={() => window.print()}>
          Download / Print PDF
        </button>
      </div>

      <div className="invoice-form">
        <section className="invoice-section">
          <h2>Your business</h2>
          <div className="invoice-fields">
            <input
              placeholder="Business name"
              value={business.name}
              onChange={(e) => updateDetails(setBusiness, "name", e.target.value)}
            />
            <input
              placeholder="Business email"
              type="email"
              value={business.email}
              onChange={(e) => updateDetails(setBusiness, "email", e.target.value)}
            />
            <input
              placeholder="Phone number"
              value={business.phone}
              onChange={(e) => updateDetails(setBusiness, "phone", e.target.value)}
            />
            <textarea
              placeholder="Business address"
              value={business.address}
              onChange={(e) => updateDetails(setBusiness, "address", e.target.value)}
            />
          </div>
        </section>

        <section className="invoice-section">
          <h2>Bill to</h2>
          <div className="invoice-fields">
            <input
              placeholder="Customer name"
              value={customer.name}
              onChange={(e) => updateDetails(setCustomer, "name", e.target.value)}
            />
            <input
              placeholder="Customer email"
              type="email"
              value={customer.email}
              onChange={(e) => updateDetails(setCustomer, "email", e.target.value)}
            />
            <textarea
              placeholder="Customer address"
              value={customer.address}
              onChange={(e) => updateDetails(setCustomer, "address", e.target.value)}
            />
          </div>
        </section>

        <section className="invoice-section">
          <h2>Invoice details</h2>
          <div className="invoice-fields invoice-meta">
            <label>
              Invoice number
              <input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </label>
            <label>
              Invoice date
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </label>
            <label>
              Due date
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <label>
              Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="KES">KES - Kenyan shilling</option>
                <option value="USD">USD - US dollar</option>
                <option value="GBP">GBP - British pound</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </label>
          </div>
        </section>

        <section className="invoice-section">
          <div className="invoice-section-heading">
            <h2>Items and services</h2>
            <button
              className="invoice-add"
              onClick={() => setItems((current) => [...current, createItem()])}
            >
              + Add item
            </button>
          </div>

          <div className="invoice-table-wrap">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit price</th>
                  <th>Amount</th>
                  <th className="no-print"> </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        aria-label="Item description"
                        placeholder="Product or service"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        aria-label="Quantity"
                        type="number"
                        min="0"
                        step="any"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        aria-label="Unit price"
                        type="number"
                        min="0"
                        step="any"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(item.id, "price", e.target.value)
                        }
                      />
                    </td>
                    <td className="invoice-amount">
                      {formatMoney(
                        Math.max(0, Number(item.quantity) || 0) *
                          Math.max(0, Number(item.price) || 0)
                      )}
                    </td>
                    <td className="no-print">
                      <button
                        className="invoice-remove"
                        onClick={() =>
                          setItems((current) =>
                            current.length > 1
                              ? current.filter((entry) => entry.id !== item.id)
                              : current
                          )
                        }
                        aria-label="Remove item"
                        disabled={items.length === 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="invoice-section invoice-summary">
          <label>
            Tax rate (%)
            <input
              type="number"
              min="0"
              step="any"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </label>

          <div className="invoice-totals">
            <p>
              Subtotal <strong>{formatMoney(subtotal)}</strong>
            </p>
            <p>
              Tax ({Number(taxRate) || 0}%)
              <strong>{formatMoney(tax)}</strong>
            </p>
            <p className="invoice-grand-total">
              Total <strong>{formatMoney(total)}</strong>
            </p>
          </div>
        </section>

        <section className="invoice-section">
          <h2>Additional notes</h2>
          <textarea
            className="invoice-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Payment instructions or additional notes"
          />
        </section>

        <div className="invoice-bottom no-print">
          <button className="invoice-download" onClick={() => window.print()}>
            Download / Print PDF
          </button>
          <p>Your invoice will open in the print window. Choose Save as PDF.</p>
        </div>
      </div>
    </div>
  );
}


