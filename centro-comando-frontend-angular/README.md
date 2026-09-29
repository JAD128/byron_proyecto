# Centro de Comando — Frontend Angular

CRUD completo en Angular (standalone components, reactive forms) para las 3 entidades
con formularios en el proyecto Django `centro_comando`:

- **Servidores** (`NodoServidor`)
- **Incidencias** (`IncidenciaServidor`)
- **Mantenimientos** (`MantenimientoNodo`)

## 1. Backend (Django)

En la carpeta del backend (`centro_comando-main/`):

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

La API queda en `http://localhost:8000/api/` con los endpoints:
`servidores/`, `incidencias/`, `mantenimientos/`, `auditorias/`.

> Se agregaron al backend original: el endpoint REST de `mantenimientos`
> (antes solo existía como vistas Django con templates) y `django-cors-headers`
> para permitir que Angular (puerto 4200) consuma la API en desarrollo.

## 2. Frontend (Angular)

```bash
npm install
ng serve
```

Abre `http://localhost:4200`. Si tu backend corre en otra URL, ajusta
`src/environments/environment.ts` (`apiUrl`).

## Estructura

```
src/app/
  core/
    models/       -> interfaces + choices (motores, severidades, tipos de tarea)
    services/     -> un servicio HTTP por entidad (list/get/create/update/delete)
  servidores/     -> lista + formulario crear/editar
  incidencias/    -> lista + formulario crear/editar
  mantenimientos/ -> lista + formulario crear/editar
  app.routes.ts   -> rutas de las 3 secciones
```

## Notas

- Los formularios validan campos obligatorios en el cliente y muestran los
  errores que devuelve el backend (por ejemplo, la validación de IP del
  segmento `192.168.100.x` que rechaza `NodoServidor`).
- Las incidencias y mantenimientos usan un `<select>` con la lista de
  servidores (cargada desde `/api/servidores/`) para el campo `servidor`
  (llave foránea).
- El proyecto se generó y se compiló (`ng build`) para verificar que no haya
  errores; `node_modules/` no se incluye — corre `npm install` para restaurarlo.
