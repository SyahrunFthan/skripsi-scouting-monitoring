import React, { useState } from "react";

const news = [
  {
    id: 1,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 2,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 3,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
  {
    id: 4,
    title: "News 1",
    subtitle: "News Subtitle",
    description: "This is the first news",
  },
];
const NewsComponents = () => {
  const [showNews, setShowNews] = useState(null);

  const handleShowNews = (index) => {
    setShowNews(showNews === index ? null : index);
  };
  return (
    <div
      id="news"
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/background.JPG')" }}
    >
      <div className="flex flex-col pt-[20%] md:pt-[7%] pb-[5%] w-full h-full text-white px-4">
        <h1 className="text-4xl font-bold max-w-[400px]">
          Seputar Pramuka Indonesia
        </h1>
        <p className="max-w-[100%] md:max-w-[50%]">
          Pramuka Indonesia Saat Ini Pramuka Indonesia, sebagai salah satu
          organisasi kepanduan terbesar di dunia, terus menjadi wadah
          pembentukan karakter generasi muda yang tangguh, berintegritas, dan
          cinta tanah air.
        </p>

        <div className="mt-10 flex flex-col items-start w-full h-full overflow-y-auto">
          <div className="flex flex-col w-full md:w-[70%] gap-2">
            {news.map((item, index) => {
              const isNews = showNews === index;
              return (
                <button
                  className="flex items-start justify-start gap-3 w-full md:w-[80%] px-6 py-2 bg-white rounded-md shadow-md md:py-3 border"
                  key={index}
                  onClick={() => handleShowNews(index)}
                >
                  <img
                    src="/assets/images/scout.png"
                    className="w-14 h-14"
                    alt=""
                  />

                  <div className="flex flex-col">
                    <h1 className="text-black font-semibold text-2xl">
                      Berita Nomor 1
                    </h1>
                    <h1 className="text-black text-lg text-start">Subtitle</h1>

                    {isNews && (
                      <div className="mt-2 flex flex-col">
                        <p className="text-black text-start">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Similique amet dolorum cumque odit
                          necessitatibus nemo voluptatum ea saepe blanditiis
                          sapiente.
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsComponents;
