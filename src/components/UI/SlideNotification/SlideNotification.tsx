import { useEffect, useState } from 'react';
import styles from './SlideNotification.module.css';

type SlideNotificationProps = {
    mensaje: string;
    duracion?: number; // milisegundos
};

export const SlideNotification = ({ mensaje, duracion = 3000 }: SlideNotificationProps) => {
    const [salida, setSalida] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer1 = setTimeout(() => setSalida(true), duracion); // inicia animación de salida
        const timer2 = setTimeout(() => setVisible(false), duracion + 500); // desmonta luego de la animación
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [duracion]);

    if (!visible) return null;

    return (
        <div className={`${styles.notification} ${salida ? styles.exit : ''}`}>
            {mensaje}
        </div>
    );
};

/* USO 
const [mensajeNotificacion, setMensajeNotificacion] = useState<string | null>(null);

useEffect(() => {
    if (!mensajeNotificacion) return;
    const timeout = setTimeout(() => {
        setMensajeNotificacion(null);
    }, 3500);
    return () => clearTimeout(timeout);
}, [mensajeNotificacion]);

{mensajeNotificacion && <SlideNotification mensaje={mensajeNotificacion} />}
*/