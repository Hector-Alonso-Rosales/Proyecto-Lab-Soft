import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../../MainComponents/Navbar/Navbar.js'
import BannerIO from '../../BannerIO/BannerIO.js'
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../../../MainComponents/firebaseConfig/firebase.js'
import './Movs.css'

const Agregar = () => {

  //Elementos de los documentos, para el formulario
  const [ nombre, setNombre ] = useState('')
  const [ numC, setNumC ] = useState(0)
  const [ carrera, setCarrera ] = useState('')

  const navigate = useNavigate()
  const personaCollection = collection(db, "Personal")

  const serv = async (e) => {
    e.preventDefault()
    await addDoc(personaCollection, {nombre: nombre, numC: numC, carrera: carrera})
    navigate('/EntradaSalida')
  }

  return (
    <>
      <Navbar />
      <BannerIO /> 
      <div className="containerform">
        <h1>Agregar Personal</h1>
        <form onSubmit={serv}>

          <div className="cntf">
            <label className='tagform'>Nombre</label>
            <input value={nombre} onChange={ (e) => setNombre(e.target.value)} type='text' className='barrita'/>
          </div>

          <div className="cntf">
            <label className='tagform'>Número de Control</label>
            <input value={numC} onChange={ (e) => setNumC(e.target.value)} type='text' className='barrita'/>
          </div>

          <div className="cntf">
            <label className='tagform'>Carrera</label>
            <select value={carrera} onChange={(e) => setCarrera(e.target.value)} type='text' className='barrita'>
              <option value="">Seleccione una carrera</option>
              <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
              <option value="Ingeniería en Informática">Ingeniería en Informática</option>
              <option value="Ingeniería en TICS">Ingeniería en TIC'S</option>
              <option value="Ingeniería Industrial">Ingeniería Industrial</option>
              <option value="Arquitectura">Arquitectura</option>
              <option value="Ingeniería Bioquímica">Ingeniería Bioquímica</option>
              <option value="Ingeniería Civil">Ingeniería Civil</option>
              <option value="Ingeniería Mecatrónica">Ingeniería Mecatrónica</option>
              <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
              <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
              <option value="Licenciatura en Administración">Licenciatura en Administración</option>
              <option value="Ingeniería en Gestión Empresarial">Ingeniería en Gestión Empresarial</option>
              <option value="Ingeniería en semiconductores">Ingeniería en semiconductores</option>
              <option value="Ingeniería en Química">Ingeniería Química</option>
              <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
              {/* Añade más opciones según sea necesario */}
            </select>
          </div>
          
          <div>
            <button type='submit' className='btgIO'>Agregar</button>ㅤ
            <button onClick={() => navigate('/EntradaSalida')} className='btgXIO'>Cancelar</button>
          </div>
          
        </form>
      </div>
    </>
  )
}

export default Agregar