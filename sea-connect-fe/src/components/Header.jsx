import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Header = () => {
  const { logout } = useContext(UserContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-800 to-teal-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 text-2xl font-black"
          >
            <span>SeaConnect<span className="text-blue-300">.</span></span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/WhoWeArePage" className="hover:text-blue-200">Who are we</Link>
            <Link to="/News" className="hover:text-blue-200">News</Link>
            {user && (
              <>
                <Link to="/events" className="hover:text-blue-200">Events</Link>
                <Link to="/membership-plans" className="hover:text-blue-200">Membership</Link>
                <Link to="/contributions" className="hover:text-blue-200">Contributions</Link>
                <Link to="/my-contributions" className="hover:text-blue-200">My Contributions</Link>
                <Link to="/votes" className="hover:text-blue-200">Votes</Link>
                <Link to="/assemblies" className="hover:text-blue-200">Assemblies</Link>
                <Link to="/user-files" className="hover:text-blue-200">Files</Link>
                <Link to="/user-notificattions" className="hover:text-blue-200">Notifications</Link>
                <Link to="/discussions" className="hover:text-blue-200">Discussions</Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-4 py-2 bg-white text-blue-800 rounded hover:bg-blue-100 transition duration-300"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-100 hover:text-white transition duration-300"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-800 rounded hover:bg-blue-100 transition duration-300"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;