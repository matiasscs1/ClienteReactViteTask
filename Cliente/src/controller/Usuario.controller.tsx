import { Usuario } from "../model/Usuario.model.tsx";
import axios from 'axios';

// Crear usuario
export const crearUsuario = async (usuario: Usuario): Promise<boolean> => {
    try {
        const response = await axios.post('http://localhost:3000/usuario', {
            nombre: usuario.nombre || '',
            apellido: usuario.apellido || ''
        });
        return true;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return false;
    }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (): Promise<Usuario[]> => {
    try {
        const response = await axios.get('http://localhost:3000/usuario');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return [];
    }
};

// Modificar usuario
export const modificarUsuario = async (id: string, usuario: Usuario): Promise<boolean> => {
    try {
        const response = await axios.put(`http://localhost:3000/usuario/${id}`, {
            nombre: usuario.nombre || '',
            apellido: usuario.apellido || ''
        });
        return true;
    } catch (error) {
        console.error('Error al modificar el usuario:', error);
        return false;
    }
};

// Eliminar usuario
export const eliminarUsuario = async (id: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`http://localhost:3000/usuario/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return false;
    }
};
