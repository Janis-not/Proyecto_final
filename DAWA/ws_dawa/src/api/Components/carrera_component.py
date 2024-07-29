from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class CarreraComponent:

    @staticmethod
    def getAllcarrera(c_facultad_id):
        try:
            result = False
            data = None
            message = None
            sql = "SELECT c.carrera_id, c.nombre, c.facultad_id FROM dbproyecto.carrera c JOIN dbproyecto.facultad f ON c.facultad_id = f.facultad_id WHERE f.facultad_id = %s;"
            record = (c_facultad_id,)
            result_user = DataBaseHandle.getRecords(sql,0, record)
            if result_user['result']:
                result = True
                data = result_user['data']
            else:
                message = 'Error al Obtener datos de usuarios -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
