"use client";

import React, { useEffect, useState } from "react";
import styles from "./News.module.css";
import { getNews } from "@/api/apiNews";

const News = () => {
  const [news, setNews] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const fetchNews = async (currentPage) => {
    try {
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === "All" ? null : selectedCategory,
      });
      setNews(response.news);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory]);

  return (
    <main className={styles.main}>
      {news.map((newsItem) => (
        <div key={newsItem.id} className={styles.item}>
          <div className={styles.titleImg}>
            <img
              src={newsItem.image}
              alt="."
              className={styles.image}
              onError={(event) => (event.target.style.display = "none")}
            />
          </div>

          <div className={styles.info}>
            <p className={styles.title}>{newsItem.title}</p>
            <p className={styles.description}>
              {newsItem.description.split(" ").slice(0, 18).join(" ") +
                (newsItem.description.split(" ").length > 18 ? "..." : "")}
            </p>

            <p className={styles.extra}>by {newsItem.author}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default News;
