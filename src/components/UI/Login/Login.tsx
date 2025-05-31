import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { type FC } from "react";
import { useUsuario } from "../../../hooks/useUsuario";
import { navigateTo } from "../../../routes/navigation";

type IPropsLogin = {
  setIsLogin: (state: boolean) => void;
};

export const Login: FC<IPropsLogin> = ({ setIsLogin }) => {

  // HOOKS
  const { loginUsuario } = useUsuario();

  const handleNavigateToRegister = () => {
    navigateTo("/register")
    setIsLogin(false);
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Requerido"),
      password: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      const success = await loginUsuario(values);
      if (success) {
        setIsLogin(false);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
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
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className={styles.error}>{formik.errors.username}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.error}>{formik.errors.password}</div>
          )}
        </div>

        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setIsLogin(false)}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.acceptButton}>
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
