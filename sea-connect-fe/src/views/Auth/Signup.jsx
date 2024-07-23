import React, { useContext } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

const authHandle = (values, formikHelpers, navigate, login) => {
  const { setSubmitting } = formikHelpers;

  const apiUrl = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/register`;
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      console.log(data);
      if (data.success) {
        login(data);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      setSubmitting(false);
    });
};

const Signup = ({ onLoginLinkClick }) => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const onSubmit = (values, formikHelpers) => {
    authHandle(values, formikHelpers, navigate, login);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-lg font-semibold text-center">Sign Up</h1>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            }

            if (!values.firstName) {
              errors.firstName = "Required";
            }

            if (!values.lastName) {
              errors.lastName = "Required";
            }

            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 focus:border-indigo-300"
                />
                {errors.firstName && touched.firstName && (
                  <div className="text-sm text-red-600 mt-1">
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 focus:border-indigo-300"
                />
                {errors.lastName && touched.lastName && (
                  <div className="text-sm text-red-600 mt-1">
                    {errors.lastName}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 focus:border-indigo-300"
                />
                {errors.email && touched.email && (
                  <div className="text-sm text-red-600 mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 focus:border-indigo-300"
                />
                {errors.password && touched.password && (
                  <div className="text-sm text-red-600 mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>

              <div className="text-center mt-4">
                Already have an account?
                <Link
                  to="/"
                  onClick={onLoginLinkClick}
                  className="text-blue-500 hover:text-blue-800"
                >
                  Sign in here
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
