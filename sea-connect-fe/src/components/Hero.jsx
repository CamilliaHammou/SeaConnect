import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello, welcome to the chatbot! How can I assist you?", isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [remainingQuestions, setRemainingQuestions] = useState([
    "What is SeaConnect?",
    "How can I help?",
    "What are your activities?",
  ]);

  const predefinedResponses = {
    "hello": "Hello! How can I assist you in understanding SeaConnect?",
    "hi": "Hello! How can I assist you in understanding SeaConnect?",
    "thanks": "You're welcome!",
    "thank you": "You're welcome!",
    "what is seaconnect": "SeaConnect is an organization dedicated to ocean protection. We work to preserve marine life and aquatic ecosystems.",
    "how can i help": "You can help by donating, participating in our beach clean-up events, or raising awareness about ocean protection.",
    "what are your activities": "Our main activities include marine research, public awareness campaigns, lobbying for ocean protection laws, and direct actions to clean the oceans.",
    "default": "Sorry, I don't have specific information on that topic. Could you rephrase your question or ask something else about SeaConnect?"
  };

  const handleQuestionClick = (question) => {
    const userMessage = { text: question, isUser: true };
    const botMessage = { text: getBotResponse(question), isUser: false };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setRemainingQuestions((prevQuestions) => prevQuestions.filter((q) => q !== question));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isUser: true };
    const botMessage = { text: getBotResponse(inputMessage), isUser: false };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);

    const lowercaseInput = inputMessage.toLowerCase();
    if (["hello", "hi"].includes(lowercaseInput)) {
      setRemainingQuestions([
        "What is SeaConnect?",
        "How can I help?",
        "What are your activities?",
      ]);
    }

    setInputMessage("");
  };

  const getBotResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    for (const [key, value] of Object.entries(predefinedResponses)) {
      if (lowercaseInput.includes(key)) {
        return value;
      }
    }
    return predefinedResponses.default;
  };

  const resetChat = () => {
    setMessages([{ text: "Hello, welcome to the chatbot! How can I assist you?", isUser: false }]);
    setRemainingQuestions([
      "What is SeaConnect?",
      "How can I help?",
      "What are your activities?",
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            resetChat();
          }}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition duration-300"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-72 h-96 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">SeaChat</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {(messages.length === 1 || (messages.length > 1 && !messages[messages.length - 1].isUser)) && remainingQuestions.length > 0 && (
              <div className="flex flex-col space-y-2">
                {remainingQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full p-2 border rounded"
            />
          </form>
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  return (
    <main className="px-2 py-32 bg-gradient-to-b from-blue-50 to-blue-100 md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block text-blue-800 xl:inline">SeaConnect: </span>
                <span className="block text-teal-600 xl:inline"></span>
              </h1>
              <p className="mx-auto text-base text-gray-700 sm:max-w-md lg:text-xl md:max-w-3xl">
                Protecting our oceans is not just our priority, it's our passion. Join us in preserving the blue heart of our planet.
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <a
                  href="#_"
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-blue-600 rounded-md sm:mb-0 hover:bg-blue-700 sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Take Action
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
                <a
                  href="#_"
                  className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-teal-50 hover:text-teal-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl hover:shadow-2xl transition duration-300 ease-in-out">
              <img
                src="https://i1.wp.com/seashepherd.org/wp-content/uploads/2021/03/201119_MILAGRO_VII_NR_Marine_59_DSC07690-1.jpg?resize=2048%2C1366&ssl=1"
                alt="Ocean conservation"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </main>
  );
};

export default Hero;
