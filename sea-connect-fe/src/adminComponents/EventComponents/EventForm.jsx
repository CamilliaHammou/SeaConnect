import { useContext, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";

const EventForm = ({ event, onClose, getAllEvents, isEditing = false }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(
    event ? (event.description ? event.description : "") : ""
  );
  const [eventDate, setEventDate] = useState(
    event ? event.eventDate : new Date()
  );
  const [eventDateFin, setEventDateFin] = useState(
    event ? event.eventDateFin : new Date() //Ajout de eventDateFin avec la valeur actuelle de l'événement si disponible
  );
  const [location, setLocation] = useState(event ? event.location : "");
  const [registrationFee, setRegistrationFee] = useState(
    event ? event.registrationFee : 0
  );

  const editSubmitHandler = () => {
    const formattedEventDate = new Date(eventDate).toISOString();
    const formattedEventDateFin = new Date(eventDateFin).toISOString();
    const formData = {
      title: title,
      description: description,
      eventDate: formattedEventDate,
      eventDateFin: formattedEventDateFin,
      location: location,
      registrationFee: Number(registrationFee),
    };

    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3002/api/event/updateEvent/${event.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success("Event Updated Successfully");
          getAllEvents();
          onClose();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating event");
      });
  };

  const submitHandler = () => {
    const formattedEventDate = new Date(eventDate).toISOString();
    const formattedEventDateFin = new Date(eventDateFin).toISOString();
    const formData = {
      title: title,
      description: description,
      eventDate: formattedEventDate,
      eventDateFin: formattedEventDateFin,
      location: location,
      registrationFee: Number(registrationFee),
    };

    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/event/createEvent", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success("Event Created Successfully");
          getAllEvents();
          onClose();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error creating event");
      });
  };

  return (
    <div className="fixed z-20 inset-0 bg-white">
      <div className="flex justify-center h-screen items-center ">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-md rounded px-4 py-4 pb-4 mb-4 form border"
          >
            <div className="mb-6">
              <h1 className="text-center text-2xl ">
                {isEditing ? "Edit Event" : "Create Event"}
              </h1>
            </div>
            <Input
              label={"Title"}
              name={"title"}
              type={"text"}
              id={"title"}
              placeholder={"Title"}
              value={title}
              setValue={setTitle}
            />

            <Input
              label={"Description"}
              name={"description"}
              type={"text"}
              id={"description"}
              placeholder={"Description"}
              value={description}
              setValue={setDescription}
            />

            <Input
              label={"Location"}
              name={"location"}
              type={"text"}
              id={"location"}
              placeholder={"Location"}
              value={location}
              setValue={setLocation}
            />

            <Input
              label={"Registration Fee"}
              name={"registrationFee"}
              type={"number"}
              id={"registrationFee"}
              placeholder={"Registration Fee"}
              value={registrationFee}
              setValue={setRegistrationFee}
            />

            <div className="mb-4">
              <label htmlFor="date-input">Select Event start date</label>
              <input
                className={`text-gray-700 rounded w-full px-4 py-2 border-2 border-slate-500 focus:border-blue-400 outline-none `}
                type="datetime-local"
                id="date-input"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date-end-input">Select Event end date</label>
              <input
                className={`text-gray-700 rounded w-full px-4 py-2 border-2 border-slate-500 focus:border-blue-400 outline-none `}
                type="datetime-local"
                id="date-end-input"
                value={eventDateFin}
                onChange={(e) => setEventDateFin(e.target.value)}
              />
            </div>

            <div className="my-6 flex items-center justify-between">
              <Button
                onClick={onClose}
                className={
                  "rounded-lg px-4 py-2 border-2 border-red-600 text-red-800 hover:bg-red-600 hover:text-red-100 duration-300"
                }
              >
                Close
              </Button>
              <Button
                onClick={isEditing ? editSubmitHandler : submitHandler}
                className={
                  "rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                }
              >
                {isEditing ? "Edit Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
