import React from 'react';

interface SubscriptionProps {
  subscriptionDetails: {
    status: string;
    startDate: string;
    endDate: string;
    nextInvoiceAmount: string;
    stripeProductName: string;
    tierName: string;
  };
  paymentMethod: {
    card: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
    billing_details: {
      name: string;
      email: string;
      address: {
        country: string | null;
      };
    };
  };
}

const SubscriptionBox: React.FC<SubscriptionProps> = ({ subscriptionDetails, paymentMethod }) => {
  const {
    status,
    startDate,
    endDate,
    nextInvoiceAmount,
    stripeProductName,
    tierName
  } = subscriptionDetails;

  const {
    card,
    billing_details: { name, email, address }
  } = paymentMethod;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  // Theme classes based on tier
  const getThemeClasses = () => {
    if (tierName.toLowerCase() === 'standardp') {
      return {
        bg: 'bg-gradient-to-br from-zinc-100 to-zinc-300',
        text: 'text-black',
        border: 'border-zinc-400'
      };
    } else if (tierName.toLowerCase() === 'standard') {
      return {
        bg: 'bg-gradient-to-br from-yellow-100 to-yellow-400',
        text: 'text-yellow-900',
        border: 'border-yellow-500'
      };
    } else {
      return {
        bg: 'bg-black',
        text: 'text-white',
        border: 'border-zinc-700'
      };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className={`${theme.bg} ${theme.text} p-6 rounded-xl shadow-md border ${theme.border} max-w-xl mx-auto space-y-6`}>
      <h2 className="text-2xl font-semibold border-b pb-2">Subscription Details</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="opacity-70">Status</p>
          <p className="font-medium capitalize">{status}</p>
        </div>
        <div>
          <p className="opacity-70">Tier</p>
          <p className="font-medium">{tierName} ({stripeProductName})</p>
        </div>
        <div>
          <p className="opacity-70">Start Date</p>
          <p className="font-medium">{formatDate(startDate)}</p>
        </div>
        <div>
          <p className="opacity-70">End Date</p>
          <p className="font-medium">{formatDate(endDate)}</p>
        </div>
        <div>
          <p className="opacity-70">Next Invoice</p>
          <p className="font-medium">${nextInvoiceAmount}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold border-b pb-2 mt-4">Payment Method</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="opacity-70">Card</p>
          <p className="font-medium">{card.brand.toUpperCase()} •••• {card.last4}</p>
        </div>
        <div>
          <p className="opacity-70">Expires</p>
          <p className="font-medium">{card.exp_month}/{card.exp_year}</p>
        </div>
        <div>
          <p className="opacity-70">Cardholder</p>
          <p className="font-medium">{name || 'N/A'}</p>
        </div>
        <div>
          <p className="opacity-70">Email</p>
          <p className="font-medium">{email}</p>
        </div>
        <div>
          <p className="opacity-70">Country</p>
          <p className="font-medium">{address.country || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBox;
