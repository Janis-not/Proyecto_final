from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class ReaccionComponent:

    @staticmethod
    def Reaccion(c_estudiante_id, c_publicacion_id):
        try:
            result = False
            data = None
            message = None
            sql = """
            INSERT INTO dbproyecto.reaccion (estudiante_id, publicacion_id)
            VALUES (%s, %s);
            """
            record = (c_estudiante_id, c_publicacion_id,)

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
