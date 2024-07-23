const FeatureItem = ({ heading, text, content, src, className }) => {
  return (
    <div
      className={`box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16  ${className}`}
    >
      <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
        <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
          {heading}
        </h2>
        <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
          {text}
        </p>
        <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
          {content.map((item, index) => (
            <li
              key={index}
              className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-blue-300 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
        <img src={src} alt="img" className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32" />
      </div>
    </div>
  );
};

export default FeatureItem;
