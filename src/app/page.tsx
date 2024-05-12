"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  imageURL: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Home() {
  const url = "https://clubwebdev-backend.vercel.app/api/news";
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5); 
  const [title, setTitle] = useState<string>(''); 

  useEffect(() => {
    getDataNews();
  }, [page, limit, title]);

  const getDataNews = async () => {
    try {
      const response = await fetch(`${url}?currentPage=${page}&limit=${limit}&title=${title}`);
      const dataNews = await response.json();
      setNews(dataNews.data); 
    } catch (error) {
      console.error("Error fetching news:");
    }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(parseInt(e.target.value));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <section className="py-12 font-poppins">
      <div className="flex justify-center gap-12">
      <div className="flex-col flex">
          <label htmlFor="inputPage" className="text-white font-poppins font-bold">Page : </label>
          <input
            type="number"
            id="inputPage"
            placeholder="ex: 10"
            onChange={handlePageChange}
            className="p-3 rounded-md bg-blue-100"
          />
        </div>
        <div className="flex-col flex">
          <label htmlFor="inputLimit" className="text-white font-bold">Limit : </label>
          <input
            type="number"
            id="inputLimit"
            placeholder="ex: 10"
            onChange={handleLimitChange}
            className="p-3 rounded-md bg-blue-100"
          />
        </div>
        <div className="flex-col flex">
          <label htmlFor="searchTitle" className="text-white font-bold">Title : </label>
          <input
            type="text"
            id="searchTitle"
            placeholder="ex: pemandangan"
            onChange={handleTitleChange}
            className="p-3 rounded-md  bg-blue-100"
          />
        </div>
        </div>
    <div className="relative m-6 sm:px-10 lg:mt-12 xl:px-28 md:px-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
      {news.map((item) => (
        <div key={item._id}>
           <div className="overflow-hidden bg-blue-100 rounded-xl">
            <Image
              src={item.imageURL}
              width={300}
              height={300}
              alt={item.title}
              className="w-full"
            />
          <div className="p-4 space-y-4">
          <div className="font-semibold">Title: {item.title}</div>
          <div>Content: {item.content}</div>
          <div>Author: {item.author}</div>
          </div>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
}
