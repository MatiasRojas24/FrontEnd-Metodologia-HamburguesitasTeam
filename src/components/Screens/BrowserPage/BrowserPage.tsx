import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./BrowserPage.module.css";
import { detalleProductoStore } from "../../../store/detalleProductoStore";
import { useDetalleProducto } from "../../../hooks/useDetalleProducto";
import { ProductCardBrowserPage } from "../../UI/ProductCardBrowserPage/ProductCardBrowserPage";
import { useSearchParams } from "react-router-dom";
import type { IFiltroDetalleProducto } from "../../../types/IFiltroDetalleProducto";

export const BrowserPage = () => {
  const [searchParams] = useSearchParams();
  const sexoParam = searchParams.get("sexo") ?? "";
  const [sexoSeleccionado, setSexoSeleccionado] = useState<string | null>(null);
  const tipoProductoParam = searchParams.get("tipoProducto") ?? "";

  const [minPrecioSeleccionado, setMinPrecioSeleccionado] = useState<number | null>(null);
  const [maxPrecioSeleccionado, setMaxPrecioSeleccionado] = useState<number | null>(null);


  const mapTipoToCategoria: Record<string, string> = {
    REMERA: "ROPA",
    PANTALON: "ROPA",
    CAMPERA: "ROPA",
    ZAPATILLA: "CALZADO",
  };

  const categoria = mapTipoToCategoria[tipoProductoParam] || tipoProductoParam;

  const [talleSeleccionado, setTalleSeleccionado] = useState<number | string | null>(null);

  const detalleProductoHabilitado = detalleProductoStore(
    (state) => state.detallesProductosHabilitados
  );

  const [filtro, setFiltro] = useState<IFiltroDetalleProducto>({});
  const { filtrarDetalleProducto } = useDetalleProducto();

  const actualizarFiltro = (nuevoFiltro: Partial<IFiltroDetalleProducto>) => {
    const filtroActualizado = { ...filtro, ...nuevoFiltro };
    console.log("Filtro actualizado:", filtroActualizado);
    setFiltro(filtroActualizado);
    filtrarDetalleProducto(filtroActualizado);
  };

  useEffect(() => {
    const nuevoFiltro: Partial<IFiltroDetalleProducto> = {};

    if (tipoProductoParam) {
      nuevoFiltro.tipoProducto = tipoProductoParam;
    }

    if (sexoParam) {
      nuevoFiltro.sexo = sexoParam;
    }
    if (sexoParam) {
    nuevoFiltro.sexo = sexoParam;
      setSexoSeleccionado(sexoParam); 
  }

    if (Object.keys(nuevoFiltro).length > 0) {
      actualizarFiltro(nuevoFiltro);
    } else {
      filtrarDetalleProducto({});
    }
  }, [tipoProductoParam]);

  const handleSexoChange = (e: ChangeEvent<HTMLInputElement>) => {
  const nuevoSexo = e.target.value;
  setSexoSeleccionado(nuevoSexo);
  actualizarFiltro({ sexo: nuevoSexo });
};

  const handleTipoProductoChange = (e: ChangeEvent<HTMLInputElement>) => {
    actualizarFiltro({ tipoProducto: e.target.value });
  };

  const handleMinPrecioChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const valor = parseInt(e.target.value);
    const nuevoValor = valor === 0 ? null : valor;
    setMinPrecioSeleccionado(nuevoValor);
    actualizarFiltro({ minPrecio: nuevoValor });
  };

  const handleMaxPrecioChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const valor = parseInt(e.target.value);
    const nuevoValor = valor === 0 ? null : valor;
    setMaxPrecioSeleccionado(nuevoValor);
    actualizarFiltro({ maxPrecio: nuevoValor });
  };

const handleTalleClick = (talle: number | string) => {
  const detalleProduct = detalleProductoHabilitado.find(
    (detalle) => detalle.talle.talle === talle.toString()
  );

  if (!detalleProduct) {
    actualizarFiltro({ idTalle: "" });
    setTalleSeleccionado(null);
    return;
  }

  if (filtro.idTalle === detalleProduct.talle.id) {
    actualizarFiltro({ idTalle: "" });
    setTalleSeleccionado(null);
  } else {
    actualizarFiltro({ idTalle: detalleProduct.talle.id });
    setTalleSeleccionado(talle);
  }
};
  

  return (
    <div className={styles.pageContainer}>
      <div className={styles.encabezado}>
        <h1>{categoria}</h1>
      </div>
      <div className={styles.contenidoFiltros}>
        <div className={styles.filtros}>
          <h3>Filtrar por</h3>
          <button
              className={styles.resetButton}
              onClick={() => {
                setSexoSeleccionado(null);
                setTalleSeleccionado(null);
                setMinPrecioSeleccionado(null);
                setMaxPrecioSeleccionado(null);
                setFiltro({});
                filtrarDetalleProducto({});
              }}
            >
              Todos los productos
            </button>
          <h4>Genero</h4>
          <div className={styles.inputsSexo}>
            <input
              type="radio"
              name="genero"
              checked={sexoSeleccionado === "HOMBRE"}
              value="HOMBRE"
              onChange={handleSexoChange}
            />{" "}
            Hombre
            <br />
            <input
              type="radio"
              name="genero"
              checked={sexoSeleccionado === "MUJER"}
              value="MUJER"
              onChange={handleSexoChange}
            />{" "}
            Mujer
            <br />
            <input
              type="radio"
              name="genero"
              checked={sexoSeleccionado === "UNISEX"}
              value="UNISEX"
              onChange={handleSexoChange}
            />{" "}
            Unisex
          </div>

          <h4>Precio</h4>
          <div className={styles.containerSelect}>
            <p>Precio mínimo</p>
            <select onChange={handleMinPrecioChange} value={minPrecioSeleccionado ?? 0}>
              <option value="0">0</option>
              <option value="50000">50.000</option>
              <option value="100000">100.000</option>
              <option value="150000">150.000</option>
              <option value="200000">200.000</option>
              <option value="250000">250.000</option>
              <option value="300000">300.000</option>
              <option value="350000">350.000</option>
              <option value="400000">400.000</option>
              <option value="450000">450.000</option>
              <option value="500000">500.000</option>
              <option value="600000">600.000</option>
              <option value="700000">700.000</option>
            </select>

            <p>Precio máximo</p>
            <select onChange={handleMaxPrecioChange} value={maxPrecioSeleccionado ?? 0}>
              <option value="0">0</option>
              <option value="50000">50.000</option>
              <option value="100000">100.000</option>
              <option value="150000">150.000</option>
              <option value="200000">200.000</option>
              <option value="250000">250.000</option>
              <option value="300000">300.000</option>
              <option value="350000">350.000</option>
              <option value="400000">400.000</option>
              <option value="450000">450.000</option>
              <option value="500000">500.000</option>
              <option value="600000">600.000</option>
              <option value="700000">700.000</option>
            </select>
          </div>

          <h4>Talle</h4>
          <div className={styles.buttons}>
            {[
              29,
              30,
              31,
              32,
              33,
              34,
              35,
              36,
              37,
              38,
              39,
              40,
              41,
              42,
              43,
              44,
              45,
              46,
              47,
              "S",
              "M",
              "L",
              "XL",
              "XXL",
            ].map((talle) => (
              <button
                key={talle}
                onClick={() => handleTalleClick(talle)}
                className={`${styles.talleButton} ${
                  talleSeleccionado === talle ? styles.talleButtonActive : ""
                }`}
              >
                {talle}
              </button>
            ))}
          </div>

          <h4>Tipo Producto</h4>
          <div className={styles.inputsRopa}>
            <input
              type="radio"
              name="tipoProducto"
              value="ZAPATILLA"
              onChange={handleTipoProductoChange}
            />{" "}
            Zapatilla
            <br />
            <input
              type="radio"
              name="tipoProducto"
              value="REMERA"
              onChange={handleTipoProductoChange}
            />{" "}
            Remera
            <br />
            <input
              type="radio"
              name="tipoProducto"
              value="PANTALON"
              onChange={handleTipoProductoChange}
            />{" "}
            Pantalon
            <br />
            <input
              type="radio"
              name="tipoProducto"
              value="CAMPERA"
              onChange={handleTipoProductoChange}
            />{" "}
            Campera
          </div>
        </div>

        <div className={styles.containerProductos}>
          {detalleProductoHabilitado.length > 0 ? (
            detalleProductoHabilitado.map((el) => (
              <ProductCardBrowserPage
                key={el.id}
                detalleProductoHabilitado={el}
              />
            ))
          ) : (
            <p>No hay productos</p>
          )}
        </div>
      </div>
    </div>
  );
};
