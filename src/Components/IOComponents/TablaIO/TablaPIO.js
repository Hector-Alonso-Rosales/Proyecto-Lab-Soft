import React, {useState, useEffect} from 'react'
import './Tabla.css'
import { useNavigate, Link } from 'react-router-dom';
import { collection,getDocs, getDoc, deleteDoc, doc, addDoc  } from 'firebase/firestore'
import { db } from '../../MainComponents/firebaseConfig/firebase'
import Swal from 'sweetalert2'

const TablaPIO = () => {

  const [registro, setRegistro] = useState( [] )
  const navigate = useNavigate();
  
  //DB firestore
  const registroCollection = collection(db, "EntSal")
  
  //Mostrar docs
  const getRegistro = async ()   => {
    const data = await getDocs(registroCollection)
    setRegistro(data.docs.map( (doc) => ( {...doc.data(),id:doc.id})))
  }

  //Confirmar salida
  const confirmSal = (EntSal) => {
    Swal.fire({
      title: "Marcar Salida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        //inabilitar botón de salida
        navigate(`/EntradaSalida/Salida/${EntSal.id}`);
      }
    });
  };

  //guagua
  const deleteRegistro = async (id) => {
    const registroDoc = doc(db, "EntSal", id)
    await deleteDoc(registroDoc)
    getRegistro()
  }

  useEffect(() => {
    getRegistro()
  }, [])

  return (
    <>
      <div className="cuerpoIO">
        <table className="tablamadreIO"> 
          <thead>
            <tr>
              <th>Estado</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Hora Entrada</th>
              <th>Hora Salida</th>
              <th>Horas Totales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            {registro.map( (EntSal) => (
              <tr key={EntSal.id}>
                <td>{EntSal.estado}</td>
                <td>{EntSal.nombre}</td>
                <td>{EntSal.fecha}</td>
                <td>{EntSal.horaE}</td>
                <td>{EntSal.horaS}</td>
                <td>{EntSal.horasT}</td>  
                <td>
                  <button onClick={ () => { deleteRegistro(EntSal.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  <Link to={`/EntradaSalida/Editar/${EntSal.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link> 
                  {EntSal.estado === '🟢' && (
                    <button className='enlaceIO' onClick={() => { confirmSal(EntSal) }}>Salida 🖌</button>
                  )}

                </td>               
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </>
  )
}

export default TablaPIO