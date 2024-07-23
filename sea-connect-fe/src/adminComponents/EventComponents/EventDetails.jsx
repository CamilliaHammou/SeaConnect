import Button from "../Button";
import EventDetailsCard from "./EventDetailsCard";

const EventDetailsModal = ({ event, onClose }) => {
  return (
    <div className="fixed z-20 inset-0 bg-white">
      <div className="max-w-96 mx-auto my-5 flex items-center justify-between">
        <h2>Event Details</h2>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <div className="flex  justify-center">
        <EventDetailsCard event={event} />
      </div>
    </div>
  );
};

export default EventDetailsModal;
