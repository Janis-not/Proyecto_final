from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class RecuperarComponent:

    @staticmethod
    def Recuperar(c_contrasenia, c_correo):
        try:
            result = False
            data = None
            message = None
            sql = "Update dbproyecto.estudiante set contrasenia = %s where estudiante.correo = %s"
            record = (c_contrasenia, c_correo)

            resul_login = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_login['result']:
                result = True
                message = "contrasenia reestablecida"
            else:
                message = 'Error al actualizar a un usuario ->' + resul_login['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
