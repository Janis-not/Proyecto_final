from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class FotoComponent:

    @staticmethod
    def foto(c_foto_perfil, c_estudiante_id):
        try:
            result = False
            data = None
            message = None
            # Utilizamos un marcador de posición para la imagen en el SQL
            sql = "UPDATE dbproyecto.estudiante SET foto_perfil = %s WHERE estudiante_id = %s"
            record = (c_foto_perfil, c_estudiante_id)

            resul_foto = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_foto['result']:
                result = True
                message = "Registro exitoso"
            else:
                message = 'Error al registrar la foto -> ' + resul_foto['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)