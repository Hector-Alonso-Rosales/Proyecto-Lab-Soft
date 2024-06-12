
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Inventario.css'
import Footer from '../../MainComponents/Footer/Footer'
import { collection,getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../MainComponents/firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content' 
import Navbar from '../../MainComponents/Navbar/Navbar'
import BannerSTK from '../BannerSTK/BannerSTK'
const MySwal= withReactContent(Swal)


const Inventario = () => {
  const [inventory,setInventory] = useState( [] )
    //Referneciamos DB Firestore
    const inventoryCollection = collection(db, "Inventario")
    //Función para mostrar todos los Docs
    const getInv = async () => {
        const data = await getDocs(inventoryCollection)
        setInventory(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
    }

    const deleteInv = async (id) => {
      const inventoryDoc= doc(db , "Inventario", id)
      await deleteDoc(inventoryDoc)
      getInv()
   }

    const confirmDelete = (id) => {
      MySwal.fire({
          title: "¿Seguro?",
          text: "¡Ya borrado no se podrá recuperar!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, ¡revelate!"
        }).then((result) => {
          if (result.isConfirmed) {
            deleteInv(id);
            Swal.fire({
              title: "Borrado",
              text: "Se ha eliminado la entrada",
              icon: "success"
            });
          }
        });
  }

    useEffect(() => {
        getInv()
    }, [])

  return (
    <>
    <Navbar/>
    <BannerSTK/>
    <div className="cuerpo">
    <div className="container">
    <div className="crea">
            <Link to="/Create" className='enlace' style={{textDecoration: 'none'}}>Registrar</Link>
    </div>
    <table className="tablamadre"> 
         <thead>
            <tr>
                <th>N° de Serie</th>
                <th>NI</th>
                <th>Estado</th>
                <th>Marca</th>
                <th>Tipo</th>
                <th>Área</th>
                <th>Detalles</th>
                <th>Opciones</th>
            </tr>
         </thead>
         
         <tbody>
            {inventory.map( (Inventario) => (
                <tr key={Inventario.id}>
                    <td>{Inventario.serie}</td>
                    <td>{Inventario.NI}</td>
                    <td>{Inventario.estado}</td>
                    <td>{Inventario.marca}</td>
                    <td>{Inventario.tipo}</td>
                    <td>{Inventario.área}</td>
                    <td>{Inventario.detalles}</td>
                    <td>
                        <Link to={`/edit/${Inventario.id}`} className='btn btn-light'><i className='fa-solid fa-pencil'></i></Link>
                        <button onClick={ () => {confirmDelete(Inventario.id)}} className='btn btn-danger'><i className='fa-solid fa-trash'></i></button>
                    </td>
                </tr>

            ))}


         </tbody>
        </table>
  </div>
  </div>
  <Footer/>
</>
  )
}


export default Inventario;
