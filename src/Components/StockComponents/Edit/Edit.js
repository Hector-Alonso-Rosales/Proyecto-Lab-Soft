import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import {db} from '../../MainComponents/firebaseConfig/firebase'
import './Edit.css'

const Edit = () => {
  const [serie, setSerie] = useState('')
  const [NI, setNI] = useState('')
  const [estado, setEstado] = useState('')
  const [marca, setMarca] = useState('')
  const [tipo, setTipo] = useState('')
  const [área, setArea] = useState('')  
  const [detalles, setDetalles] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const inventoryDoc = doc(db, "Inventario", id)
    const data = {serie: serie,
        NI: NI,
        estado: estado,
        marca: marca,
        tipo: tipo,
        área: área,
        detalles: detalles}
    await updateDoc(inventoryDoc, data)
    navigate('/Inventarios')
  }

  const getProductById = async (id) => {
    const inventoryDoc = await getDoc(doc(db, "Inventario", id))
    if(inventoryDoc.exists()){
      setSerie(inventoryDoc.data().serie)
      setNI(inventoryDoc.data().NI)
      setEstado(inventoryDoc.data().estado)
      setMarca(inventoryDoc.data().marca)
      setTipo(inventoryDoc.data().tipo)
      setArea(inventoryDoc.data().área)
      setDetalles(inventoryDoc.data().detalles)
    }else{
      console.log('No existe tal registro')
    }
  }

  useEffect(() => {
    getProductById(id)
  }, [])
  
  return (
    <div className="contenedoredit">
        <h1>Editar Registro de Equipo</h1>
        <form onSubmit={update}>
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
          <button type='submit' className='btac'>Actualizar</button>
          </div>
        </form>
    </div>
  )



}

export default Edit;