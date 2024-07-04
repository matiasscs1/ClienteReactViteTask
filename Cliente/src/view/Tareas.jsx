import React, { useState, useEffect } from 'react';
import { obtenerTareas, crearTarea, modificarTarea, eliminarTarea, verificarTodasLasTareas } from '../controller/Tarea.controller';
import { useNavigate } from 'react-router-dom';

const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [tareasVerificadas, setTareasVerificadas] = useState([]);
    const [tareaEdit, setTareaEdit] = useState(null);
    const [idUsuario, setIdUsuario] = useState('');
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicioTrabajo, setFechaInicioTrabajo] = useState('');
    const [estado, setEstado] = useState('');
    const [estimado, setEstimado] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTareas = async () => {
            const data = await obtenerTareas();
            setTareas(data);
        };
        fetchTareas();
    }, []);

    const handleCrearTarea = async () => {
        const success = await crearTarea({
            id_usuario: idUsuario,
            nombre_proyecto: nombreProyecto,
            descripcion,
            fecha_inicio_trabajo: fechaInicioTrabajo,
            estado,
            estimado: parseInt(estimado),
        });
        if (success) {
            setTareas(await obtenerTareas());
            setIdUsuario('');
            setNombreProyecto('');
            setDescripcion('');
            setFechaInicioTrabajo('');
            setEstado('');
            setEstimado('');
        }
    };

    const handleModificarTarea = async () => {
        if (tareaEdit) {
            const success = await modificarTarea(tareaEdit._id, {
                id_usuario: idUsuario,
                nombre_proyecto: nombreProyecto,
                descripcion,
                fecha_inicio_trabajo: fechaInicioTrabajo,
                estado,
                estimado: parseInt(estimado),
            });
            if (success) {
                setTareas(await obtenerTareas());
                setTareaEdit(null);
                setIdUsuario('');
                setNombreProyecto('');
                setDescripcion('');
                setFechaInicioTrabajo('');
                setEstado('');
                setEstimado('');
            }
        }
    };

    const handleEliminarTarea = async (id) => {
        const success = await eliminarTarea(id);
        if (success) {
            setTareas(await obtenerTareas());
        }
    };

    const handleEditClick = (tarea) => {
        setTareaEdit(tarea);
        setIdUsuario(tarea.id_usuario);
        setNombreProyecto(tarea.nombre_proyecto);
        setDescripcion(tarea.descripcion);
        setFechaInicioTrabajo(tarea.fecha_inicio_trabajo);
        setEstado(tarea.estado);
        setEstimado(tarea.estimado);
    };

    const handleVerificarTareas = async () => {
        const data = await verificarTodasLasTareas(fechaFin);
        setTareasVerificadas(data);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex space-x-2">
                <input
                    type="text"
                    placeholder="Fecha fin (DD/MM/YYYY)"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleVerificarTareas}
                >
                    Verificar Tareas
                </button>
                <button
                    type="button"
                    className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={() => navigate('/')}
                >
                    Ir a Usuarios
                </button>
            </div>

            {/* Tabla de Gestión de Tareas */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Empleado</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Tarea</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Descripción</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Fecha Inicio</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Estimado</th>
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-0 text-right">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {tareas.map((tarea) => (
                                        <tr key={tarea._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{tarea.id_usuario}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.nombre_proyecto}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.descripcion}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.fecha_inicio_trabajo}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.estado}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.estimado}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-2">
                                                <button
                                                    onClick={() => handleEditClick(tarea)}
                                                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleEliminarTarea(tarea._id)}
                                                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulario de Tarea */}
            <div className="mt-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la Tarea</h3>
                        <div className="mt-5 sm:mt-6">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="ID Usuario"
                                    value={idUsuario}
                                    onChange={(e) => setIdUsuario(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Nombre del Proyecto"
                                    value={nombreProyecto}
                                    onChange={(e) => setNombreProyecto(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Descripción"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Fecha Inicio Trabajo (DD/MM/YYYY)"
                                    value={fechaInicioTrabajo}
                                    onChange={(e) => setFechaInicioTrabajo(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Estado"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Estimado (días)"
                                    value={estimado}
                                    onChange={(e) => setEstimado(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <button
                                onClick={tareaEdit ? handleModificarTarea : handleCrearTarea}
                                className="mt-2 w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {tareaEdit ? 'Modificar Tarea' : 'Crear Tarea'}
                            </button>
                            {tareaEdit && (
                                <button
                                    onClick={() => {
                                        setTareaEdit(null);
                                        setIdUsuario('');
                                        setNombreProyecto('');
                                        setDescripcion('');
                                        setFechaInicioTrabajo('');
                                        setEstado('');
                                        setEstimado('');
                                    }}
                                    className="mt-2 w-full rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Cancelar Edición
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de Verificación de Tareas */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Empleado</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Tarea</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Fecha Inicio</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Fecha Fin</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Días Pasados</th>
                                        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Proyecto</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {tareasVerificadas.map((tarea) => (
                                        <tr key={tarea._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{tarea.id_usuario}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.nombre_proyecto}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.fecha_inicio_trabajo}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.fecha_fin_trabajo}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.dias_pasados}</td>
                                            <td className="whitespace-nowrap py-4 px-3 text-sm">{tarea.nombre_proyecto}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tareas;
