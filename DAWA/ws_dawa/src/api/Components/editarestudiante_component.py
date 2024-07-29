from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class EdEstudianteComponent:

    @staticmethod
    def EdEstudiante(c_usuario, c_nombres, c_correo, c_intereses, c_estudiante_id):
        try:
            result = False
            data = None
            message = None
            sql = "Update dbproyecto.estudiante set usuario = %s, nombres = %s, correo = %s, intereses = %s where estudiante.estudiante_id = %s"
            record = (c_usuario, c_nombres, c_correo, c_intereses, c_estudiante_id)

            resul_edestudiante = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_edestudiante['result']:
                result = True
            else:
                message = 'Error al guardar los cambios ->' + resul_edestudiante['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)