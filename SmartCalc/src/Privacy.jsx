
import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <main className="page-transition">
      <section className="workspace">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SMARTCALC POLICIES</p>
            <h1>Privacy Policy</h1>
            <p>Last updated: November 9, 2026</p>
          </div>
        </div>

        <div className="calculator-page">
          <h2>1. Introduction</h2>
          <p>
            Welcome to SmartCalc. We respect your privacy and are
            committed to explaining how information may be collected,
            used, and protected when you visit our website.
          </p>

          <h2>2. Information we collect</h2>
          <p>
            SmartCalc does not require visitors to create accounts
            or provide personal information to use its calculators.
            Calculator inputs are processed in your browser and are
            not intentionally submitted to SmartCalc servers.
          </p>
          <p>
            Our website hosting provider may process technical
            information such as IP addresses, browser details,
            device information, and server logs to operate and
            secure the website.
          </p>

          <h2>3. Cookies and similar technologies</h2>
          <p>
            SmartCalc or third-party services may use cookies and
            similar technologies to support website functionality,
            understand usage, and deliver relevant advertising
            where applicable.
          </p>

          <h2>4. Third-party services and advertising</h2>
          <p>
            We may use third-party services such as website hosting,
            analytics, and advertising providers. These providers
            may process information according to their own privacy
            policies.
          </p>
          <p>
            If Google AdSense or other advertising services are
            introduced, they may use cookies or similar technologies
            to display and measure advertisements. Visitors can
            review Google's advertising and privacy policies for
            more information.
          </p>

          <h2>5. How we use information</h2>
          <p>
            Technical information may be used to maintain website
            security, troubleshoot problems, understand website
            performance, and improve the user experience.
          </p>

          <h2>6. Data security</h2>
          <p>
            We take reasonable steps to maintain the security
            and availability of our website. However, no internet
            transmission or storage system can be guaranteed
            to be completely secure.
          </p>

          <h2>7. Your privacy choices</h2>
          <p>
            You can manage cookies through your browser settings.
            Depending on your location, you may also have additional
            privacy rights under applicable data protection laws.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy when our services
            or legal requirements change. Updates will be published
            on this page.
          </p>

          <h2>9. Contact us</h2>
          <p>
            For privacy questions, contact us at:
            royokaalo67@gmail.com
          </p>

          <p>
            <Link to="/">← Back to SmartCalc home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
