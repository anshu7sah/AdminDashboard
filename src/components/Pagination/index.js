import React from "react";
import styles from "./styles.module.scss";
import { useState } from "react";

const Pagination = ({ page, productsCount, resultPerPage }) => {
  const arrNum = Math.ceil(productsCount / resultPerPage) || 0;

  const numbers = [...Array(arrNum).keys()].map((x) => x + 1);
  const [currentPage, setCurrentPage] = useState(1);
  const prevHandler = () => {
    if (currentPage > 1) {
      page(currentPage - 1);
      setCurrentPage((p) => --p);
    }
  };
  const nextHandler = () => {
    if (currentPage < numbers.length) {
      page(currentPage + 1);
      setCurrentPage((p) => ++p);
    }
  };
  const numberHandler = (e) => {
    page(Number(e.target.innerHTML));
    setCurrentPage(Number(e.target.innerHTML));
  };
  return (
    <div className={styles.pagination}>
      <ul>
        <li>
          <button onClick={prevHandler}>{"<<"}</button>
        </li>
        <li>
          <button
            onClick={() => {
              page(1);
              setCurrentPage(1);
            }}
          >
            {"first"}
          </button>
        </li>
        {numbers.map((e) => (
          <li>
            <button
              key={e}
              className={`${currentPage === e ? styles.paginationActive : ""}`}
              onClick={numberHandler}
            >
              {e}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => {
              page(numbers.length);
              setCurrentPage(numbers.length);
            }}
          >
            {"last"}
          </button>
        </li>
        <li>
          <button onClick={nextHandler}>{">>"}</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
