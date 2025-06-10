import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "./Carrusel.module.css";
import type { IDetalleProducto } from "../../../types/IDetalleProducto";
import { ProductCardBrowserPage } from "../ProductCardBrowserPage/ProductCardBrowserPage";
import { useNavigate } from "react-router-dom";

interface CarruselProps {
  productos: IDetalleProducto[];
}

export const Carrusel: React.FC<CarruselProps> = ({ productos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const itemsPerView = 4;

  const productosExtendidos =
    productos.length < itemsPerView ? productos : productos;

  const maxIndex = Math.max(0, productosExtendidos.length - itemsPerView);

  useEffect(() => {
    setCurrentIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [productos]);

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

  const handleSelectProduct = (producto: IDetalleProducto) => {
    navigate(
      `/product-page/${producto.id}?tipoProducto=${producto.producto.tipoProducto}`
    );
  };

  return (
    <div className={styles.componentCarrusel}>
      <Button
        variant="outline-secondary"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={styles.navButton}
      >
        <i className="bi bi-caret-left-fill" style={{ color: "#1F1F1F" }}></i>
      </Button>

      <div className={styles.carouselContainer}>
        <div ref={carouselRef} className={styles.carouselTrack}>
          {productosExtendidos.length > 0 ? (
            <div className={styles.carouselInner}>
              {productosExtendidos.map((producto, index) => (
                <div
                  key={`${producto.id}-${index}`}
                  className={styles.carouselItem}
                  onClick={() => handleSelectProduct(producto)}
                >
                  <ProductCardBrowserPage
                    detalleProductoHabilitado={producto}
                  />
                </div>
              ))}
            </div>
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
        disabled={
          currentIndex >= maxIndex || productosExtendidos.length <= itemsPerView
        }
        className={styles.navButton}
      >
        <i className="bi bi-caret-right-fill" style={{ color: "#1F1F1F" }}></i>
      </Button>
    </div>
  );
};
