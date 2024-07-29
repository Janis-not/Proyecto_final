from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class UserComponent:

    @staticmethod
    def getAllestudiantes(c_estudiante_id):
        try:
            result = False
            data = None
            message = None
            sql = """SELECT 
                    e.estudiante_id,                     
                    e.nombres,                          
                    e.usuario,                
                    e.contrasenia,    
                    e.correo,
                    e.intereses,   
                    c.nombre AS carrera,  
                    f.nombre AS facultad
                FROM 
                    dbproyecto.estudiante e
                JOIN 
                    dbproyecto.carrera c ON e.carrera_id = c.carrera_id  
                JOIN 
                    dbproyecto.facultad f ON c.facultad_id = f.facultad_id
                WHERE e.estudiante_id = %s"""
            record = (c_estudiante_id,)
            result_user = DataBaseHandle.getRecords(sql,0, record)
            if result_user['result']:
                result = True
                data = result_user['data']
            else:
                message = 'Error al Obtener datos de usuarios -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

