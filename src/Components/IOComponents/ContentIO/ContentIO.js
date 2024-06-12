import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../MainComponents/firebaseConfig/firebase.js';
import Swal from 'sweetalert2';
import './ContentIO.css';
import TablaPIO from '../TablaIO/TablaPIO.js';

import RelojDigital from '../Extra/Reloj/Reloj.js';
import Calendario from '../Extra/Calendario/Calendario.js';

const ContentIO = () => {

  const [persona, setPersona] = useState([]);

  //npm install react-calendar
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');

  const navigate = useNavigate();

  // DB firestore
  const personaCollection = collection(db, "Personal");

  // Mostrar docs
  const getPersona = async () => {
    const data = await getDocs(personaCollection);
    setPersona(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Entradas
  const [selectedOption, setSelectedOption] = useState('');
  const opcionSeleccionada = (event) => {
    setSelectedOption(event.target.value);
  };
  const registroCollection = collection(db, "EntSal");
  const enviarDatos = async () => {
    try {
      await addDoc(registroCollection, {
        estado: '🟢',
        nombre: selectedOption,
        fecha: fecha, // Fecha como string
        horaE: hora,   // Hora como string
        horaS: '', 
        horasT: ''
      });
      window.location.reload();
    } catch (error) {
            Swal.fire('Error al enviar los datos', '', 'error');
    }
  };

  //Contraseña
  //npm install sweetalert2
  const contraseñaAdmin = () => {
    Swal.fire({
      title: "Contraseña",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const inputValue = result.value;
        if (inputValue === 'admin03') {
          navigate('/EntradaSalida/Agregar');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Contraseña incorrecta',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      }
    });
  }


  useEffect( () => {
    getPersona()
    // eslint-disable-next-line
  }, [navigate])


  return (
    <>
      <div className='cuerpoIO'>
        <div className='junti'>
          <Calendario setFecha={setFecha} />
          <RelojDigital setHora={setHora} />
        </div>

        <p>ㅤ</p>
        <p> Personas: </p>
        <select className='opc' id="opciones" name="opciones" value={selectedOption} onChange={opcionSeleccionada}>
          <option value="">...</option>
          {persona.map((Personal) => (<option key={Personal.id} value={Personal.nombre}>{Personal.nombre}</option>))}
        </select>
      
        <p>ㅤ</p>
        <button className='enlaceIO' onClick={() => { enviarDatos() }}> Entrada 🖊 </button>
        <button className='enlaceIO' onClick={() => { contraseñaAdmin() }}> 🔒 Agregar </button>

        <p>ㅤ</p>
        <p>🟢 Activo</p>
        
        <TablaPIO/>

      </div> 
    </>
  )
}

export default ContentIO