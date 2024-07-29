from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle
import base64

class UserComponent:

    @staticmethod
    def getAllestudiantes(c_estudiante_id):
        try:
            result = False
            data = None
            message = None
            sql = """SELECT estudiante.usuario, estudiante.foto_perfil, estudiante.nombres, "
                   "estudiante.carrera_id, estudiante.correo, estudiante.intereses, "
                   "carrera.nombre FROM dbproyecto.estudiante INNER JOIN dbproyecto.carrera ON "
                   "estudiante.carrera_id = carrera.carrera_id WHERE estudiante.estudiante_id = %s"""
            record = (c_estudiante_id)
            result_estudiante = DataBaseHandle.getRecords(sql,0, record)
            if result_estudiante['result']:
                result = True
                data = [
                    {
                        "usuario": row['usuario'],
                        "foto_perfil": base64.b64encode(row['foto_perfil']).decode('utf-8')
                        if isinstance(row['foto_perfil'], memoryview) else row['foto_perfil'],
                        "nombres": row['nombres'],
                        "correo": row['correo'],
                        "intereses": row['intereses'],
                        "carrera": row['nombre']
                    }
                    for row in result_estudiante['data']
                ]
            else:
                message = 'Error al Obtener datos de usuarios -> ' + result_estudiante['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
