import React from 'react';

const PayGuide: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Paying Your Security Professional</h1>
      <p className="text-gray-700 mb-2">A Legal Guide for Employers Using FindMySecurity</p>

      <section className="mb-8">
        <p className="text-gray-700 mb-2">
          Whether you're hiring a door supervisor, CCTV operator, close protection officer or static security guard, it’s essential to ensure they’re paid correctly and in full compliance with UK employment law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payroll Obligations</h2>
        <p className="text-gray-700 mb-2">
          All workers in the UK, including SIA-licensed security professionals, must contribute to the economy by paying Income Tax and National Insurance. If you're hiring a security officer directly (i.e., not via a third-party security company), you become their employer and are legally required to operate a PAYE (Pay As You Earn) scheme through HM Revenue & Customs (HMRC).
        </p>
        <p className="text-gray-700 mb-2">This means you'll be responsible for:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Deducting Income Tax and National Insurance from their gross pay</li>
          <li>Submitting payroll information to HMRC via Real-Time Information (RTI) reporting</li>
          <li>Providing regular payslips</li>
          <li>Paying employer National Insurance contributions</li>
          <li>Administering Statutory Sick Pay, Maternity Pay, and Paternity Pay (if applicable)</li>
          <li>Managing Workplace Pension auto-enrolment obligations (if the worker qualifies)</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Accurately calculating deductions and staying compliant can be complex especially if your security professional works irregular shifts or holds multiple jobs with different employers. Their tax code may vary, and you’ll need to take this into account when processing payroll.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Zero-Hour Contracts for Security Professionals</h2>
        <p className="text-gray-700 mb-2">
          According to current UK law, zero-hour contracts are legal and may be used for SIA-licensed roles, provided they’re used appropriately.
        </p>
        <p className="text-gray-700 mb-2">[Source: SIA & gov.uk – Zero Hours Employment Guidance]</p>
        <p className="text-gray-700 mb-2">What this means:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>You may legally hire a security professional on a zero-hour contract, meaning you’re not obligated to offer a minimum number of hours, and the professional is not required to accept every shift.</li>
          <li>They are entitled to all relevant employment rights including:
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
              <li>National Minimum Wage or National Living Wage</li>
              <li>Paid holiday (calculated pro-rata)</li>
              <li>Rest breaks and safe working conditions</li>
              <li>Freedom from discrimination</li>
              <li>Protection under health and safety legislation</li>
            </ul>
          </li>
          <li>Exclusivity clauses are not permitted in zero-hour contracts. Your security professional is free to work elsewhere.</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Note: If you regularly rely on a security worker for consistent shifts, a part-time or full-time contract may be more suitable and legally robust. Regular review of working hours is recommended to ensure fair treatment and correct classification.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payroll Support</h2>
        <p className="text-gray-700 mb-2">
          If managing PAYE, pensions and statutory payments sounds overwhelming, we recommend using a professional payroll provider. Many providers can manage:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Gross-to-net calculations</li>
          <li>Payslip generation</li>
          <li>RTI submissions</li>
          <li>Pension enrolment and management</li>
          <li>Statutory payment administration</li>
          <li>Employment contract drafting</li>
          <li>HMRC registration</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Best Practice Reminders</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Always issue a written employment contract (required by law from day one of employment)</li>
          <li>Retain accurate records of hours worked, pay issued, and holiday taken</li>
          <li>Clearly outline shift terms, cancellation policies, and overtime arrangements in the contract</li>
          <li>Review and adjust employment status periodically, especially for workers on zero-hour contracts who develop regular shift patterns</li>
          <li>Be transparent about pay rates and breaks, especially during bank holidays, night shifts, or high-risk assignments</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stay Compliant, Protect Your Business</h2>
        <p className="text-gray-700 mb-2">
          FindMySecurity encourages all clients who hire security professionals directly to take their legal obligations seriously. Doing so protects both your business and the professionals who work hard to keep people and assets safe.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">If you need help drafting contracts or managing payroll</h2>
        <p className="text-gray-700">
          Reach out to a regulated provider or employment solicitor for support.
        </p>
      </section>
    </div>
  );
};

export default PayGuide;