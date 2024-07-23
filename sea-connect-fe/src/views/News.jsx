import React from "react";
import { Calendar, Globe} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NewsItem = ({ title, date, category, image, summary }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img className="w-full h-48 object-cover" src={image} alt={title} />
    <div className="p-6">
      <div className="flex items-center mb-2">
        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{summary}</p>
      <div className="flex items-center">
        <Globe className="w-4 h-4 mr-2 text-blue-500" />
        <span className="text-sm text-blue-500">{category}</span>
      </div>
    </div>
  </div>
);

const NewsPage = () => {
  const newsItems = [
    {
      title: "Major Ocean Cleanup Initiative Launched",
      date: "June 15, 2024",
      category: "Conservation",
      image: "https://awesomeocean.com/wp-content/uploads/2017/11/sea-shepherd-vessel-steve-irwin-heads-out-to-intercept-japanese-whalers.jpg",
      summary: "A new global initiative aims to remove 90% of floating ocean plastic by 2040."
    },
    {
      title: "Rare Marine Species Discovered in Pacific",
      date: "May 28, 2024",
      category: "Marine Biology",
      image: "http://upload.wikimedia.org/wikipedia/commons/8/86/Sea_Shepherd_Sam_Simon_PB.JPG",
      summary: "Scientists have identified a previously unknown species of deep-sea fish, shedding new light on ocean biodiversity."
    },
    {
      title: "Coral Reef Restoration Project Shows Promise",
      date: "April 10, 2024",
      category: "Ecosystem Restoration",
      image: "https://www.seashepherdglobal.org/media/filer_public_thumbnails/filer_public/57/78/5778a25d-70c3-4bb7-bb56-d97d916778f2/141205-sa-bb-deck-crew-group-shots-8348.jpg__900x450_q85_crop_subsampling-2.jpg",
      summary: "A innovative coral transplantation technique has successfully revived a damaged reef system in the Caribbean."
    }
  ];

  return (
    <div className="bg-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Ocean Conservation News
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Stay informed about the latest developments in ocean conservation and marine biology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsItem key={index} {...item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;