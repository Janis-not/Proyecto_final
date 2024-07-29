from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class VerAmigosComponent:

    @staticmethod
    def getAllamigos(c_estudiante_id):
        try:
            result = False
            data = None
            message = None
            sql = ("SELECT DISTINCT estudiante.estudiante_id, amigo.estado, estudiante.nombres, estudiante.usuario FROM dbproyecto.amigo INNER JOIN dbproyecto.estudiante ON amigo.seguido_id = estudiante.estudiante_id WHERE amigo.estudiante_id = %s;")
            record = (c_estudiante_id,)
            result_user = DataBaseHandle.getRecords(sql,0, record)
            if result_user['result']:
                result = True
                data = result_user['data']
            else:
                message = 'Error al Obtener datos de los amigos -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
