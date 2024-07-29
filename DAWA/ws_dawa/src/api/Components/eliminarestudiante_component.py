from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class EliminarEstudianteComponent:

    @staticmethod
    def EliminarEstudiante(c_estudiante_id):
        try:
            result = False
            data = None
            message = None
            sql = "Update dbproyecto.estudiante set user_state = false where estudiante.estudiante_id = %s"
            record = (c_estudiante_id)

            resul_eliminarestudiante= DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_eliminarestudiante['result']:
                result = True
            else:
                message = 'Error al eliminar la publicacion ->' + resul_eliminarestudiante['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)