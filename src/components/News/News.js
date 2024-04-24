"use client";

import React, { useEffect, useState } from "react";
import styles from "./News.module.css";
import { getCategories, getNews } from "@/api/apiNews";
import NewsList from "./NewsList";

const Main = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [keywords, setKeywords] = useState("BTC");
  const totalPages = 10;
  const pageSizse = 10;

  const fetchNews = async (currentPage) => {
    try {
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSizse,
        category: selectedCategory === "All" ? null : selectedCategory,

      });
      console.log(news);
      setNews(response.news);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories([
        "All",
        "technology",
        "business",
        "finance",
        "economy",
        "politics",
      ]);
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchKeywords = async () => {
    try {
      const response = await getKeywords();
      setKeywords(["All", ...response.keywords]);
      console.log(keywords);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory]);

  return (
    <main className={styles.main}>
      <NewsList news={news} />
    </main>
  );
};

export default Main;
