from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class ComentarioEliminadoComponent:

    @staticmethod
    def ComentarioEliminado(c_comentario_id):
        try:
            result = False
            data = None
            message = None
            sql = """
            UPDATE dbproyecto.comentario
            SET estado = false
            WHERE comentario.comentario_id = %s
            """
            record = (c_comentario_id)
            update_result = DataBaseHandle.ExecuteNonQuery(sql, record)
            if update_result['result']:
                result = True
                data = "Message status updated successfully."
            else:
                message = 'Error updating message status -> ' + update_result['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
