import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react';
import styles from './ModalImagenes.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useImagen } from '../../../hooks/useImagen';
import LoaderGlobal from '../LoaderGlobal/LoaderGlobal';
import type { IImagen } from '../../../types/IImagen';
import { detalleProductoStore } from '../../../store/detalleProductoStore';
import { imagenStore } from '../../../store/imagenStore';

interface IModalProp {
    setOpenModalImagenes: Dispatch<SetStateAction<boolean>>
}

export const ModalImagenes: FC<IModalProp> = ({ setOpenModalImagenes }) => {
    const [cargando, setCargando] = useState(false);
    const { createImagen } = useImagen();
    const detalleProductoActivo = detalleProductoStore((state) => state.detalleProductoActivo)
    const imagenes = imagenStore((state) => state.imagenesDetalle)
    const { getImagenesDetalle, deleteImagen } = useImagen()

    const handleGetImagenes = async () => {
        setCargando(true)
        await getImagenesDetalle(detalleProductoActivo!.id!)
        setCargando(false)
    }
    useEffect(() => {
        handleGetImagenes()
    }, [])
    useEffect(() => {
        handleGetImagenes()
    }, [imagenes])

    const handleDeleteImagen = async (idImagen: string) => {
        await deleteImagen(idImagen)
    }
    const formik = useFormik({
        initialValues: {
            id: '',
            file: null as File | null,
        },
        validationSchema: Yup.object({
            file: Yup.mixed().required('Se requiere una imagen'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!values.file) return;

            setCargando(true);
            const imagenValues: IImagen = {
                imagen: values.file,
                detalleProducto: detalleProductoActivo!
            }
            const success = await createImagen(imagenValues);
            if (success) {
                resetForm();
            }
            setCargando(false);
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (file) {
            formik.setFieldValue('file', file);
        }
    };

    useEffect(() => {
        if (formik.values.file) {
            formik.handleSubmit();
        }
    }, [formik.values.file]);

    return (
        <div className={styles.backgroundBlur}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <i className="bi bi-x" onClick={() => { setOpenModalImagenes(false) }}></i>
                </div>
                <div className={styles.modalBody}>
                    {imagenes.map((imagen) => (
                        <div className={styles.containerImg}>
                            <img
                                key={imagen.id}
                                className={styles.imgDetalle}
                                src={imagen.url}
                                alt='imagen detalle'
                                onClick={() => console.log(imagen)}
                            />
                            <div className={styles.hoverImg} onClick={() => handleDeleteImagen(imagen.id!)}>
                                <i className="bi bi-trash"></i>
                            </div>
                        </div>
                    ))}
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="file-upload" className={styles.customInputImagen}>
                            <i className="bi bi-plus-square"></i>
                        </label>
                        <input
                            id="file-upload"
                            name="file"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </form>
                    {cargando && <LoaderGlobal />}
                </div>
            </div>
        </div>
    );
};

