import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { useState, type FC } from "react";
import { useUsuario } from "../../../hooks/useUsuario";
import { navigateTo } from "../../../routes/navigation";

type IPropsLogin = {
  setIsLogin: (state: boolean) => void;
};

export const Login: FC<IPropsLogin> = ({ setIsLogin }) => {

  const [cargando, setCargando] = useState(false)
  // HOOKS
  const { loginUsuario } = useUsuario();

  // Metodos de accion
  const handleNavigateToRegister = () => {
    navigateTo("/register")
    setIsLogin(false);
  }

  // COnfiguracion de formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Requerido").min(2, 'Requerido'),
      password: Yup.string().required("Requerido").min(2, 'Requerido'),
    }),
    onSubmit: async (values) => {
      setCargando(true)
      const success = await loginUsuario(values);
      if (success) {
        setIsLogin(false);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
      setCargando(false)
    },
  });

  return (
    <form className={styles.modalOverlay} onSubmit={formik.handleSubmit}>
      <div className={styles.containerLogin}>
        <div className={styles.iconContainer}>
          <i className="bi bi-person-circle"></i>
          <h2>Login</h2>
        </div>

        <div className={styles.inputsContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              autoComplete="off"
            />
            {formik.touched.username && formik.errors.username && (
              <div className={styles.error}>{formik.errors.username}</div>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              autoComplete="off"
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setIsLogin(false)}
            disabled={cargando}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.acceptButton} disabled={!(formik.dirty && formik.isValid) || cargando}>
            Acceder
          </button>
        </div>

        <p className={styles.registrate}>
          ¿No tienes una cuenta? <span onClick={handleNavigateToRegister}>Registrate</span>
        </p>
      </div>
    </form>
  );
};
