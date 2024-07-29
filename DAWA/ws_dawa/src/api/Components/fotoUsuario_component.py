from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class fotoUsuarioComponent:

    @staticmethod
    def verfotoUsuario(c_usuario_id):
        try:
            result = False
            data = None
            message = None
            sql = """SELECT estudiante.foto_perfil FROM dbproyecto.estudiante WHERE estudiante.estudiante_id = %s;"""
            record = (c_usuario_id, )

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