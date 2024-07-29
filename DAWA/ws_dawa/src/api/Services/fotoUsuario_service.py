from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.fotoUsuario_component import fotoUsuarioComponent
from ws_dawa.src.api.Model.Request.fotoUsuario_request import FotoUsuarioRequest
from flask import request
from flask_restful import Resource
import base64



class FotoUsuarioService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Login")
            # Obtener el request
            rq_json = request.get_json()
            # Validar ese request sea compatible con el modelo
            new_request = FotoUsuarioRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = fotoUsuarioComponent.verfotoUsuario(rq_json['estudiante_id'])
            if resultado['result']:
                data = resultado['data']
                user_data = None

                for row in data:
                    if user_data is None:
                        user_data = {
                            "foto_perfil": base64.b64encode(row['foto_perfil']).decode('utf-8')
                            if isinstance(row['foto_perfil'], memoryview) else row['foto_perfil']
                        }
                response = {
                    "result": True,
                    "message": "Exitoso",
                    "data": user_data
                }
                return response_success(response)
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())



