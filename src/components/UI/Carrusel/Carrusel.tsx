import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import styles from "./Carrusel.module.css";
import type { IDetalleProducto } from "../../../types/IDetalleProducto";
import { ProductCardBrowserPage } from "../ProductCardBrowserPage/ProductCardBrowserPage";

interface CarruselProps {
  productos: IDetalleProducto[];
}

export const Carrusel: React.FC<CarruselProps> = ({ productos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4;

  // Duplicar productos si son menos que itemsPerView
  const productosExtendidos =
    productos.length < itemsPerView
      ? [...productos, ...productos, ...productos].slice(
          0,
          Math.max(itemsPerView, productos.length * 2)
        )
      : productos;

  const maxIndex = Math.max(0, productosExtendidos.length - itemsPerView);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current?.scrollBy({
        left: -carouselRef.current.offsetWidth / itemsPerView,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      carouselRef.current?.scrollBy({
        left: carouselRef.current.offsetWidth / itemsPerView,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.componentCarrusel}>
      <Button
        variant="outline-secondary"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={styles.navButton}
      >
        <i className="bi bi-caret-left-fill"></i>
      </Button>

      <div className={styles.carouselContainer}>
        <div ref={carouselRef} className={styles.carouselTrack}>
          {productosExtendidos.length > 0 ? (
            productosExtendidos.map((producto, index) => {
              const isLastVisible = index === currentIndex + itemsPerView - 1;

              return (
                <div
                  key={`${producto.id}-${index}`}
                  className={`${styles.carouselItem} ${
                    isLastVisible ? styles.lastVisibleItem : ""
                  }`}
                >
                  <ProductCardBrowserPage
                    detalleProductoHabilitado={producto}
                  />
                </div>
              );
            })
          ) : (
            <div className={styles.noProducts}>
              <p>No hay productos disponibles</p>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="outline-secondary"
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        className={styles.navButton}
      >
        <i className="bi bi-caret-right-fill"></i>
      </Button>
    </div>
  );
};
