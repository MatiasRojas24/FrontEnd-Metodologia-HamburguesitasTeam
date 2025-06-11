import { useMemo, type FC } from 'react'
import type { IDireccion } from '../../../types/IDireccion'
import styles from './ModalDirection.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDireccion } from '../../../hooks/useDireccion'
import { direccionStore } from '../../../store/direccionStore'
import type { IUsuario } from '../../../types/IUsuario'
import { useUsuario } from '../../../hooks/useUsuario'

type IPropsModalDirection = {
    setIsModal: (state: boolean) => void
    direccionActiva: IDireccion | null
    usuarioLogeado: IUsuario | null
}

export const ModalDirection: FC<IPropsModalDirection> = ({ setIsModal, direccionActiva, usuarioLogeado }) => {
    // STORES
    const setDireccionActiva = direccionStore((state) => state.setDireccionActiva)


    // HOOKS
    const { updateDireccion } = useDireccion()
    const { addDireccionesToUsuario } = useUsuario()

    // Configuración de Formik
    const soloLetras = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,}$/;  //---> Expresion para el esquema de validacion yup (minimo de 3 caracteres solo alfabeticos con o sin tilde)

    const uniqueId = useMemo(() => direccionActiva?.id || crypto.randomUUID(), [direccionActiva]);

    const formik = useFormik({
        initialValues: {
            id: uniqueId,
            localidad: direccionActiva?.localidad || '',
            departamento: direccionActiva?.departamento || '',
            provincia: direccionActiva?.provincia || '',
            pais: direccionActiva?.pais || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            id: Yup.string(),
            localidad: Yup.string().matches(soloLetras, 'Minimo 3 letras, numeros no admitidos').required('Requerido'),
            departamento: Yup.string().matches(soloLetras, 'Minimo 3 letras, numeros no admitidos').required('Requerido'),
            provincia: Yup.string().matches(soloLetras, 'Minimo 3 letras, numeros no admitidos').required('Requerido'),
            pais: Yup.string().matches(soloLetras, 'Minimo 3 letras, numeros no admitidos').required('Requerido'),
        }),
        onSubmit: async (values, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
            setSubmitting(true)

            if (usuarioLogeado) {
                if (direccionActiva) {
                    const succes = await updateDireccion(values)

                    if (succes) {
                        setIsModal(false);
                        setDireccionActiva(null)
                    } else {
                        alert("No se lograron enviar los datos, corrígelos o intentalo mas tarde")
                    }
                } else {
                    const direccionesUsuario = (usuarioLogeado.direcciones || []).filter(d => d.habilitado===true); // --- > guardamos las direcciones previas a añadir la nueva por si a caso
                    const nuevasDireccionesUsuario = [...direccionesUsuario, values];

                    const succes = await addDireccionesToUsuario(nuevasDireccionesUsuario, usuarioLogeado?.id!)

                    if (succes) {
                        setIsModal(false);
                        setDireccionActiva(null);
                        setSubmitting(false);
                    } else {
                        alert("No se pudo crear la direccion, revisa lo datos o intentalo mas tarde");
                        setSubmitting(false);
                    }
                }
            }
        },
    });

    return (
        <form className={styles.modalOverlay} onSubmit={formik.handleSubmit}>
            <div className={styles.containerForm}>
                <section className={styles.headerOfForm}>
                    <h2>{direccionActiva ? "Editar Direccion" : "Agregar Direccion"}</h2>
                </section>
                <section className={styles.bodyOfForm}>
                    <article>
                        <p>Localidad</p>
                        <input
                            type="text"
                            name="localidad"
                            value={formik.values.localidad}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </article>
                    <article>
                        <p>Departamento</p>
                        <input
                            type="text"
                            name="departamento"
                            value={formik.values.departamento}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </article>
                    <article>
                        <p>Provincia</p>
                        <input
                            type="text"
                            name="provincia"
                            value={formik.values.provincia}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </article>
                    <article>
                        <p>Pais</p>
                        <input
                            type="text"
                            name="pais"
                            value={formik.values.pais}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </article>
                </section>
                <section className={styles.containerButtons}>
                    <button className={styles.cancelButton} disabled={formik.isSubmitting} onClick={() => setIsModal(false)}>Cancelar</button>
                    <button className={styles.acceptButton} disabled={formik.isSubmitting} type='submit'>Aceptar</button>
                </section>
            </div>
        </form>
    )
}
