import React, { useEffect, useState } from "react";
import type { FC } from "react";
import type { IDetalleProducto } from "../../../types/IDetalleProducto";
import { getImagenesByDetalleProductoIdHttp } from "../../../http/imagenHttp";
import type { IImagen } from "../../../types/IImagen";
import styles from "./ProductCardSimilares.module.css";

type Props = {
  detalleProducto: IDetalleProducto;
  onClick?: () => void;
};

export const ProductCardSimilares: FC<Props> = ({
  detalleProducto,
  onClick,
}) => {
  const [imagenes, setImagenes] = useState<IImagen[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getImagenesByDetalleProductoIdHttp(
        detalleProducto.id!
      );
      if (data) setImagenes(data);
    };
    fetchData();
  }, [detalleProducto.id]);

  return (
    <div className={styles.cardSimilares} onClick={onClick}>
      {imagenes[0] && <img src={imagenes[0].url} alt="Producto" />}
    </div>
  );
};
