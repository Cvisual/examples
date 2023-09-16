import * as yup from 'yup';

const currentDate = new Date();

// documento
export const updateDocumentSchema = yup.object().shape({
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
