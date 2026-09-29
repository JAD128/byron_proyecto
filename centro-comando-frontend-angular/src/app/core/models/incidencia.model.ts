export interface IncidenciaServidor {
  id?: number;
  servidor: number; // FK -> NodoServidor.id
  titulo: string;
  descripcion: string;
  severidad: 'baja' | 'media' | 'alta' | 'critica';
  resuelta: boolean;
  fecha_reporte?: string; // solo lectura
}

export const NIVELES_SEVERIDAD: { value: IncidenciaServidor['severidad']; label: string }[] = [
  { value: 'baja', label: 'Baja' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' },
  { value: 'critica', label: 'Crítica' },
];
