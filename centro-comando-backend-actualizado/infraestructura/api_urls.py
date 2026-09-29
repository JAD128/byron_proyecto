from rest_framework.routers import DefaultRouter

from .api_views import (
    IncidenciaServidorViewSet,
    MantenimientoNodoViewSet,
    NodoServidorViewSet,
    RegistroAuditoriaViewSet,
)


router = DefaultRouter()
router.register('servidores', NodoServidorViewSet, basename='servidor')
router.register('auditorias', RegistroAuditoriaViewSet, basename='auditoria')
router.register('incidencias', IncidenciaServidorViewSet, basename='incidencia')
router.register('mantenimientos', MantenimientoNodoViewSet, basename='mantenimiento')

urlpatterns = router.urls