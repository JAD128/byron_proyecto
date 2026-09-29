export interface NodoServidor {
  id?: number;
  nombre_host: string;
  direccion_ip: string;
  motor_contenedores: 'docker' | 'podman' | 'lxc' | 'ninguno';
  proxy_inverso: boolean;
  en_produccion: boolean;
  fecha_despliegue?: string; // solo lectura, la asigna el backend
}

export const MOTORES_CONTENEDOR: { value: NodoServidor['motor_contenedores']; label: string }[] = [
  { value: 'docker', label: 'Docker' },
  { value: 'podman', label: 'Podman' },
  { value: 'lxc', label: 'LXC Linux Containers' },
  { value: 'ninguno', label: 'Sin contenedores' },
];
