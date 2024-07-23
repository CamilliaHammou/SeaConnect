import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../Context/UserContext";
import EventDetailsCard from "../adminComponents/EventComponents/EventDetailsCard";
import Footer from "../components/Footer";

const EventsPage = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState(null);

  const getAllActiveEvents = () => {
    if (!user) return;
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/event/", requestOptions)
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

  if (!user) {
    return (
      <>
        <Header />
        <div className=" mx-auto max-w-[1200px]">
          <div className="bg-blue-500 my-6 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">No User Found</h2>
            <p className="text-lg">Log Into Your Account</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <section>
      <Header />
      <div className=" mx-auto max-w-[1200px]">
        <div className="bg-blue-500 my-6 text-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Sea Management Events
          </h2>
          <p className="text-lg">
            We invite you to participate in our sea management events, where
            you'll learn about sustainable practices, marine conservation, and
            how to protect our oceans. Join us in making a difference!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {events && events.length ? (
            events.map((event) => (
              <EventDetailsCard event={event} key={event.id} isUserSide />
            ))
          ) : (
            <h2>No Events</h2>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default EventsPage;
