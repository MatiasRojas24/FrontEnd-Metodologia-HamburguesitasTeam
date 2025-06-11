
import { useEffect, useState } from 'react';
import { carritoStore } from '../../../store/carritoStore';
import styles from './CarritoPage.module.css'
import { getImagenesByDetalleProductoIdHttp } from '../../../http/imagenHttp';
import { ModalOrdenCompra } from '../../UI/ModalOrdenCompra/ModalOrdenCompra';
import { ModalCrearOrdenCompraDetalle } from '../../UI/ModalCrearOrdenCompraDetalle/ModalCrearOrdenCompraDetalle';


export const CarritoPage = () => {
    const carrito = carritoStore((state) => state.carrito);
    const eliminarProductoCarrito = carritoStore((state) => state.eliminarProductoCarrito);

    const [ordenCreada, setOrdenCreada] = useState(false);
    const [modalOrdenCompraDetalleOpen, setModalOrdenCompraDetalleOpen] = useState<boolean>(false);

    const total = carrito.reduce((acc, prod) => acc + prod.precioVenta * prod.cantidad, 0);

    const [imagenesPorProducto, setImagenesPorProducto] = useState<Record<string, string>>({});
    
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleOpenModal = () =>{
        setModalOpen(true)
    }
    

    useEffect(() => {
        const fetchImagenes = async () => {
        const nuevasImagenes: Record<string, string> = {};
        for (const producto of carrito) {
        if (producto.id && !imagenesPorProducto[producto.id]) {
            const imagenes = await getImagenesByDetalleProductoIdHttp(producto.id);
            if (imagenes && imagenes.length > 0) {
                nuevasImagenes[producto.id] = imagenes[0].url!;
            }
        }
    }
        setImagenesPorProducto((prev) => ({ ...prev, ...nuevasImagenes }));
        };

        fetchImagenes();
    }, [carrito]);
    return (
        <div className={styles.pageContainer}>
    <div className={styles.headerContainer}>
        <h1 className={styles.tituloCarrito}>TU CARRITO</h1>
    </div>

    <div className={styles.mainContainer}>
        
        <div className={styles.containerProductos}>
        {carrito.map((producto) => (
        <div key={producto.id} className={styles.cardCarrito}>
            <img
                src={imagenesPorProducto[producto.id!]}
                alt="Producto"
                className={styles.imgProducto}
            />

            <div className={styles.infoProducto}>
                <h3>{producto.producto.nombre}</h3>
                <p>Color {producto.color}</p>
                <p>Talle: {producto.talle.talle}</p>
                <p>Cantidad: {producto.cantidad}</p>
            </div>

            <div className={styles.precioYEliminar}>
                <p className={styles.precio}>${producto.precioVenta.toFixed(3)}</p>
                <button className={styles.buttonEliminar} onClick={() => eliminarProductoCarrito(producto.id!)}>Eliminar</button>
            </div>
        </div>
        ))}
    </div>


        <div className={styles.containerResumen}>
            <h2>RESUMEN</h2>
            <hr />
            <div className={styles.lineaResumen}>
                <p>{carrito.length} Producto{carrito.length !== 1 && 's'}</p>
                <p>${carrito.reduce((acc, prod) => acc + prod.precioVenta * prod.cantidad, 0).toFixed(3)}</p>
            </div>
            <div className={styles.lineaResumen}>
        <p>Entrega</p>
        <p>Gratis</p>
        </div>
        <hr />
        <div className={styles.lineaResumen}>
            <strong>Total</strong>
            <strong>
            ${carrito.reduce((acc, prod) => acc + prod.precioVenta * prod.cantidad, 0).toFixed(3)}
            </strong>
        </div>

        <button className={styles.buttonPagar} onClick={handleOpenModal} disabled={carrito.length === 0}    >
            Crear orden de compra
        </button>
        {ordenCreada && (
            <button
                className={styles.buttonPagar}
                onClick={() => setModalOrdenCompraDetalleOpen(true)}
                >
                Pagar
                </button>
)}
        
        <div className={styles.pagos}>
        
        </div>
        </div>
    </div>
    {modalOpen && (
        <ModalOrdenCompra
            isOpen={modalOpen}
            total={total}
            onClose={() => setModalOpen(false)}
            onOrdenCreada={() => setOrdenCreada(true)}
        />
        )}
    {modalOrdenCompraDetalleOpen && (
        <ModalCrearOrdenCompraDetalle
            isOpen={modalOrdenCompraDetalleOpen}
            onClose={() => setModalOrdenCompraDetalleOpen(false)}
        />
    )}
    
</div>
        
    )}
