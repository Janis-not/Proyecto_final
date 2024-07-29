from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class VerReaccionComponent:

    @staticmethod
    def getReacciones(c_publicacion_id):
        try:
            result = False
            data = None
            message = None
            sql = """SELECT COUNT(*) AS total_reacciones 
FROM dbproyecto.reaccion 
WHERE publicacion_id = %s;"""

            record = (c_publicacion_id,)

            result_vercomentario = DataBaseHandle.getRecords(sql,0, record)
            if result_vercomentario['result']:
                result = True
                data = result_vercomentario['data']
            else:
                message = 'Error al Obtener las reacciones -> ' + result_vercomentario['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)