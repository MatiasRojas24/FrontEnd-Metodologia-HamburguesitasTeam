import styles from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDetalleProductoByIdHttp } from "../../../http/detalleProductoHttp";
import { getImagenesByDetalleProductoIdHttp } from "../../../http/imagenHttp";

import type { IDetalleProducto } from "../../../types/IDetalleProducto";
import type { IImagen } from "../../../types/IImagen";
import { carritoStore } from "../../../store/carritoStore";
import Swal from "sweetalert2";

export const ProductPage = () => {
  const { id } = useParams();
  const [detalleProducto, setDetalleProducto] =
    useState<IDetalleProducto | null>(null);
  const [imagenes, setImagenes] = useState<IImagen[]>([]);
  const { agregarProductoCarrito } = carritoStore()


  

  const addToCarrito = () => {
  if (detalleProducto) {
    agregarProductoCarrito(detalleProducto);
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: `${detalleProducto.producto.nombre} se agregó al carrito.`,
      timer: 2000,
      showConfirmButton: false,
    });
  }
};

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const detalle = await getDetalleProductoByIdHttp(id);
      if (detalle) {
        setDetalleProducto(detalle);

        const imagenesData = await getImagenesByDetalleProductoIdHttp(
          detalle.id!
        );
        if (imagenesData) {
          setImagenes(imagenesData);
        }
      }
    };

    fetchData();
  }, [id]);

  if (!detalleProducto) return <p>Cargando producto...</p>;

  return (
    <div className={styles.productPageContainer}>
      <div className={styles.mainContentContainer}>
        <div className={styles.productImagesContainer}>
          {imagenes.length > 0 ? (
            imagenes.map((img) => (
              <img key={img.id} src={img.url} alt="Imagen producto" />
            ))
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </div>

        <div className={styles.productContainer}>
          {imagenes[0] && (
            <img src={imagenes[0].url} alt="Imagen principal del producto" />
          )}
        </div>

        <div className={styles.infoProductContainer}>
          <h1 style={{ fontFamily: "LatoBold" }}>
            {detalleProducto.producto.nombre}
          </h1>
          <br />
          <p>${detalleProducto.precioVenta}</p>
          <h4>
            Hasta 6x ${(detalleProducto.precioVenta / 6).toFixed(0)} sin interés
          </h4>

          <div className={styles.infoProductImagesContainer}>
            {imagenes.slice(0, 2).map((img) => (
              <img key={img.id} src={img.url} alt="Miniatura" />
            ))}
          </div>

          <h3>Seleccionar Talle</h3>
          <hr />

          <div className={styles.infoProductTalleContainer}>
            <p>{detalleProducto.talle.talle}</p>
          </div>

          <p>Color: {detalleProducto.color}</p>

          <button onClick={addToCarrito}>AGREGAR AL CARRITO</button>
        </div>
      </div>

      <div className={styles.productosSimilaresContainer}>
        <h2>Productos Similares</h2>
        <hr />
      </div>
    </div>
  );
};
