from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class RecuperarComponent:

    @staticmethod
    def Recuperar(c_constrasenia, c_correo):
        try:
            result = False
            data = None
            message = None
            sql = "Update dbproyecto.estudiante set contrasenia = %s where estudiante.correo = %s"
            record = (c_constrasenia, c_correo)

            resul_edpublicacion = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_edpublicacion['result']:
                result = True
            else:
                message = 'Error al guardar los cambios ->' + resul_edpublicacion['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)