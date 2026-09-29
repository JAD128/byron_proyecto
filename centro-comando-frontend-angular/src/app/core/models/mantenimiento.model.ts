export interface MantenimientoNodo {
  id?: number;
  servidor: number; // FK -> NodoServidor.id
  titulo_tarea: string;
  descripcion_tecnica: string;
  tipo: 'actualizacion' | 'backup' | 'seguridad' | 'hardware';
  completado: boolean;
  fecha_programada: string; // ISO datetime
}

export const TIPO_TAREA: { value: MantenimientoNodo['tipo']; label: string }[] = [
  { value: 'actualizacion', label: 'Actualización de Sistema' },
  { value: 'backup', label: 'Respaldo de Base de Datos' },
  { value: 'seguridad', label: 'Parche de Seguridad' },
  { value: 'hardware', label: 'Revisión de Hardware' },
];
