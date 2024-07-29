from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle
import base64

class verPublicacionComponent:

    @staticmethod
    def getPublicacion():
        try:
            result = False
            data = None
            message = None
            sql = """
           SELECT 
                p.publicacion_id, 
                p.titulo, 
                e.nombres, 
                e.usuario, 
                p.imagen, 
                p.contenido, 
                p.fecha, 
                p.hora, 
                p.estado, 
                COALESCE(COUNT(r.publicacion_id), 0) AS total_reacciones
            FROM 
                dbproyecto.publicacion p 
            JOIN 
                dbproyecto.estudiante e ON p.estudiante_id = e.estudiante_id
            LEFT JOIN 
                dbproyecto.reaccion r ON p.publicacion_id = r.publicacion_id
            WHERE 
                p.estado = TRUE
            GROUP BY 
                p.publicacion_id, 
                p.titulo, 
                e.nombres, 
                e.usuario, 
                p.imagen, 
                p.contenido, 
                p.fecha, 
                p.hora, 
                p.estado
            ORDER BY 
                p.publicacion_id DESC;
            """
            result_publicacion = DataBaseHandle.getRecords(sql,0)
            if result_publicacion['result']:
                result = True
                for message in result_publicacion['data']:
                    message['fecha'] = message['fecha'].strftime('%Y-%m-%d')
                    message['hora'] = message['hora'].strftime('%H:%M:%S')
                result = True
                data = [
                    {
                        "publicacion_id": row['publicacion_id'],
                        "titulo": row['titulo'],
                        "nombres": row['nombres'],
                        "usuario": row['usuario'],
                        "imagen": base64.b64encode(row['imagen']).decode('utf-8')
                        if isinstance(row['imagen'], memoryview) else row['imagen'],
                        "contenido": row['contenido'],
                        "fecha": row['fecha'],
                        "hora": row['hora'],
                        "estado": row['estado'],
                        "total_reacciones": row['total_reacciones']
                    }
                    for row in result_publicacion['data']
                ]
            else:
                message = 'Error al Obtener datos de usuarios -> ' + result_publicacion['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)