from ws_dawa.src.api.Services.login_service import LoginService
from ws_dawa.src.api.Services.estudiante_service import UserService
from ws_dawa.src.api.Services.usuarios_service import AllUserService
from ws_dawa.src.api.Services.notAmigos_service import noAmigos
from ws_dawa.src.api.Services.registro_service import RegistroService
from ws_dawa.src.api.Services.aggAmigo_service import AggService
from ws_dawa.src.api.Services.veramigo_service import VerAmigoService
from ws_dawa.src.api.Services.recuperar_service import RecuperarpsService
from ws_dawa.src.api.Services.facultades_service import FacultadService
from ws_dawa.src.api.Services.carrera_service import CarreraService
from ws_dawa.src.api.Services.verificarAmistad_service import VerificarAmistad
from ws_dawa.src.api.Services.eliminaamigo_service import ELiminarAmigoService
from ws_dawa.src.api.Services.edestudiante_service import ElEstudianteService
from ws_dawa.src.api.Services.foto_service import FotoService
from ws_dawa.src.api.Services.fotoUsuario_service import FotoUsuarioService
from ws_dawa.src.api.Services.publicaciontxt_service import PublicaciontxtService
from ws_dawa.src.api.Services.publicacion_service import PublicacionService
from ws_dawa.src.api.Services.verpublicacion_service import VerPublicacionService
from ws_dawa.src.api.Services.verpublicacionUsuario_service import VerPublicacionUsuarioService
from ws_dawa.src.api.Services.eliminarpublicacion_service import EdPublicacionService
from ws_dawa.src.api.Services.comentario_service import ComentarioService
from ws_dawa.src.api.Services.vercomentario_service import VerComentarioService
from ws_dawa.src.api.Services.eliminarcomentario_service import ELiminarComentatioService
from ws_dawa.src.api.Services.reaccion_service import ReaccionService
from ws_dawa.src.api.Services.verReaccion_service import VerReaccionService
from ws_dawa.src.api.Services.eliminarreaccion_service import ReaccionEliminarService
from ws_dawa.src.api.Services.buscarUsuario_service import BuscarService


def load_routes(api):
    #metodo para el login
    api.add_resource(LoginService, '/estudiantes/login')
    #metodo para listar los usuarios
    api.add_resource(UserService, '/estudiantes/cuentas/')

    api.add_resource(AllUserService, '/todosUsuarios/')

    api.add_resource(noAmigos, '/usuarios/')

    api.add_resource(FacultadService, '/facultades/')

    api.add_resource(CarreraService, '/carreras/')

    api.add_resource(RegistroService, '/registro/estudiante')

    api.add_resource(AggService, '/estudiante/agregar/amigo')

    api.add_resource(VerAmigoService, '/estudiantes/ver/amigo/')

    api.add_resource(RecuperarpsService, '/estudiantes/recuperar/ps')

    api.add_resource(VerificarAmistad, '/estudiantes/verificar/amistad/')

    api.add_resource(ELiminarAmigoService, '/estudiantes/eliminar/amigo/')

    api.add_resource(ElEstudianteService, '/estudiantes/editar/')

    api.add_resource(FotoService, '/upload/')

    api.add_resource(FotoUsuarioService, '/ver/foto/usuario')

    api.add_resource(PublicaciontxtService, '/estudiantes/publicaciontxt')

    api.add_resource(PublicacionService, '/estudiantes/publicacion/crear')

    api.add_resource(VerPublicacionService, '/estudiantes/publicacion/ver')

    api.add_resource(VerPublicacionUsuarioService, '/estudiantes/publicacion/usuario/ver/')

    api.add_resource(EdPublicacionService, '/estudiantes/publicacion/eliminar/')

    api.add_resource(ComentarioService, '/estudiantes/comentario')

    api.add_resource(VerComentarioService, '/estudiantes/comentario/ver/')

    api.add_resource(ELiminarComentatioService, '/estudiantes/comentario/eliminar/')

    api.add_resource(ReaccionService, '/estudiantes/reaccion/')

    api.add_resource(VerReaccionService, '/ver/reaccion/')

    api.add_resource(ReaccionEliminarService, '/estudiantes/reaccion/eliminar')

    api.add_resource(BuscarService, '/estudiantes/buscar/')



