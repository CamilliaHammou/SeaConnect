import { useState } from "react";
import EventItem from "./EventItem";
import { v4 as uuid } from "uuid";
import EventForm from "./EventForm";
import EventDetailsModal from "./EventDetails";
import { toast } from "react-toastify";

const EventsList = ({ events, getAllEvents, user }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [event, setEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const showDetailsHandler = (event) => {
    setEvent(event);
    setShowEventDetails(true);
  };

  const handleDeleteEvent = (evt) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://185.216.27.140:3002/api/event/deleteEvent/${evt.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success("Event Deleted");
          getAllEvents();
        }
      })
      .catch((error) => console.error(error));
  };

  const actions = [
    {
      id: uuid(),
      label: "Edit",
      action: (event) => {
        setEvent(event);
        setShowEditForm(true);
      },
    },
    {
      id: uuid(),
      label: "Delete",
      action: (event) => {
        handleDeleteEvent(event);
      },
    },
  ];
  const renderEvents = events.map((event) => (
    <EventItem
      key={event.id}
      event={event}
      actions={actions}
      showDetailsHandler={showDetailsHandler}
    />
  ));
  return (
    <>
      <div className="bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="py-5">
            <div className="flex items-center px-5 py-2">
              <span className="w-1/2">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Organizer Email
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Title
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Event Date
                </span>
              </span>

              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Actions
                </span>
              </span>
            </div>
            {renderEvents}
          </div>
        </div>
      </div>
      {showEditForm && (
        <EventForm
          getAllEvents={getAllEvents}
          event={event}
          isEditing
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showEventDetails && (
        <EventDetailsModal
          event={event}
          onClose={() => setShowEventDetails(false)}
        />
      )}
    </>
  );
};

export default EventsList;
