import { useEffect, useState } from "react";
import "../styles/cardDisplayStyles.css";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../adminComponents/Button";

const CardDisplay = ({
  user,
  setHaveCards,
  setShowLoader,
  setCardId,
  cardId,
  getCards,
  cards,
  setCards,
}) => {
  const deleteCard = async (paymentId) => {
    setShowLoader(true);
    try {
      const encryptedPaymentId = paymentId;

      const formData = JSON.stringify({
        paymentMethodId: paymentId,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3002/api/stripe/delete-user-card",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data: formData,
      };

      const { data } = await axios.request(config);
      if (data.paymentMethodDelete) {
        if (cards && cards.length) {
          //if there are other cards, update the paymentMethodId to the next card in the array
          const cardsWithoutDeleted = cards.filter(
            (card) => card.id !== encryptedPaymentId
          );
          setCards(cardsWithoutDeleted);
        }
        toast.success("Payment method deleted successfully!");
        setShowLoader(false);
      }
    } catch (error) {
      toast.error("Error deleting Payment method");
      setShowLoader(false);
      console.log(error);
    }
  };

  if (!cards) {
    return <div>NO CARDS</div>;
  }

  return cards?.map((cardInfo) => {
    return (
      <div
        className={`card-container-cc  
        ${cardId === cardInfo.id ? "selectedCard" : ""}`}
        key={cardInfo.id}
        onClick={() => setCardId(cardInfo.id)}
      >
        <div className="">
          <div className="card-flex-container">
            {/* <div className="">
              <div className="">Card</div>
              <div className="">{cardInfo.card.brand}</div>
            </div> */}
            <div className="">
              <div className="">
                <p>This account is billed to</p>
                <p className="card-info">
                  {cardInfo.card.brand} card ending in {cardInfo.card.last4}
                </p>
              </div>
            </div>
            <div className="expireNo_card">
              <div>Expires:</div>
              <div className="">
                {cardInfo.card.exp_month}/{cardInfo.card.exp_year}
              </div>
            </div>
            <button
              className={"card-btn"}
              onClick={() => deleteCard(cardInfo.id)}
            >
              Remove Card
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default CardDisplay;
