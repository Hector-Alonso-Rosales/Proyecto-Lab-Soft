import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './Reloj.css';

function RelojDigital({ setHora }) {
  const [horaActual, setHoraActual] = useState(moment().format('HH:mm'));

  useEffect(() => {
    const intervalID = setInterval(() => {
      const hora = moment().format('HH:mm');
      setHora(hora);
      setHoraActual(hora);
    }, 1000);
    return () => clearInterval(intervalID);
  }, [setHora]);

  return (
    <div>
      <h2 className='relojjj'>Hora {horaActual}</h2>
    </div>
  );
}

export default RelojDigital;
