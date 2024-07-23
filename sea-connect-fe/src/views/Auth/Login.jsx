import React, { useContext } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const authHandle = (values, formikHelpers, navigate, login) => {
  const { setSubmitting } = formikHelpers;

  const apiUrl = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        if (data.role.toLowerCase() === "user".toLowerCase()) {
          toast.success(data.message);
          login(data);
          navigate("/");
        } else if (data.role.toLowerCase() === "admin".toLowerCase()) {
          toast.success(data.message);
          login(data);
          navigate("/admin/members-management");
        }
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error(`${error.message}`);
    })
    .finally(() => {
      setSubmitting(false);
    });
};

const Login = ({ onSignupLinkClick }) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const onSubmit = (values, formikHelpers) => {
    authHandle(values, formikHelpers, navigate, login);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-lg font-semibold text-center">Welcome</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
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
                className="w-full bg-black hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-yellow-300"
              >
                Sign In
              </button>

              <div className="text-center mt-4">
                Don't have an account?
                <Link
                  to="/register"
                  onClick={onSignupLinkClick}
                  className="text-blue-500 hover:text-blue-800"
                >
                  Sign up here
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
