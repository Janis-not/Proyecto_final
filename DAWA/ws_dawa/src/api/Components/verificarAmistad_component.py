from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class verificarAmistadComponent:

    @staticmethod
    def getAllAmistad(c_estudiante_id, c_seguido_id):
        try:
            result = False
            data = None
            message = None
            sql = "SELECT amigo.amigo_id, amigo.estado FROM dbproyecto.amigo WHERE amigo.estudiante_id = %s AND amigo.seguido_id = %s"
            record = (c_estudiante_id, c_seguido_id)
            result_user = DataBaseHandle.getRecords(sql,0, record)
            if result_user['result']:
                if result_user['data']:
                    result = True
                    data = result_user['data']
                else:
                    message = 'No hay amistad'
            else:
                message = result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

