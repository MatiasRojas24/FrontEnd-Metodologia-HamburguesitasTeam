import { type FC, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./LoaderGlobal.module.css";

const LoaderGlobal: FC = () => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.loaderOverlay}>
            <div className={styles.spinner}></div>
        </div>,
        document.body
    );
};

export default LoaderGlobal;