import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

function Calendario({ setFecha }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toDateString());

  useEffect(() => {
    setFecha(fechaSeleccionada);
  }, [fechaSeleccionada, setFecha]);

  const onChange = (date) => {
    const fechaString = date.toDateString();
    setFecha(fechaString);
    setFechaSeleccionada(fechaString);
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={new Date()}
      />
    </div>
  );
}

export default Calendario;
