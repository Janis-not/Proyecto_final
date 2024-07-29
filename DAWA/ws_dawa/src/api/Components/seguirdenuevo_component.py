from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class AmigoSeguirdenuevoComponent:

    @staticmethod
    def Amigoseguirdenueco(c_amigo_id):
        try:
            result = False
            data = None
            message = None
            sql = "UPDATE dbproyecto.amigo SET estado = true WHERE amigo.amigo_id = %s"
            record = (c_amigo_id)
            amigo_result = DataBaseHandle.ExecuteNonQuery(sql, record)
            if amigo_result['result']:
                result = True
                data = "Message status updated successfully."
            else:
                message = 'Error updating message status -> ' + amigo_result['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
