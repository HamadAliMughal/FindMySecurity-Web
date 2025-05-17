import { useCallback } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/Stripe";

interface Props {
  clientSecret: string;
}

const PaymentForm = ({ clientSecret }: Props) => {
  const fetchClientSecret = useCallback(async () => clientSecret, [clientSecret]);

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-start p-4">
      <div className="w-full max-w-4xl h-[90vh] overflow-auto">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <div className="w-full h-full">
            <EmbeddedCheckout />
          </div>
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default PaymentForm;
