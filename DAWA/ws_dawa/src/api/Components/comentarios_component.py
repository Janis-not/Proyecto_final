from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class ComentarioComponent:

    @staticmethod
    def Comentario(c_estudiante_id, c_publicacion_id, c_contenido):
        try:
            result = False
            data = None
            message = None
            sql = "INSERT INTO dbproyecto.comentario (estudiante_id, publicacion_id, contenido) VALUES (%s, %s, %s)"
            record = (c_estudiante_id, c_publicacion_id, c_contenido)

            resul_comentario = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_comentario['result']:
                result = True
            else:
                message = 'Error al enviar un comentario ->' + resul_comentario['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
