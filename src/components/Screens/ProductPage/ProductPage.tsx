import styles from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carrusel } from "../../UI/Carrusel/Carrusel";
import { getDetalleProductoByIdHttp } from "../../../http/detalleProductoHttp";
import { getImagenesByDetalleProductoIdHttp } from "../../../http/imagenHttp";
import { useDetalleProducto } from "../../../hooks/useDetalleProducto";
import { detalleProductoStore } from "../../../store/detalleProductoStore";
import { useSearchParams } from "react-router-dom";
import type { IDetalleProducto } from "../../../types/IDetalleProducto";
import type { IImagen } from "../../../types/IImagen";
import { carritoStore } from "../../../store/carritoStore";
import Swal from "sweetalert2";
import { PantallaCarga } from "../PantallaCarga/PantallaCarga";

export const ProductPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tipoProductoParam = searchParams.get("tipoProducto") ?? "";
  const [detalleProducto, setDetalleProducto] =
    useState<IDetalleProducto | null>(null);
  const [imagenes, setImagenes] = useState<IImagen[]>([]);
  const { agregarProductoCarrito } = carritoStore();

  const addToCarrito = () => {
    if (detalleProducto) {
      agregarProductoCarrito(detalleProducto);
      Swal.fire({
        icon: "success",
        title: "¡Producto agregado!",
        text: `${detalleProducto.producto.nombre} se agregó al carrito.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const { getDetallesProductosHabilitados, filtrarDetalleProducto } =
    useDetalleProducto();
  const detalleProductoHabilitado = detalleProductoStore(
    (state) => state.detallesProductosHabilitados
  );
  const [productosSimilares, setProductosSimilares] = useState<
    IDetalleProducto[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("ID no proporcionado en la URL");
        return;
      }
      const detalle = await getDetalleProductoByIdHttp(id);
      if (detalle) {
        setDetalleProducto(detalle);

        const imagenesData = await getImagenesByDetalleProductoIdHttp(
          detalle.id!
        );
        if (imagenesData) {
          setImagenes(imagenesData);
        }

        const tipoProducto = detalle.producto.tipoProducto || tipoProductoParam;
        if (tipoProducto) {
          await getDetallesProductosHabilitados();
          filtrarDetalleProducto({ tipoProducto });
          if (detalleProductoHabilitado.length > 0) {
            const similares = getProductosSimilares(
              detalle,
              detalleProductoHabilitado
            );
            setProductosSimilares(similares);
          }
        }
      } else {
        console.error("Producto no encontrado para ID:", id);
      }
    };

    fetchData();
  }, [
    id,
    getDetallesProductosHabilitados,
    filtrarDetalleProducto,
    tipoProductoParam,
  ]);

  const getProductosSimilares = (
    producto: IDetalleProducto,
    todosProductos: IDetalleProducto[]
  ): IDetalleProducto[] => {
    const maxSimilares = 8;

    const similares = todosProductos.filter(
      (p) =>
        p.id !== producto.id &&
        p.producto.tipoProducto === producto.producto.tipoProducto
    );
    const uniqueSimilares = Array.from(new Set(similares.map((p) => p.id))).map(
      (id) => similares.find((p) => p.id === id)!
    );
    const shuffled = [...uniqueSimilares].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(maxSimilares, shuffled.length));
  };

  if (!detalleProducto) return <PantallaCarga />;

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
        <Carrusel productos={productosSimilares} variant="similares" />
      </div>
    </div>
  );
};
