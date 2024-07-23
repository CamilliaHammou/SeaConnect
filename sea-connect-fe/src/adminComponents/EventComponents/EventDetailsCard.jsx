import { format } from "date-fns";
import React, { useState } from "react";
import PaymentModal from "../../components/PaymentModal";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, MapPin, DollarSign, User } from 'lucide-react';

const EventDetailsCard = ({ event, isUserSide = false }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const onSuccess = async (user) => {
    try {
      const data = JSON.stringify({
        eventId: event.id,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://185.216.27.140:3002/api/event/register",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data,
      };

      const response = await axios.request(config);
      console.log(response.data);
      if (response.data.success) {
        toast.success("Event Registration was successful");
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <article className="mb-8 max-w-[400px] mx-auto overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
            {!isUserSide && (
              <p className="text-sm text-gray-600 flex items-center">
                <User className="inline mr-2" size={16} />
                {event.organizerEmail}
              </p>
            )}
          </div>
          <div className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
            <Calendar className="inline mr-1" size={14} />
            {format(new Date(event.eventDate), "dd MMM yyyy")}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          {event.description || "All the event details here."}
        </p>
        
        <div className="flex items-center text-gray-700 mb-4">
          <MapPin className="mr-2" size={18} />
          <span>{event.location}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-700">
            <DollarSign className="mr-1" size={18} />
            <span className="text-lg font-bold">${event.registrationFee}</span>
          </div>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300"
          >
            Register Now
          </button>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          amount={event.registrationFee}
          type={"Event"}
          onSuccess={onSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </article>
  );
};

export default EventDetailsCard;