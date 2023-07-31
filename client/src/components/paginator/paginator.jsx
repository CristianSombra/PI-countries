import React from 'react';
import styles from './paginator.module.css';

function Paginator({ currentPage, setCurrentPage, max }) {
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, max));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={previousPage}
      >
        Anterior
      </button>
      <div className={styles.pageContainer}>
        Página {currentPage} de {max}
      </div>
      <button
        className={styles.button}
        disabled={currentPage === max}
        onClick={nextPage}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paginator;
