import { useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Button from "../adminComponents/Button";

const PaymentForm = ({
  user,
  paymentSubmitHandler,
  setShowLoader,
  setShowCardForm,
}) => {
  const [paymentError, setPaymentError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Element is not loaded yet");
      return;
    }

    try {
      setShowLoader(true);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };

      // const { data } = await axios.post(
      //   "http://localhost:3002/api/stripe/create-setup-intent",
      //   {
      //     customerId: user.user.stripeId,
      //   },
      //   config
      // );
      const formData = JSON.stringify({
        customerId: user.user.stripeId,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3002/api/stripe/create-setup-intent",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data: formData,
      };

      const { data } = await axios.request(config);

      if (!data.clientSecret) {
        setShowLoader(false);
        return;
      }

      try {
        const { setupIntent, error } = await stripe.confirmCardSetup(
          data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardNumberElement),
            },
          }
        );

        if (error) {
          setPaymentError(error.message);
          setShowLoader(false);
          return;
        }
        if (setupIntent && setupIntent.id) {
          paymentSubmitHandler(data.clientSecret);
        }
      } catch (error) {
        setPaymentError("Error processing payment");
        setShowLoader(false);
      }
    } catch (error) {
      setPaymentError("Error no customer found");
      setShowLoader(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripeForm space-y-4 mb-10">
      <div className="card-div ">
        <label className="block  font-medium mb-2">Card Number</label>
        <div className="card-input ">
          <CardNumberElement className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500" />
        </div>
      </div>
      <div className="card-div">
        <label className="block text-gray-700 font-medium mb-2">CVC</label>
        <div className="card-input">
          <CardCvcElement className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500" />
        </div>
      </div>
      <div className="card-div">
        <label className="block text-gray-700 font-medium mb-2">Expiry</label>
        <div className="card-input">
          <CardExpiryElement className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500" />
        </div>
      </div>
      {paymentError && (
        <div className="card-error text-red-500">{paymentError}</div>
      )}
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className={
            "paymentBtn bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
          }
        >
          Add Card
        </button>
        <button
          className={
            "card-btn bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
          }
          onClick={() => setShowCardForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
