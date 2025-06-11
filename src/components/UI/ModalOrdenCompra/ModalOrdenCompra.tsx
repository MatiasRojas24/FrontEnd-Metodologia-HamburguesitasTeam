import { useFormik } from "formik"
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { direccionStore } from "../../../store/direccionStore"
import { ordenCompraStore } from "../../../store/ordenCompraStore"
import { usuarioStore } from "../../../store/usuarioStore"
import { useDireccion } from "../../../hooks/useDireccion"
import { useEffect, type FC } from "react"
import type { IOrdenCompra } from "../../../types/IOrdenCompra";
import { createOrdenCompraHttp, updateOrdenCompraHttp } from "../../../http/ordenCompraHttp";
import styles from './ModalOrdenCompra.module.css'
import Swal from "sweetalert2";

type IPropsModalOrdenCompra = {
  isOpen: boolean;
  total: number;
  onClose: () => void;
  onOrdenCreada: () => void;
};

export const ModalOrdenCompra: FC<IPropsModalOrdenCompra> = ({isOpen,total, onClose, onOrdenCreada}) => {
  const ordenCompra = ordenCompraStore((state) => state.ordenCompraActiva);
  const usuario = usuarioStore((state) => state.usuarioLogeado);
  const direcciones = direccionStore((state) => state.direcciones);
  const { getDirecciones } = useDireccion();

  useEffect(() => {
    getDirecciones();
  }, []);

  const formik = useFormik({
    initialValues: {
      total,
      descuento: ordenCompra?.descuento ?? 0,
      fechaCompra: ordenCompra?.fechaCompra ?? new Date().toISOString().split("T")[0],
      direccionId: ordenCompra?.direccionEnvio?.id ?? "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      total: Yup.number().required("Requerido").min(0, "No puede ser negativo"),
      descuento: Yup.number().min(0, "No puede ser negativo"),
      fechaCompra: Yup.string().required("Requerido"),
      direccionId: Yup.string().required("Selecciona una dirección"),
    }),

      onSubmit: async (values) => {
      const direccionSeleccionada = direcciones.find(d => d.id === values.direccionId);

      const ordenAGuardar: IOrdenCompra = {
        id: ordenCompra?.id ?? uuidv4(),
        total: values.total,
        descuento: values.descuento,
        fechaCompra: values.fechaCompra,
        direccionEnvio: direccionSeleccionada,
        usuario: { id: usuario!.id },
        habilitado: true,
      };

      try {
        if (ordenCompra) {
          await updateOrdenCompraHttp(ordenAGuardar);
        } else {
          await createOrdenCompraHttp(ordenAGuardar);
        }

        ordenCompraStore.getState().setOrdenCompraActiva(ordenAGuardar);

        await Swal.fire({
          icon: 'success',
          title: 'Orden creada con éxito',
          confirmButtonText: 'Aceptar',
          timer: 2000
        });

        onOrdenCreada();
        onClose();
      } catch (error) {
        console.error("Error al crear la orden de compra", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la orden',
          text: 'Intente nuevamente',
        });
        }
        }
  })
  return (
    <div className={styles.backgroundBlur}>
      <div className={styles.modalContainer}>
        <h3>{ordenCompra ? "Editar" : "Crear"} Orden de Compra</h3>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Total</label>
            <input
              type="number"
              name="total"
              value={formik.values.total}
              readOnly
            />
            {formik.touched.total && formik.errors.total && (
              <div className={styles.error}>{formik.errors.total}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Descuento</label>
            <input
              type="number"
              name="descuento"
              value={formik.values.descuento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.descuento && formik.errors.descuento && (
              <div className={styles.error}>{formik.errors.descuento}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Fecha de compra</label>
            <input
              type="date"
              name="fechaCompra"
              value={formik.values.fechaCompra}
              readOnly
            />
            {formik.touched.fechaCompra && formik.errors.fechaCompra && (
              <div className={styles.error}>{formik.errors.fechaCompra}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Dirección de envío</label>
            <select
              name="direccionId"
              value={formik.values.direccionId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">. . .</option>
              {direcciones.map((direccion) => (
                <option key={direccion.id} value={direccion.id}>
                  {`${direccion.pais}, ${direccion.provincia}, ${direccion.localidad}`}
                </option>
              ))}
            </select>
            {formik.touched.direccionId && formik.errors.direccionId && (
              <div className={styles.error}>{formik.errors.direccionId}</div>
            )}
          </div>

          <div className={styles.buttons}>
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
    >
                      {ordenCompra ? "Actualizar" : "Crear"}
            </button>

            <button
              type="button" 
              className={styles.closeButton}
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

