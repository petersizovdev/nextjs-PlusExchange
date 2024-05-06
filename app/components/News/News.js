/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./News.module.css";
import { getNews } from "../../api/apiNews";

const News = () => {
  const [news, setNews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const fetchNews = async (currentPage) => {
    try {
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
      });
      setNews(response.news);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  return (
   
    <main className={styles.main}>
      {news.map((newsItem) => (
        <a href={newsItem.url} target="_blank" key={newsItem.id} className={styles.item}>
          <div className={styles.titleImg}>
            <img
              src={newsItem.image}
              alt=" "
              className={styles.image}
              onError={(event) => (event.target.style.display = "none")}
            />
          </div>

          <div className={styles.info}>
            <p className={styles.title}>
              {newsItem.title.split(" ").slice(0, 10).join(" ") +
                (newsItem.title.split(" ").length > 10 ? "..." : "")}
            </p>
            <p className={styles.description}>
              {newsItem.description.split(" ").slice(0, 17).join(" ") +
                (newsItem.description.split(" ").length > 17 ? "..." : "")}
            </p>

            <a href={newsItem.url} className={styles.extra}>by {newsItem.author}</a>
          </div>
        </a>
      ))}
    </main>
  );
};

export default News;
