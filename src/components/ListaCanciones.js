import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ListaCanciones = ({ canciones, eliminarCancion, editarCancion }) => {
  const [busqueda, setBusqueda] = useState('');

  if (!Array.isArray(canciones) || canciones.length === 0) {
    return <p>No hay canciones para mostrar.</p>;
  }

  // Función para manejar la eliminación con SweetAlert
  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCancion(id);
        Swal.fire('Eliminado!', 'Tu canción ha sido eliminada.', 'success');
      }
    });
  };

  // Función para manejar cambios en el campo de búsqueda
  const handleChangeBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  // Filtrar canciones por el nombre de la canción
  const cancionesFiltradas = canciones.filter((cancion) => {
    return cancion.track.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div className="lista-canciones">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por Nombre de la Canción"
        value={busqueda}
        onChange={handleChangeBusqueda}
      />
      <ul>
        {cancionesFiltradas.map((cancion) => (
          <li key={cancion.id}>
            <p><strong>Título:</strong> {cancion.track}</p>
            <p><strong>Artista:</strong> {cancion.artista}</p>
            <p><strong>Género:</strong> {cancion.genero}</p>
            <div>
              <button onClick={() => editarCancion(cancion)} className="btn btn-warning mr-2">Editar</button>
              <button onClick={() => handleEliminar(cancion.id)} className="btn btn-danger">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCanciones;
