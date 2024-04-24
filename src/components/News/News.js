"use client";

import React, { useEffect, useState } from "react";
import styles from "./News.module.css";
import { getNews } from "@/api/apiNews";
import NewsList from "./NewsList";

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
      <NewsList news={news} />
    </main>
  );
};

export default News;
