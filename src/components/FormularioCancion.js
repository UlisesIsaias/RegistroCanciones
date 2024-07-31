import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormularioCancion = ({ cancionEditada, setCancionEditada, registrarCancion, actualizarCancion }) => {
  const [cancion, setCancion] = useState({ track: '', artista: '', genero: '' });

  useEffect(() => {
    if (cancionEditada) {
      setCancion({
        track: cancionEditada.track,
        artista: cancionEditada.artista,
        genero: cancionEditada.genero,
      });
    } else {
      limpiarFormulario();
    }
  }, [cancionEditada]);

  const limpiarFormulario = () => {
    setCancion({ track: '', artista: '', genero: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cancion.track.trim() || !cancion.artista.trim() || !cancion.genero.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error'
      });
      return;
    }

    if (cancionEditada) {
      actualizarCancionConAlerta(cancionEditada.id, cancion);
    } else {
      registrarCancionConAlerta(cancion);
    }
    limpiarFormulario();
  };

  const registrarCancionConAlerta = (nuevaCancion) => {
    registrarCancion(nuevaCancion);
    Swal.fire({
      title: 'Canción registrada!',
      text: 'Tu canción ha sido registrada correctamente.',
      icon: 'success'
    });
  };

  const actualizarCancionConAlerta = (id, cancionActualizada) => {
    actualizarCancion(id, cancionActualizada);
    Swal.fire({
      title: 'Canción actualizada!',
      text: 'Tu canción ha sido actualizada correctamente.',
      icon: 'success'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCancion({ ...cancion, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="track" value={cancion.track} onChange={handleChange} placeholder="Nombre de la canción" required />
      <input type="text" name="artista" value={cancion.artista} onChange={handleChange} placeholder="Artista" required />
      <input type="text" name="genero" value={cancion.genero} onChange={handleChange} placeholder="Género" required />
      <button type="submit" className={`btn btn-block ${cancionEditada ? 'btn-warning' : 'btn-dark'}`}>
        {cancionEditada ? 'Actualizar Canción' : 'Registrar Canción'}
      </button>
    </form>
  );
};

export default FormularioCancion;
