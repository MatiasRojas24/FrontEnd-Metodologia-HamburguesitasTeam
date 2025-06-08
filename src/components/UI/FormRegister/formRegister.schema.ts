import * as yup from "yup"

export const formRegisterSchema = yup.object().shape({
    nombre: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
    email: yup.string().required('El correo es obligatorio').email('Correo inválido'),
    username: yup.string().required('El nombre de usuario es obligatorio').min(3, 'Mínimo 3 caracteres'),
    password: yup.string().required('La contraseña es obligatoria').min(3, 'Mínimo 3 caracteres'),
    confirmPass: yup.string().required('Debes repetir la contraseña')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
    dni: yup.string().required('El DNI es obligatorio').min(8, 'Mínimo 8 caracteres').matches(/^\d+$/, 'El DNI solo debe contener números'),
})