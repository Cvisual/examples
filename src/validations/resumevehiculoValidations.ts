import * as yup from 'yup';

//Validation vehiculo
export const step1Schema = (isDisabled: boolean) =>
  yup.object().shape({
    fotos: yup.array().of(yup.string()).max(4, 'Maximo 4 imagenes'),
    placa: yup
      .string()
      .trim()
      .when('$isDisabled', {
        is: isDisabled ? true : false,
        then: schema =>
          schema.matches(
            /^([a-z]{3})([0-9]{3})$/,
            'Formato incorrecto, debe tener maximo 3 letras y 3 numeros',
          ),
      }),
    tipovehiculo_id: yup.string().required('Este campo es requerido'),
    marca_id: yup.string().required('Este campo es requerido'),
    ano_id: yup.string().required('Este campo es requerido'),
    modelo_id: yup.string().required('Este campo es requerido'),
    modelo: yup.string().required('Este campo es requerido'),
    modelo_repotenciado: yup.string(),
    color_id: yup.string().required('Este campo es requerido'),
    tipocarroceria_id: yup.string().required('Este campo es requerido'),
    clasevehiculo_id: yup.string().required('Este campo es requerido'),
    placa_enganche: yup.string(),
    configuracionvehicular: yup.string(),
    numero_motor: yup.string(),
    numero_chasis: yup.string(),
    numero_serie: yup.string(),
    peso_vacio: yup.string(),
    capacidad: yup.string(),
    propietario_id: yup.string().required('Este campo es requerido'),
    tenedor_id: yup.string().required('Este campo es requerido'),
    operador_id: yup.string().required('Este campo es requerido'),
    tipo_servicio: yup.string().required('Este campo es requerido'),
    empresagps_id: yup.string().required('Este campo es requerido'),
    paginaweb_gps: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Ingrese una url correcta',
      ),
    usuario_gps: yup.string().required('Este campo es requerido'),
    clave_gps: yup.string().required('Este campo es requerido'),
    ubicacion: yup.string().required('Este campo es requerido'),
    ruta_frecuente: yup.string().required('Este campo es requerido'),
    calificacion: yup.string().required('Este campo es requerido'),
  });

// validation - placa enganche
export const placaEngancheSchema = yup.object().shape({
  foto: yup.string().required('Este campo es requerido'),
  configuracionvehicularEnganche: yup
    .string()
    .required('Este campo es requerido'),
  placaEnganche: yup
    .string()
    .matches(
      /^([a-z]{1})([0-9]{5})$/,
      'Formato incorrecto, debe agregar 1 letras y 5 numeros',
    )
    .required('Este campo es requerido'),
  marca_idEnganche: yup.string().required('Este campo es requerido'),
  color_idEnganche: yup.string().required('Este campo es requerido'),
  modeloEnganche: yup.string().required('Este campo es requerido'),
  tipocarroceria_idEnganche: yup.string().required('Este campo es requerido'),
  numero_serieEnganche: yup.string().required('Este campo es requerido'),
  pesoEnganche: yup.number().required('Este campo es requerido'),
  capacidadEnganche: yup.number().required('Este campo es requerido'),
  propietario_idEnganche: yup.string().required('Este campo es requerido'),
  tenedor_idEnganche: yup.string().required('Este campo es requerido'),
});
