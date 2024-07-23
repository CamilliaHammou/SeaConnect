import { useState, useRef, useEffect } from "react";

const Actions = ({
  showEditForm,
  showAddNumber,
  showUpdateEmail,
  deleteUser,
  showMemberShip,
  showContribution,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdown-button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div
          id="dropdown-menu"
          className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-button"
        >
          <div className="py-2 p-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                showEditForm();
              }}
              className=" block w-full text-left rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              Edit
            </button>
            <button
              className="w-full text-left block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                showAddNumber();
              }}
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="moon"
                width="18px"
                className="mr-2"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path>
              </svg>{" "} */}
              Add Number
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showUpdateEmail();
              }}
              className="w-full text-left block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              Update Email
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showMemberShip();
              }}
              className="w-full text-left block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              Membership Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showContribution();
              }}
              className="w-full text-left block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              Contribution Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteUser();
              }}
              className="w-full text-left block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-red-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              Delete User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actions;
