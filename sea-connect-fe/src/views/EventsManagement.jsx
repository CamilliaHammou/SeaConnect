import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import EventsList from "../adminComponents/EventComponents/EventsList";
import EventForm from "../adminComponents/EventComponents/EventForm";
import Loader from "../adminComponents/Loader";

const EventsManagement = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getAllActiveEvents = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/event/getAllEvents", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setEvents(result.data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllActiveEvents();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = events.filter(event => 
      event.organizerEmail.toLowerCase().includes(lowerCaseSearchTerm) ||
      event.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const showFormHandler = () => {
    setShowEventForm(true);
  };

  if (!events.length)
    return (
      <section className="w-[80%] ml-auto ">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Events Management</h2>
          <button
            onClick={showFormHandler}
            className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
          >
            Create Event
          </button>
        </div>
        <h2>No Events</h2>
        {showEventForm && (
          <EventForm
            getAllEvents={getAllActiveEvents}
            onClose={() => setShowEventForm(false)}
          />
        )}
      </section>
    );

  return (
    <section className="w-[80%] ml-auto ">
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <button
          onClick={showFormHandler}
          className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
        >
          Create Event
        </button>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/4 p-2 border-2 border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <EventsList
          events={filteredEvents}
          user={user}
          getAllEvents={getAllActiveEvents}
        />
      </div>
      {showEventForm && (
        <EventForm
          getAllEvents={getAllActiveEvents}
          onClose={() => setShowEventForm(false)}
        />
      )}
    </section>
  );
};

export default EventsManagement;
