import './Botones.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content' 
const MySwal= withReactContent(Swal)

//Función para que deje entrar a las páginas

//Contraseña



const Botones = () => {
      const navigate= useNavigate();
      const contraseñaAdmin = (Ruta) => {
            MySwal.fire({
              title: "Introduzca la contraseña de administrador",
              input: "text",
              inputAttributes: {
                autocapitalize: "off"
              },
              showCancelButton: true,
              confirmButtonText: "Listo",
              showLoaderOnConfirm: true,
            }).then((result) => {
              if (result.isConfirmed) {
                const inputValue = result.value;
                if (inputValue === 'admin') {
                  navigate(Ruta);
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
  return (
      <div className="botones">
      <button onClick={() => { contraseñaAdmin('/Inventarios') }} className='btncont'><h1 className="Boton i">Inventario</h1></button>
      <button onClick={() => { contraseñaAdmin('/Bítacora') }} className='btncont'><h1 className="Boton b">Bítacora</h1></button>
      <button onClick={() => { contraseñaAdmin('/EntradaSalida') }} className='btncont'><h1 className="Boton eys">Entrada y Salida</h1></button>
      </div> 
  );
}

export default Botones;