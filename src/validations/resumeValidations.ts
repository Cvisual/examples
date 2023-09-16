import * as yup from 'yup';
import {sub} from 'date-fns/fp';

const currentDate = new Date();

// step 1
export const step1Schema = yup.object().shape({
  foto: yup.string(),
  tipodocumento: yup.string().required('Este campo es requerido'),
  numerodocumento: yup
    .number()
    .test(
      'len',
      'Debe tener exactamente 10 caracteres',
      val => val!.toString().length <= 10,
    )
    .required('Este campo es requerido'),
  categoria_id: yup.string().required('Este campo es requerido'),
  tipotercero_id: yup.string().required('Este campo es requerido'),
  tipopersona: yup.string(),
  razonsocial: yup.string(),
  nombre: yup.string(),
  apellido: yup.string(),
  sexo: yup.string().required('Este campo es requerido'),
  telefono: yup
    .number()
    .test(
      'len',
      'Debe tener exactamente 10 caracteres',
      val => val!.toString().length <= 10,
    )
    .required('Este campo es requerido'),
  direccion: yup
    .string()
    .matches(/^[a-zA-Z0-9 #)(]{2,20}$/, 'Formato incorrecto')
    .required('Este campo es requerido'),
  pais: yup.number().required('Este campo es requerido'),
  estado: yup.number().required('Este campo es requerido'),
  ciudad: yup.number().required('Este campo es requerido'),
  ubicacion: yup
    .string()
    .matches(/^[a-zA-Z0-9 ]{2,20}$/, 'Formato incorrecto')
    .required('Este campo es requerido'),
  fecha_nacimiento: yup
    .date()
    .max(sub({years: 16}, new Date()), 'Debes tener 16 años o más.'),
  calificacion: yup.string(),
  user_id: yup.string(),
});

// step 2
export const step2Schema = yup.object().shape({
  tipo_entidad: yup.string().required('Este campo es requerido'),
  entidad: yup.string().required('Este campo es requerido'),
  fecha_afiliacion: yup
    .date()
    .max(currentDate.toDateString())
    .required('Este campo es requerido'),
  estado_afiliacion: yup.string().required('Este campo es requerido'),
  observaciones: yup
    .string()
    .test(
      'len',
      'Debe tener exactamente 50 caracteres',
      val => val!.length <= 50,
    ),
});

// step 3
export const step3Schema = yup.object().shape({
  nombre_completo: yup.string().required('Este campo es requerido'),
  telefonos: yup
    .number()
    .test(
      'len',
      'Debe tener exactamente 10 caracteres',
      val => val!.toString().length <= 10,
    )
    .required('Este campo es requerido'),
  pais_referencia: yup.number().required('Este campo es requerido'),
  estado_referencia: yup.number().required('Este campo es requerido'),
  ciudad_referencia: yup.number().required('Este campo es requerido'),
  direccion: yup.string().required('Este campo es requerido'),
  relacion: yup.string().required('Este campo es requerido'),
});

// step 4
export const step4Schema = yup.object().shape({
  grupodocumento_id: yup.string().required('Este campo es requerido'),
  documento_id: yup.string().required('Este campo es requerido'),
  fecha_expedicion: yup
    .date()
    .max(
      currentDate.toDateString(),
      'La fecha de expedicion no puede ser mayor a la fecha actual',
    )
    .required('Este campo es requerido'),
  fecha_vencimiento: yup
    .date()
    .min(
      yup.ref('fecha_expedicion'),
      'La fecha de vencimiento no puede ser anterior a la fecha de expedicion',
    )
    .required('Este campo es requerido'),
  categoria: yup.string().required('Este campo es requerido'),
  codigo_referencia: yup.string().required('Este campo es requerido'),
  observaciones: yup
    .string()
    .test(
      'len',
      'Debe tener exactamente 500 caracteres',
      val => val!.length <= 500,
    ),
  nombre: yup.string().required('Este campo es requerido'),
  entidad_emisora: yup.string().required('Este campo es requerido'),
  documento: yup.string(),
});
