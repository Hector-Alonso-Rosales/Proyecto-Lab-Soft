import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import {db} from '../../MainComponents/firebaseConfig/firebase'
import './Create.css'

const Create = () => {
  const [serie, setSerie] = useState('')
  const [NI, setNI] = useState('')
  const [estado, setEstado] = useState('')
  const [marca, setMarca] = useState('')
  const [tipo, setTipo] = useState('')
  const [área, setArea] = useState('')  
  const [detalles, setDetalles] = useState('')

  const navigate = useNavigate()
  const inventoryCollection = collection(db, "Inventario")

  const store = async (e) => {
    e.preventDefault()
    await addDoc(inventoryCollection, {
      serie: serie,
      NI: NI,
      estado: estado,
      marca: marca,
      tipo: tipo,
      área: área,
      detalles: detalles
    })
    navigate('/Inventarios')
  }


  return (
    <div className="containerform">
        <h1>Crear Registro de Equipo</h1>
        <form onSubmit={store}>
          <div className="cntf">
            <label className='tagform'>Serie</label>
            <input value={serie} onChange={ (e) => setSerie(e.target.value)} type='text' className='barrita'/>
          </div>
          <div className="cntf">
                <label className='tagform'>Número de Inventario</label>
                <input value={NI} onChange={ (e) => setNI(e.target.value)} type='text' className='barrita'/>
          </div>
          <div className="cntf">
                    <label className='tagform'>Estado</label>
          <input value={estado} onChange={ (e) => setEstado(e.target.value)} type='text' className='barrita'/>
          </div>
          <div className="cntf">
                    <label className='tagform'>Marca</label>
          <input value={marca} onChange={ (e) => setMarca(e.target.value)} type='text' className='barrita'/>
          </div>
          <div className="cntf">
                    <label className='tagform'>Tipo</label>
          <input value={tipo} onChange={ (e) => setTipo(e.target.value)} type='text' className='barrita'/>
          </div>
          <div className="cntf">
                    <label className='tagform'>Área</label>
          <input value={área} onChange={ (e) => setArea(e.target.value)} type='text' className='barrita'/>
          </div>
          <div className="cntf">
                    <label className='tagform'>Detalles o notas</label>
          <input value={detalles} onChange={ (e) => setDetalles(e.target.value)} type='text' className='barrita'/>
          </div>
          <div>
          <button onClick={() => navigate('/Inventarios')} className='regr'>Cancelar</button>
          <button type='submit' className='btg'>Guardar</button>
          </div>
        </form>
    </div>
  )
}

export default Create