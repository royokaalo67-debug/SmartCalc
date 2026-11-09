
import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <main>
      <section className="workspace">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CONTACT SMARTCALC</p>
            <h1>We'd love to hear from you.</h1>
            <p>
              Have a question, suggestion, or feedback about
              SmartCalc? Get in touch with us.
            </p>
          </div>
        </div>

        <div className="calculator-guide">
          <h2>Get in touch</h2>
          <p>
            For questions, feedback, technical issues, or
            business enquiries, contact us by email.
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:royokaalo67@gmail.com">
              royokaalo67@gmail.com
            </a>
          </p>

          <p>
            We appreciate your feedback and suggestions
            as we continue improving SmartCalc.
          </p>

          <p>
            <Link to="/">Back to SmartCalc home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
