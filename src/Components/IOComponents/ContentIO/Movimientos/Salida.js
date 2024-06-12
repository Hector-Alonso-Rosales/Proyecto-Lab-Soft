import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../../MainComponents/firebaseConfig/firebase.js';
import Navbar from '../../../MainComponents/Navbar/Navbar.js';
import BannerIO from '../../BannerIO/BannerIO.js';

const Salida = () => {

  const [registro, setRegistro] = useState(null);
  const [datosCalculados, setDatosCalculados] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Obtener el registro por ID
  const getRegistroById = async (id) => {
    const regis = await getDoc(doc(db, "EntSal", id));
    if (regis.exists()) {
      const data = regis.data();
      setRegistro(data);
      prepararDatos(data);
    } else {
      console.log('El registro no existe');
    }
  };

  // Calcular horas totales
  const calcularHorasTotales = (horaE, horaS) => {
    const entrada = new Date(`1970-01-01T${horaE}:00`);
    const salida = new Date(`1970-01-01T${horaS}:00`);
    const diferenciaMs = salida - entrada;
    const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
    const minutos = Math.round((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}m`;
  };
  

  // Preparar los datos para mostrar antes de enviar
  const prepararDatos = (registro) => {
    const horaSalida = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Hora actual
    const horasTotales = calcularHorasTotales(registro.horaE, horaSalida);
    setDatosCalculados({
      estado: '',
      horaS: horaSalida,
      horasT: horasTotales
    });
  };

  // Actualizar el registro al marcar la salida
  const actualizarDocumento = async () => {
    if (registro && datosCalculados) {
      const EnSa = doc(db, "EntSal", id);
      const data = {
        estado: datosCalculados.estado,
        horaS: datosCalculados.horaS,
        horasT: datosCalculados.horasT
      };
      await updateDoc(EnSa, data);
      navigate('/EntradaSalida');
    }
  };

  useEffect(() => {
    getRegistroById(id);
  }, [id]);

  return (
    <>
      <Navbar />
      <BannerIO />
      <div className="contenedoredit">
        <h1>Marcar Salida</h1>
        {registro && datosCalculados && (
          <div>
            <p><strong>Nombre:</strong> {registro.nombre}</p>
            <p><strong>Fecha:</strong> {registro.fecha}</p>
            <p><strong>Hora de Entrada:</strong> {registro.horaE}</p>
            <p><strong>Hora de Salida:</strong> {datosCalculados.horaS}</p>
            <p><strong>Horas Totales:</strong> {datosCalculados.horasT}</p>
            <button onClick={actualizarDocumento} className="btn btn-danger">Confirmar y Enviar Datos</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Salida;