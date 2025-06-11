import { useEffect, useState } from "react";
import Header from "../../../assets/img/Header.png";
import ImagenRopa from "../../../assets/img/ImagenRopa.png";
import ImagenCalzado from "../../../assets/img/ImagenCalzado.png";
import styles from "./LandingPage.module.css";
import { Carrusel } from "../../UI/Carrusel/Carrusel";
import { useNavigate } from "react-router-dom";
import { useDetalleProducto } from "../../../hooks/useDetalleProducto";
import { detalleProductoStore } from "../../../store/detalleProductoStore";
import type { IDetalleProducto } from "../../../types/IDetalleProducto";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { getDetallesProductosHabilitados } = useDetalleProducto();
  const detalleProductoHabilitado = detalleProductoStore(
    (state) => state.detallesProductosHabilitados
  );
  const [productosCarrusel1, setProductosCarrusel1] = useState<
    IDetalleProducto[]
  >([]);
  const [productosCarrusel2, setProductosCarrusel2] = useState<
    IDetalleProducto[]
  >([]);
  const [productosCargados, setProductosCargados] = useState(false);

  const getRandomProducts = (
    productos: IDetalleProducto[],
    count: number
  ): IDetalleProducto[] => {
    if (!productos || productos.length === 0) return [];
    const shuffled = [...productos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, productos.length));
  };

  useEffect(() => {
    if (productosCargados) return;

    const fetchProductos = async () => {
      console.log("Cargando productos habilitados...");
      await getDetallesProductosHabilitados();
      console.log(
        "Productos habilitados recibidos:",
        detalleProductoHabilitado
      );
      if (detalleProductoHabilitado.length > 0) {
        const random1 = getRandomProducts(detalleProductoHabilitado, 8);
        setProductosCarrusel1(random1);
        const productosRestantes = detalleProductoHabilitado.filter(
          (p) => !random1.some((p1) => p1.id === p.id)
        );
        setProductosCarrusel2(getRandomProducts(productosRestantes, 8));
        setProductosCargados(true);
        console.log("Carrusel 1:", random1);
        console.log("Carrusel 2:", getRandomProducts(productosRestantes, 8));
      }
    };
    fetchProductos();
  }, [getDetallesProductosHabilitados, productosCargados]);

  useEffect(() => {
    console.log("detalleProductoHabilitado cambió:", detalleProductoHabilitado);
  }, [detalleProductoHabilitado]);

  const irARopa = () => {
    navigate("/browser-page?tipoProducto=ROPA");
  };

  const irACalzado = () => {
    navigate("/browser-page?tipoProducto=ZAPATILLA");
  };

  return (
    <div className={styles.landingPageContainer}>
      <img
        className={styles.landingPageLogoContainer}
        src={Header}
        alt="Header LandingPage"
      />

      <h1>Nuevo</h1>
      <hr />
      <Carrusel productos={productosCarrusel1} />

      <div className={styles.containerImages}>
        <div className={styles.imageWrapper} onClick={irARopa}>
          <img
            className={styles.landingPageImage}
            src={ImagenRopa}
            alt="Imagen de la categoria Ropa"
          />
          <span className={styles.imageText}>Ropa</span>
        </div>

        <div className={styles.imageWrapper} onClick={irACalzado}>
          <img
            className={styles.landingPageImage}
            src={ImagenCalzado}
            alt="Imagen de la categoria Calzado"
          />
          <span className={styles.imageText}>Calzado</span>
        </div>
      </div>

      <h1>Solo Futbol</h1>
      <hr />
      <Carrusel productos={productosCarrusel2} />
    </div>
  );
};
