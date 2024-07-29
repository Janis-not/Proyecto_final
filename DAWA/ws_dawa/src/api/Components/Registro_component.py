from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class RegistroComponent:

    @staticmethod
    def Registro(c_usuario, c_contrasenia, c_nombres, c_carrera_id, c_correo, c_intereses):
        try:
            result = False
            data = None
            message = None
            sql = "INSERT INTO dbproyecto.estudiante (usuario, contrasenia, nombres, carrera_id, correo, intereses) VALUES (%s, %s, %s, %s, %s, %s)"
            record = (c_usuario, c_contrasenia, c_nombres, c_carrera_id, c_correo, c_intereses)

            resul_login = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_login['result']:
                result = True
                message = "Registro exitoso"
            else:
                message = 'Error al registrar a un usuario ->' + resul_login['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
