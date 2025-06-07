import React, { useEffect, useState, type FC } from "react";
import styles from "./ProductCardBroserPage.module.css";
import type { IDetalleProducto } from "../../../types/IDetalleProducto";
import { getImagenesByDetalleProductoIdHttp } from "../../../http/imagenHttp";
import type { IImagen } from "../../../types/IImagen";
import { useNavigate } from "react-router-dom";

type IPropsProductBrowserPageCard = {
  detalleProductoHabilitado: IDetalleProducto;
};

export const ProductCardBrowserPage: FC<IPropsProductBrowserPageCard> = ({
  detalleProductoHabilitado,
}) => {
  const [imagenes, setImagenes] = useState<IImagen[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImagenes = async () => {
      if (detalleProductoHabilitado?.id) {
        const data = await getImagenesByDetalleProductoIdHttp(
          detalleProductoHabilitado.id
        );
        if (data) {
          setImagenes(data);
        }
      }
    };

    fetchImagenes();
  }, [detalleProductoHabilitado]);

  const handleClick = () => {
    navigate(`/product/${detalleProductoHabilitado.id}`);
  };

  return (
    <div
      className={styles.cardContainer}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.cardImage}>
        {imagenes.length > 0 && (
          <div className={styles.containerImg}>
            <img
              className={styles.imgDetalle}
              src={imagenes[0].url}
              alt="imagen detalle"
            />
          </div>
        )}
      </div>

      <div className={styles.cardInfo}>
        <p className={styles.letraSexo}>
          {detalleProductoHabilitado.producto.sexo}
        </p>
        <p className={styles.letraNombre}>
          {detalleProductoHabilitado.producto.nombre}
        </p>
        <p className={styles.letraPrecio}>
          ${detalleProductoHabilitado.precioVenta}
        </p>
      </div>
    </div>
  );
};
