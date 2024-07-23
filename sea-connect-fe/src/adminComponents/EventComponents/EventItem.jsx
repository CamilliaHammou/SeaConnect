import { format } from "date-fns";
import ActionsDropdown from "../ActionsDropdown";

const EventItem = ({ event, actions, showDetailsHandler }) => {
  return (
    <>
      <div
        onClick={() => showDetailsHandler(event)}
        v-for="(contact, key) in contacts"
        className="hover:bg-gray-200 cursor-pointer bg-white shadow flex p-5 items-center mb-5 rounded-lg"
      >
        <div className="w-1/2">
          <div className="flex items-center">
            <div className="ml-4">
              <span className="block text-gray-800">
                {event.organizerEmail}
              </span>
              {/* <span className="text-sm block text-gray-600"> contact.email</span> */}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {event.title}
          </span>
        </div>
        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            {format(event.eventDate, "yyyy-MM-dd")}
          </span>
        </div>
        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            <ActionsDropdown actions={actions} event={event} />
          </span>
        </div>
      </div>
    </>
  );
};

export default EventItem;
