import React, { useState, useEffect } from 'react';
import FormularioCancion from './components/FormularioCancion';
import ListaCanciones from './components/ListaCanciones';
import { getCanciones, createCancion, deleteCancion, updateCancion } from './api';
import './App.css';

const App = () => {
  const [canciones, setCanciones] = useState([]);
  const [cancionEditada, setCancionEditada] = useState(null);

  useEffect(() => {
    cargarCanciones();
  }, []);

  const cargarCanciones = async () => {
    try {
      const response = await getCanciones();
      console.log("Datos recibidos de la API:", response.data); // Añadido para verificar los datos recibidos
      setCanciones(response.data);
      console.log(response.data);
    } catch (error) {
      // console.error('Error al cargar las canciones:', error);
    }
  };

  const eliminarCancion = async (id) => {
    try {
      await deleteCancion(id);
      cargarCanciones();
    } catch (error) {
      // console.error('Error al eliminar la canción:', error);
    }
  };

  const editarCancion = (cancion) => {
    setCancionEditada(cancion);
  };

  const registrarCancion = async (nuevaCancion) => {
    try {
      await createCancion(nuevaCancion);
      // alert('Canción registrada con éxito');
      cargarCanciones();
    } catch (error) {
      console.error('Error al registrar la canción:', error);
      // alert('Hubo un error al registrar la canción');
    }
  };

  const actualizarCancion = async (id, cancionActualizada) => {
    try {
      await updateCancion(id, cancionActualizada);
      // alert('Canción actualizada con éxito');
      cargarCanciones();
    } catch (error) {
      console.error('Error al actualizar la canción:', error);
      // alert('Hubo un error al actualizar la canción');
    } finally {
      setCancionEditada(null);
    }
  };

  return (
    <div className="App">
      <h1>Registra tu Cancion Fav</h1>
      <div className="contenedor">
        <FormularioCancion
          cancionEditada={cancionEditada}
          setCancionEditada={setCancionEditada}
          registrarCancion={registrarCancion}
          actualizarCancion={actualizarCancion}
        />
        <ListaCanciones
          canciones={canciones}
          eliminarCancion={eliminarCancion}
          editarCancion={editarCancion}
        />
      </div>
    </div>
  );
};

export default App;
