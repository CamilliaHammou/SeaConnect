import { useContext } from "react";
import Assemblies from "./Assemblies";
import Footer from "./Footer";
import Header from "./Header";
import { UserContext } from "../Context/UserContext";

const AssembliesPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <>
        <Header />
        <div className=" mx-auto max-w-[1200px]">
          <div className="bg-violet-700 my-6 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">No User Found</h2>
            <p className="text-lg">Log Into Your Account</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className=" mx-auto max-w-[1200px]">
      <Header />
      <div className="bg-blue-500 my-6 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Sea Management Assemblies</h2>
        <p className="text-lg">
         Welcome to the Sea Management Assemblies page. Here you can view all the assemblies created by the management.
        </p>
      </div>
      <Assemblies />
      <Footer />
    </div>
  );
};

export default AssembliesPage;
