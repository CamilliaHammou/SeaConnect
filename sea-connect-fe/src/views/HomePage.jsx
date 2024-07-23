import React, { useContext, useEffect } from "react";
import { Waves, Trash2, Fish, Users } from "lucide-react";
import FeatureItem from "../components/FeatureItem";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { UserContext } from "../Context/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const createCustomer = () => {
      if (!user) return;
      if (user.user.stripeId) return;

      const myHeaders = new Headers();
      myHeaders.append("authorization", user.token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: `${user.user.firstName}`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://185.216.27.140:3002/api/stripe/create-customer", requestOptions)
        .then((response) => {
          return;
        })
        .catch((error) => console.error(error));
    };
    createCustomer();
  }, [user]);

  return (
    <div className="bg-blue-50">
      <Header />
      <Hero />
      <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8">
        <FeatureItem
          className={"md:flex-row items-center"}
          heading={
            <div className="flex items-center space-x-2">
              <Waves className="w-8 h-8 text-blue-500" />
              <span>Our Ocean Protection Initiatives</span>
            </div>
          }
          text="Discover how we're taking action to protect our oceans and their biodiversity. Every effort counts in preserving this vital ecosystem."
          content={[
            <div className="flex items-center space-x-2">
              <Trash2 className="w-6 h-6 text-green-500" />
              <span>Beach and ocean floor clean-ups</span>
            </div>,
            <div className="flex items-center space-x-2">
              <Fish className="w-6 h-6 text-green-500" />
              <span>Marine species conservation programs</span>
            </div>,
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-green-500" />
              <span>Community education on plastic pollution</span>
            </div>
          ]}
          src="http://wallup.net/wp-content/uploads/2016/02/233516-sea-waves-water-nature.jpg"
        />
        
        <FeatureItem
          className={"md:flex-row-reverse items-center"}
          heading={
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span>Who We Are</span>
            </div>
          }
          text="Our team consists of ocean enthusiasts committed to making a difference in protecting and preserving our marine environments."
          content={[
            <div className="flex items-center space-x-2">
              <Fish className="w-6 h-6 text-green-500" />
              <span>Expert marine biologists</span>
            </div>,
            <div className="flex items-center space-x-2">
              <Waves className="w-6 h-6 text-green-500" />
              <span>Dedicated environmental activists</span>
            </div>,
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-green-500" />
              <span>Passionate ocean conservation volunteers</span>
            </div>
          ]}
          src="https://seashepherd.fr/wp-content/uploads/2022/04/association-de-defense-des-oceans-bateau.jpg"
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;