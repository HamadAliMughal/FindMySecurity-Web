import React from 'react';

const PrivacyAndCookiesPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy and Cookies Policy</h1>
      <p className="text-gray-600 mb-4">Effective Date: 30th May 2025</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Who are we?</h2>
        <p className="text-gray-700 mb-2">1.1 We are FindMySecurity Ltd, trading as FindMySecurity. We are a UK-registered technology platform dedicated to connecting security professionals, companies, training providers, and clients. For privacy-related queries, you can contact us at info@findmysecurity.co.uk. Further contact details are available on our website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. What is the purpose of this policy?</h2>
        <p className="text-gray-700 mb-2">2.1 This policy explains what personal data we collect, how we use it, and your rights. Please read it carefully. By using our platform, you agree to the practices outlined.</p>
        <p className="text-gray-700 mb-2">2.2 This policy covers only data collected through our website, app, or communication channels. If you interact with third-party services (e.g. payment gateways, external training platforms, or affiliated insurance providers), please consult their privacy policies separately.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Might this policy change?</h2>
        <p className="text-gray-700 mb-2">3.1 Yes. We may update this policy from time to time. Any changes will be communicated by updating this document on our platform and, where appropriate, through direct notifications.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. What data do we collect?</h2>
        <p className="text-gray-700 mb-2">4.1 Information you upload or provide:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Name, contact information, and demographic details;</li>
          <li>Professional documents including SIA licences, CVs, training certificates, proof of right to work, and identification documents;</li>
          <li>Account data such as username and password;</li>
          <li>Payment or transaction records on the platform;</li>
          <li>Profile and job application information, including availability, experience, and posted reviews;</li>
          <li>Communication history with FindMySecurity and other users;</li>
          <li>Newsletter or promotional preferences if you opt in.</li>
        </ul>
        <p className="text-gray-700 mb-2 mt-2">4.2 Automated information:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>IP address, browser type and version, operating system, device type and ID;</li>
          <li>Device and connection logs, session time, pages visited, interactions, referral source, and time/date stamps;</li>
          <li>Login activity and usage patterns across the platform.</li>
        </ul>
        <p className="text-gray-700 mb-2 mt-2">4.3 Location data (if enabled on the app):</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>General geolocation or postcode-based location to assist in job matches.</li>
        </ul>
        <p className="text-gray-700 mb-2 mt-2">4.4 Data from third parties:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Limited billing details from Stripe, PayPal, or App Store (e.g. name, billing address, and email);</li>
          <li>If logging in via Facebook, we may receive your name, email, birthday, and location, if permitted, we may use your Facebook friends list to display relevant network content.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Why do we collect this data?</h2>
        <p className="text-gray-700 mb-2">5.1 Contractual necessity – to create, manage, and maintain your account, and provide services requested by you.</p>
        <p className="text-gray-700 mb-2">5.2 Legitimate interest – to improve our services, monitor performance, prevent fraud, and promote relevant features. We may occasionally contact you for user feedback or to inform you about similar services.</p>
        <p className="text-gray-700 mb-2">5.3 Consent – if you opt in to marketing emails or allow cookies that track preferences. You can withdraw consent at any time by updating your settings or contacting us.</p>
        <p className="text-gray-700 mb-2">5.4 Legal obligation – to comply with regulatory requirements related to safety, hiring, identity verification, and record-keeping.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Do we use cookies?</h2>
        <p className="text-gray-700 mb-2">6.1 Yes. Our website and partners use cookies and similar tracking tools.</p>
        <p className="text-gray-700 mb-2">6.2 Cookies are small data files stored on your device. Some cookies are essential for the platform to function. If you block cookies, certain features may not work correctly.</p>
        <p className="text-gray-700 mb-2">6.3 The cookies we place directly include:</p>
        <table className="table-auto w-full text-gray-700 border border-gray-300 mb-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-left">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Logged-in status</td>
              <td className="border px-4 py-2">Verifies if you're logged into your FindMySecurity account</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">"Remember me"</td>
              <td className="border px-4 py-2">Saves login details for quicker access on return visits</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Preferences</td>
              <td className="border px-4 py-2">Stores settings such as filters, language, and dashboard configuration</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Security</td>
              <td className="border px-4 py-2">Detects and prevents fraud, unauthorised logins, or brute-force attacks</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Cookie notice</td>
              <td className="border px-4 py-2">Records your acceptance of our cookie policy</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700 mb-2">6.4 Third-party cookies:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Analytics cookies: Track visitor numbers, site interaction, session flow, and improve usability. Provided by:</li>
          <ul className="list-circle list-inside text-gray-700 space-y-2 ml-8">
            <li>Google Analytics: Data practices</li>
          </ul>
          <li>Advertising cookies: Help personalise marketing messages and limit ad repetition. Used by:</li>
          <ul className="list-circle list-inside text-gray-700 space-y-2 ml-8">
            <li>Google (Adsense, DoubleClick): More info</li>
            <li>Microsoft Bing: Privacy control</li>
          </ul>
          <li>Social login cookies: Used when logging in via Facebook, Apple or Google.</li>
          <ul className="list-circle list-inside text-gray-700 space-y-2 ml-8">
            <li>Social media persistent cookies enable seamless login; we set a cookie to prevent automatic login if you sign out manually.</li>
          </ul>
        </ul>
        <p className="text-gray-700 mb-2 mt-2">To learn more about managing cookies:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>All About Cookies</li>
          <li>YourOnlineChoices</li>
          <li>Network Advertising Initiative</li>
          <li>AboutAds</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. How long do we retain your information?</h2>
        <p className="text-gray-700 mb-2">7.1 We retain personal documents uploaded by security professionals (such as SIA licences, proof of right to work, or ID documents) for up to 6 months following inactivity or termination of the account. Other personal data (e.g., profile information, communications, transaction logs) may be held for up to six years or until you request deletion via email or our contact form.</p>
        <p className="text-gray-700 mb-2">7.2 We may retain certain information beyond account closure where required for legal, regulatory, taxation, fraud prevention, dispute resolution, or enforcement purposes (typically for a maximum of six years).</p>
        <p className="text-gray-700 mb-2">7.3 Where you have consented to receive marketing communications, we will keep your contact details until you unsubscribe or request removal.</p>
        <p className="text-gray-700 mb-2">7.4 Automated browsing data (e.g. analytics cookies, IP logs) is typically retained for up to 12 months.</p>
        <p className="text-gray-700 mb-2">7.5 If you’ve posted public reviews on FindMySecurity, we may retain and display them beyond your account closure unless you explicitly request their removal.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Who do we share your personal data with?</h2>
        <p className="text-gray-700 mb-2">8.1 Third-party service providers who support our platform operation, such as:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Hosting, content delivery, and cloud infrastructure providers;</li>
          <li>Communication platforms, review systems, and survey tools;</li>
          <li>Online advertising partners and tracking/analytics providers;</li>
          <li>Payment processors and fraud detection platforms;</li>
          <li>Training/course providers and webinar partners;</li>
          <li>IT and technical support services.</li>
        </ul>
        <p className="text-gray-700 mb-2 mt-2">8.2 If you opt into insurance features available on FindMySecurity, we may share your relevant details (e.g., name, contact details, licensing status, employment reference) with our authorised insurance provider.</p>
        <p className="text-gray-700 mb-2">8.3 Information entered into your public profile or shared in public reviews or messages may be visible to other registered users of the platform. If you upload documents like SIA licences, you control whether they are viewed to hiring businesses or security firms.</p>
        <p className="text-gray-700 mb-2">8.4 Some profile data may be indexed and shared with job boards or aggregators like Google Jobs to support visibility and recruitment potential.</p>
        <p className="text-gray-700 mb-2">8.5 We may share personal data with legal or enforcement authorities in cases involving fraud, criminal investigations, or where required to comply with applicable UK law.</p>
        <p className="text-gray-700 mb-2">8.6 Information may be disclosed to our insurers, solicitors, or professional advisers in connection with legal risk management or claims.</p>
        <p className="text-gray-700 mb-2">8.7 In the event of a sale, merger, or restructuring of FindMySecurity, we may transfer relevant user data to potential buyers or stakeholders under confidentiality terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. What happens to your payment information?</h2>
        <p className="text-gray-700 mb-2">9.1 Payment details are handled directly by our third-party payment providers (e.g., Stripe, PayPal, Apple Pay). FindMySecurity does not store card numbers or security codes. To safeguard against fraud, these payment providers may share certain information (e.g., billing address, email) with credit reference agencies or verification tools.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Do we transfer your data outside the UK?</h2>
        <p className="text-gray-700 mb-2">10.1 Some of our service providers (e.g., hosting, email platforms, analytics tools) operate in countries outside the UK, including the USA. We ensure that transfers comply with UK GDPR standards via approved mechanisms, such as Standard Contractual Clauses (SCCs) or recognised data protection frameworks.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. What are your rights under data protection law?</h2>
        <p className="text-gray-700 mb-2">11.1 You may exercise the following rights if the legal criteria are met:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Access your personal data held by us;</li>
          <li>Request corrections to inaccuracies in your data;</li>
          <li>Ask us to delete your data or restrict its use;</li>
          <li>Object to data processing in certain situations (e.g., direct marketing);</li>
          <li>Request data portability where applicable;</li>
          <li>Withdraw consent (e.g., unsubscribe from newsletters).</li>
        </ul>
        <p className="text-gray-700 mb-2 mt-2">11.2 You can exercise these rights by contacting support@findmysecurity.co.uk. We aim to respond within 30 days.</p>
        <p className="text-gray-700 mb-2">11.3 If you are dissatisfied with our handling of your data, you may file a complaint with the Information Commissioner's Office (ICO) at www.ico.org.uk.</p>
        <p className="text-gray-700 mb-2">11.4 For more information about your rights, visit the ICO's website: www.ico.org.uk.</p>
      </section>
    </div>
  );
};

export default PrivacyAndCookiesPolicy;