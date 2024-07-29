from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class EliminarPublicacionComponent:

    @staticmethod
    def EliminarPublicacion(c_publicacion_id):
        try:
            result = False
            data = None
            message = None
            sql = "Update dbproyecto.publicacion set estado = false where publicacion.publicacion_id = %s"
            record = (c_publicacion_id,)

            resul_eliminarpublicacion = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_eliminarpublicacion['result']:
                result = True
            else:
                message = 'Error al eliminar la publicacion ->' + resul_eliminarpublicacion['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)