from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class VerComentarioComponent:

    @staticmethod
    def getComentarios(c_publicacion_id):
        try:
            result = False
            data = None
            message = None
            sql = "SELECT estudiante.nombres, estudiante.estudiante_id, publicacion.titulo, comentario.contenido, comentario.estado, comentario.comentario_id FROM dbproyecto.comentario INNER JOIN dbproyecto.estudiante ON comentario.estudiante_id = estudiante.estudiante_id INNER JOIN dbproyecto.publicacion ON comentario.publicacion_id = publicacion.publicacion_id  WHERE comentario.publicacion_id = %s AND comentario.estado = TRUE"
            record = (c_publicacion_id,)
            result_vercomentario = DataBaseHandle.getRecords(sql,0, record)
            if result_vercomentario['result']:
                result = True
                data = result_vercomentario['data']
            else:
                message = 'Error al Obtener los comentarios -> ' + result_vercomentario['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)