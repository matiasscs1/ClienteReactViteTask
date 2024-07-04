import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarios, crearUsuario, modificarUsuario, eliminarUsuario } from '../controller/Usuario.controller';

const User = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEdit, setUsuarioEdit] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            const data = await obtenerUsuarios();
            setUsuarios(data);
        };
        fetchUsuarios();
    }, []);

    const handleCrearUsuario = async () => {
        const success = await crearUsuario({ nombre, apellido });
        if (success) {
            setUsuarios(await obtenerUsuarios());
            setNombre('');
            setApellido('');
        }
    };

    const handleModificarUsuario = async () => {
        if (usuarioEdit) {
            const success = await modificarUsuario(usuarioEdit._id, { nombre, apellido });
            if (success) {
                setUsuarios(await obtenerUsuarios());
                setUsuarioEdit(null);
                setNombre('');
                setApellido('');
            }
        }
    };

    const handleEliminarUsuario = async (id) => {
        const success = await eliminarUsuario(id);
        if (success) {
            setUsuarios(await obtenerUsuarios());
        }
    };

    const handleEditClick = (usuario) => {
        setUsuarioEdit(usuario);
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
    };

    const handleTareasClick = () => {
        navigate('/tareas-page');
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Usuarios</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Crear Usuarios
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex space-x-2">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                            setUsuarioEdit(null);
                            setNombre('');
                            setApellido('');
                        }}
                    >
                        Agregar Usuario
                    </button>
                    <button
                        type="button"
                        className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        onClick={handleTareasClick}
                    >
                        Tareas
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">ID del Usuario</th>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Foto</th>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombre del Usuario</th>
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-0 text-right">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{usuario._id}</td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="h-11 w-11 flex-shrink-0 mr-4">
                                                        <img
                                                            alt=""
                                                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            className="h-11 w-11 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{usuario.nombre} {usuario.apellido}</div>
                                                </div>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-2">
                                                <button
                                                    onClick={() => handleEditClick(usuario)}
                                                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleEliminarUsuario(usuario._id)}
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
            <div className="mt-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Informacion del Usuario</h3>
                        <div className="mt-5 sm:mt-6">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <button
                                onClick={usuarioEdit ? handleModificarUsuario : handleCrearUsuario}
                                className="mt-2 w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {usuarioEdit ? 'Modificar Usuario' : 'Crear Usuario'}
                            </button>
                            {usuarioEdit && (
                                <button
                                    onClick={() => {
                                        setUsuarioEdit(null);
                                        setNombre('');
                                        setApellido('');
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
        </div>
    );
};

export default User;
