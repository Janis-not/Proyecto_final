from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class PublicaciontxtComponent:

    @staticmethod
    def publicaciontxt(c_titulo, c_estudiante_id, c_contenido):
        try:
            result = False
            data = None
            message = None
            sql = "INSERT INTO dbproyecto.publicacion (titulo, estudiante_id, contenido) VALUES (%s, %s, %s)"
            record = (c_titulo, c_estudiante_id, c_contenido)

            resul_publicacion = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_publicacion['result']:
                result = True
            else:
                message = 'Error al Crear Publiccacion ->' + resul_publicacion['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
