import React from 'react';
import styles from './NewsItem.module.css';

const NewsItem = ({ item }) => {
  return (
    <li className={styles.item}>
      <div className={styles.titleImg}>
        <img src={item.image} alt='.' className={styles.image}  onError={(event) => event.target.style.display = 'none'}/>
      </div>

      <div className={styles.info}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.extra}>by {item.author}</p>
        <p className={styles.extra}>{new Date(item.published).toLocaleString()}</p>
      </div>
    </li>
  );
};

export default NewsItem;
