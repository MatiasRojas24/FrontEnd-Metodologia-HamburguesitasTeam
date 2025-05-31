import styles from './Register.module.css'
import Logo from "../../../assets/img/Logo.png";
import imagenRegister from '../../../assets/img/imagenRegister.jpg'
import { FormRegister } from '../../UI/FormRegister/FormRegister';
import { navigateTo } from '../../../routes/navigation';


export const Register = () => {
    return (
        <div className={styles.containerPage}>
            <div className={styles.registerSegment}>
                <div className={styles.logoContainer}>
                    <img
                        onClick={() => navigateTo('/home')}
                        src={Logo}
                        alt="Logo de SPORTWEAR"
                    />
                </div>
                <div className={styles.titleContainer}>
                    <div>
                        <h3 style={{ fontSize: '24px' }}>Registrate</h3>
                        <p style={{ fontSize: '16px' }}>¡Crea una cuenta gratuita!</p>
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <FormRegister />
                </div>
            </div>
            <img
                className={styles.imageSegment}
                src={imagenRegister}
            />
        </div>
    )
}
