import React from "react";
import { Users, Fish, Waves, Award } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureItem from "../components/FeatureItem";

const WhoWeArePage = () => {
  return (
    <div className="bg-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Who We Are
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            We are a dedicated team of ocean enthusiasts committed to protecting and preserving our marine environments.
          </p>
        </div>

        <div className="mt-20 space-y-16">
          <FeatureItem
            className={"md:flex-row items-center"}
            heading={
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <span>Our Team</span>
              </div>
            }
            text="Our diverse team brings together expertise from various fields, united by a passion for ocean conservation."
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
            src="https://static.seashepherdglobal.org/media/filer_public/6c/c3/6cc3ba58-57ec-4872-8d4e-6d7ad735d055/landing-bg-01.jpg"
          />

          <FeatureItem
            className={"md:flex-row-reverse items-center"}
            heading={
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-blue-500" />
                <span>Our Mission</span>
              </div>
            }
            text="We are driven by a clear mission to protect our oceans and inspire others to join our cause."
            content={[
              <div className="flex items-center space-x-2">
                <Waves className="w-6 h-6 text-green-500" />
                <span>Preserve marine biodiversity</span>
              </div>,
              <div className="flex items-center space-x-2">
                <Fish className="w-6 h-6 text-green-500" />
                <span>Combat ocean pollution</span>
              </div>,
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-green-500" />
                <span>Educate and inspire communities</span>
              </div>
            ]}
            src="https://www.seashepherdglobal.org/media/filer_public_thumbnails/filer_public/3d/db/3ddba19d-7c60-4966-8c0e-8255f320a709/180102_omiv_jp_pulling_net_on_the_bow-29-1600.jpg__900x450_q85_crop_subsampling-2.jpg"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WhoWeArePage;