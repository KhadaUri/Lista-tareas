import React, {useState} from 'react';
import './App.css';
import Header from './componentes/Header';
import FormularioTareas from './componentes/FormularioTareas';
import ListasTareas from './componentes/ListaTareas';
import { useEffect } from 'react';

const App = () => {
  //Obtenemos las tyareas guardadas del local storage
  const tareasGuardadas = 
  localStorage.getItem('tareas') ? 
  JSON.parse(localStorage.getItem('tareas')) : [];
  
  //Establecemos el estado de las tareas
  const [tareas, cambiarTareas] = useState(tareasGuardadas);
  
  // Guardando el estado de localstorage
  useEffect(()=> {
    localStorage.setItem('tareas', JSON.stringify(tareas)); 
  },[tareas]);

  // Accedemos a localstorage y comprobamos si MostrarCompletadas es null
  let configMostrarCompletadas = ''; 
  if(localStorage.getItem('mostrarCompletadas') === null){
    configMostrarCompletadas = true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true';
  }

  // El estado de mostrarCompletadas
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);

  useEffect(()=> { 
    localStorage.setItem('mostrarCompletadas', mostrarCompletadas.toString()); 
    },[mostrarCompletadas]);
  
  

  return (
    <div className='contenedor'>     
     <Header 
        mostrarCompletadas={mostrarCompletadas} 
        cambiarMostrarCompletadas= {cambiarMostrarCompletadas}
     />
     <FormularioTareas tareas={tareas} cambiarTareas={cambiarTareas} />
     <ListasTareas 
     tareas={tareas} 
     cambiarTareas={cambiarTareas}
     mostrarCompletadas={mostrarCompletadas}
     />
    </div>
  );
}

export default App;
