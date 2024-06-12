import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from '../../../MainComponents/firebaseConfig/firebase.js'
import Navbar from '../../../MainComponents/Navbar/Navbar.js'
import BannerIO from '../../BannerIO/BannerIO.js'

const Editar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ fecha, setFecha ] = useState('')
  const [ horaE, setHoraE ] = useState('')
  const [ horaS, setHoraS ] = useState('')
  const [ horasT, setHorasT ] = useState('')

  const navigate = useNavigate()    
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const EnSa = doc(db, "EntSal", id)
    const data = {nombre: nombre, fecha: fecha, horaE: horaE, horaS: horaS, horasT: horasT}
    await updateDoc(EnSa, data)
    navigate('/EntradaSalida')
  }

  const getRegistroById = async (id) => {
    const regis = await getDoc( doc(db, "EntSal", id) )
    
    if(regis.exists()) {
      setNombre(regis.data().nombre)    
      setFecha(regis.data().fecha)
      setHoraE(regis.data().horaE)
      setHoraS(regis.data().horaS)
      setHorasT(regis.data().horasT)
    } else {
      console.log('El registro no existe')
    }
  }

  useEffect( () => {
    getRegistroById(id)
  }, [])

  return (
    <>
      <Navbar />
      <BannerIO /> 
      <div className="contenedoredit">
        <h1>Editar Registro</h1>
        <form onSubmit={update}>
          <div className="cntf">
            <label className='tagform'>Nombre</label>
            <input value={nombre} onChange={ (e) => setNombre(e.target.value)} type='text' className='barrita'/>
          </div>

          <div className="cntf">
            <label className='tagform'>Fecha</label>
            <input value={fecha} onChange={ (e) => setFecha(e.target.value)} type='text' className='barrita'/>
          </div>

          <div className="cntf">
            <label className='tagform'>Hora Entrada</label>
            <input value={horaE} onChange={ (e) => setHoraE(e.target.value)} type='text' className='barrita'/>
          </div>

          <div className="cntf">
            <label className='tagform'>Hora Salida</label>
            <input value={horaS} onChange={ (e) => setHoraS(e.target.value)} type='text' className='barrita'/>
          </div>

          <div className="cntf">
            <label className='tagform'>Horas Totales</label>
            <input value={horasT} onChange={ (e) => setHorasT(e.target.value)} type='text' className='barrita'/>
          </div>
          
          <button type='submit' className='btac'>Editar</button>ㅤ
          <button onClick={() => navigate('/EntradaSalida')} className='btgXIO'>Cancelar</button>
          
        </form>
      </div>
    </>
  )



}

export default Editar;