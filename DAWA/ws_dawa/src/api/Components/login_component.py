from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class LoginComponent:

    @staticmethod
    def Login(p_user, p_clave):
        try:
            result = False
            data = None
            message = None
            sql = """SELECT e.*, c.nombre AS carrera_nombre, f.nombre AS facultad_nombre FROM
                        dbproyecto.estudiante e
JOIN
    dbproyecto.carrera c ON e.carrera_id = c.carrera_id
JOIN
    dbproyecto.facultad f ON c.facultad_id = f.facultad_id
WHERE
    e.usuario = %s
    AND e.contrasenia = %s
    AND e.user_state = true;"""
            record = (p_user, p_clave)

            resul_login = DataBaseHandle.getRecords(sql,0, record)
            if resul_login['result']:
                if resul_login['data']:
                    result = True
                    data = resul_login['data']
                else:
                    message = 'Login No Válido'
            else:
                message = resul_login['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)