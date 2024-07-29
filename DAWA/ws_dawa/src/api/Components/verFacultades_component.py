from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class FacultadComponent:

    @staticmethod
    def getAllFacultad():
        try:
            result = False
            data = None
            message = None
            sql = "SELECT * FROM dbproyecto.facultad"
            record = ()
            result_user = DataBaseHandle.getRecords(sql,0, record)
            if result_user['result']:
                result = True
                data = result_user['data']
            else:
                message = 'Error al Obtener datos de facultad -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

