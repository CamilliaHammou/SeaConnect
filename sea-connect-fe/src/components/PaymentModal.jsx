import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState, useCallback } from "react";
import PaymentForm from "./AddPaymentCard";
import { UserContext } from "../Context/UserContext";
import CardDisplay from "./CardDisplay";
import Loader from "../adminComponents/Loader";
import Button from "../adminComponents/Button";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe("pk_test_51IYxO0BznYbWdfr10N1iNZNC6hiJU7IuOzrOrXeXXCjTGKUACyxBCX656BXxA9B9xIFpeeAPZfoPYp86IfUaurNf00y2SiNwoG");

const PaymentModal = ({ amount, type, onClose, onSuccess }) => {
  const { user } = useContext(UserContext);
  const [showLoader, setShowLoader] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardId, setCardId] = useState(cards[0] || null);

  const paymentSubmitHandler = (success) => {
    if (success) {
      getUserCardInfo();
      setShowCardForm(false);
    }
  };

  const getUserCardInfo = useCallback(async () => {
    setShowLoader(true);
    try {
      const formData = JSON.stringify({ customerId: user.user.stripeId });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://185.216.27.140:3002/api/stripe/get-card-info",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data: formData,
      };

      const { data } = await axios.request(config);
      setCards(data);
      setShowLoader(false);
    } catch (error) {
      setCards([]);
      console.log(error);
      setShowLoader(false);
    }
  }, [user.user.stripeId, user.token]);

  useEffect(() => {
    if (user) {
      getUserCardInfo();
    }
  }, [user, getUserCardInfo]);

  const handlePayment = async () => {
    if (!cardId) {
      toast.error("Select a card please");
      return;
    }
    setLoading(true);
    try {
      const readyForPayment = JSON.stringify({
        customerId: user.user.stripeId,
        amount: amount * 100, //on convertie en centimes au cas ou
      });

      const configForReadyForPayment = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://185.216.27.140:3002/api/stripe/ready-for-payment",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data: readyForPayment,
      };

      const { data: readyPayment } = await axios.request(configForReadyForPayment);

      if (readyPayment.paymentId) {
        const confirmPayment = JSON.stringify({
          paymentId: readyPayment.paymentId,
          paymentMethodId: cardId,
        });

        const configConfirmPayment = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://185.216.27.140:3002/api/stripe/confirm-and-make-payment",
          headers: {
            authorization: user.token,
            "Content-Type": "application/json",
          },
          data: confirmPayment,
        };

        const { data: paymentSuccess } = await axios.request(configConfirmPayment);

        if (paymentSuccess.paymentSuccess.status === "succeeded") {
          onSuccess(user);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Payment failed");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="antialiased overflow-y-auto fixed w-full h-full inset-0 z-30 bg-gray-100 text-gray-600 py-2 min-h-screen p-4">
      <div className="h-full">
        <div>
          <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-[1000px] mx-auto">
            <div className="bg-white pt-4 px-8 pb-6 rounded-b shadow-lg">
              {showLoader && <Loader />}
              <div className="flex items-center justify-between">
                <Button className="addNewCard" onClick={() => setShowCardForm(!showCardForm)}>
                  Add Card
                </Button>
                <button className="card-btn rounded-lg -mt-5" onClick={onClose}>
                  Close
                </button>
              </div>
              {showCardForm && (
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    paymentSubmitHandler={paymentSubmitHandler}
                    user={user}
                    setShowLoader={setShowLoader}
                    setShowCardForm={setShowCardForm}
                  />
                </Elements>
              )}
              <CardDisplay
                setCardId={setCardId}
                cardId={cardId}
                user={user}
                setShowLoader={setShowLoader}
                getCards={getUserCardInfo}
                cards={cards}
                setCards={setCards}
              />
              <div className="flex flex-col md:flex-row items-center justify-center space-x-4 md:space-x-8 space-y-4 md:space-y-0 w-full md:max-w-4xl mx-auto pl-6 mt-8">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Payment Type
                  </h2>
                  <p className="text-xl md:text-2xl font-medium text-gray-600">
                    {type.toUpperCase()}
                  </p>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Payment Amount
                  </h2>
                  <p className="text-xl md:text-2xl font-medium text-gray-600">
                    ${amount}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-4">
                  <button
                    onClick={handlePayment}
                    className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      "Pay"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentModal;
