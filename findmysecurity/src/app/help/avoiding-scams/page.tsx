import React from 'react';

const ScamAvoidance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Avoiding Scams – Stay Vigilant on FindMySecurity</h1>

      <section className="mb-8">
        <p className="text-gray-700 mb-2">
          While the internet opens up incredible opportunities for connecting with professionals and clients, it can also attract a small number of individuals who aim to take advantage of others through scams. At FindMySecurity, we take the safety and trust of our members seriously and have measures in place to help you stay protected.
        </p>
        <p className="text-gray-700 mb-2">
          That said, we strongly encourage all users to remain vigilant. Most people are honest and trustworthy but unfortunately, not everyone is.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 10 Safety Tips for Security Professionals</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
          <li>
            <strong>Never accept a job from someone you've not met in person and be wary of third-party ‘Background Check’ requests</strong>
            <p className="text-gray-700 ml-4">
              Legitimate clients will want to meet you in person (or at minimum via video call) before offering any contract. One common scam involves an unknown individual offering a job, but requiring that you complete and pay for a "background check" via a suspicious link. The link is fraudulent, the background check is fake and your money, or worse, your card details, may be stolen. Never pay for checks requested by a party you don’t know and haven’t met.
            </p>
          </li>
          <li>
            <strong>Always arrange first meetings in safe, public locations</strong>
            <p className="text-gray-700 ml-4">
              For your safety and peace of mind, arrange to meet in a busy public venue such as a coffee shop, hotel lobby, or coworking space. Never agree to visit someone’s private premises for an initial meeting.
            </p>
          </li>
          <li>
            <strong>Never accept or send money before a contract has been agreed and work has begun</strong>
            <p className="text-gray-700 ml-4">
              Some scammers may offer to send you funds up front often via cheque or bank transfer to purchase items on their behalf. The payment may appear to clear initially, but can later bounce, leaving you out of pocket. Other scams involve clients requesting that you pay for checks or certifications in advance. Genuine employers will not ask you to transfer money to them or pay for services through third parties.
            </p>
          </li>
          <li>
            <strong>Avoid phone interviews from withheld or unknown numbers</strong>
            <p className="text-gray-700 ml-4">
              Initial phone interviews are common, but avoid engaging in conversations where the caller ID is hidden or withheld. Reputable clients will always be transparent about who they are and how they can be reached.
            </p>
          </li>
          <li>
            <strong>Always use FindMySecurity’s secure messaging system</strong>
            <p className="text-gray-700 ml-4">
              Our in-platform messaging system is monitored, encrypted, and helps protect your personal information. It creates a secure log of conversations, which is helpful in case of disputes or misconduct. Be cautious of individuals who push to move conversations to external apps like WhatsApp, Telegram, or personal emails prematurely.
            </p>
          </li>
          <li>
            <strong>Be cautious when advertising or engaging through external platforms</strong>
            <p className="text-gray-700 ml-4">
              FindMySecurity uses rigorous moderation and advanced security monitoring to keep users safe. We log profile views, restrict access to contact details, and monitor messaging activity. Many external websites do not offer the same level of protection and may expose you to higher scam risk.
            </p>
          </li>
          <li>
            <strong>If an offer sounds too good to be true, it usually is</strong>
            <p className="text-gray-700 ml-4">
              Extremely high pay, flexible terms without any vetting, or offers made without interviews should all raise red flags. Scammers often use unrealistic perks to lure you into giving up personal information or money.
            </p>
          </li>
          <li>
            <strong>Watch out for emotional manipulation or ‘sob stories’</strong>
            <p className="text-gray-700 ml-4">
              Scammers often fabricate emotional stories to gain your trust, such as sudden bereavement, urgent needs, or high-status roles (e.g. claiming to be surgeons, diplomats, or police officers). These tactics are designed to bypass your critical thinking and push you into taking action quickly. Stay professional and cautious.
            </p>
          </li>
          <li>
            <strong>Report anything suspicious immediately</strong>
            <p className="text-gray-700 ml-4">
              Our Safety & Compliance Team operates year-round to monitor the platform and investigate member concerns. If something feels off, whether it's a message, profile, or job listing, contact our team directly via the website.
            </p>
          </li>
          <li>
            <strong>Trust your instincts</strong>
            <p className="text-gray-700 ml-4">
              If something doesn’t feel right, it probably isn’t. Cease communication immediately and notify us. Your safety and peace of mind are our top priorities, and we’re here to help.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default ScamAvoidance;