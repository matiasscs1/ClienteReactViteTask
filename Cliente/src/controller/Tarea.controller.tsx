import {Tarea} from '../model/Tareas.model.ts';
import axios from 'axios';



// Crear tarea
export const crearTarea = async (tarea: Tarea): Promise<boolean> => {
    try {
        await axios.post('http://localhost:3000/tarea', {
            id_usuario: tarea.id_usuario,
            nombre_proyecto: tarea.nombre_proyecto,
            descripcion: tarea.descripcion,
            fecha_inicio_trabajo: tarea.fecha_inicio_trabajo,
            estado: tarea.estado,
            estimado: tarea.estimado,
        });
        return true;
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        return false;
    }
};

// Obtener todas las tareas
export const obtenerTareas = async (): Promise<Tarea[]> => {
    try {
        const response = await axios.get('http://localhost:3000/tarea');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        return [];
    }
};

// Modificar tarea
export const modificarTarea = async (id: string, tarea: Tarea): Promise<boolean> => {
    try {
        await axios.put(`http://localhost:3000/tarea/${id}`, {
            id_usuario: tarea.id_usuario,
            nombre_proyecto: tarea.nombre_proyecto,
            descripcion: tarea.descripcion,
            fecha_inicio_trabajo: tarea.fecha_inicio_trabajo,
            estado: tarea.estado,
            estimado: tarea.estimado,
        });
        return true;
    } catch (error) {
        console.error('Error al modificar la tarea:', error);
        return false;
    }
};

// Eliminar tarea
export const eliminarTarea = async (id: string): Promise<boolean> => {
    try {
        await axios.delete(`http://localhost:3000/tarea/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        return false;
    }
};

// Verificar todas las tareas con días pasados y en progreso
export const verificarTodasLasTareas = async (fecha_fin: string): Promise<Tarea[]> => {
    try {
        const response = await axios.post('http://localhost:3000/verificar', { fecha_fin });
        return response.data;
    } catch (error) {
        console.error('Error al verificar las tareas:', error);
        return [];
    }
};
