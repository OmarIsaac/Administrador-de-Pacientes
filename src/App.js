import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  // Citas en el local storage     var localStorage: Storage;

  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // useEffect para realizar ciertas operaciones cuando el state cambia

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  // Funcion que agregue las citas actuales y agregue a una nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Funcion que elimina una cita por su ID
  const eliminarCita = (id) => {
    const nuevascitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevascitas);
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus Citas";
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
