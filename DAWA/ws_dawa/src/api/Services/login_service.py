from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.login_component import LoginComponent
from ws_dawa.src.api.Model.Request.login_request import LoginRequest
from flask import request
from flask_restful import Resource
import base64



class LoginService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Login")
            # Obtener el request
            rq_json = request.get_json()
            # Validar ese request sea compatible con el modelo
            new_request = LoginRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = LoginComponent.Login(rq_json['login_user'], rq_json['login_password'])
            if resultado['result']:
                data = resultado['data']
                user_data = None

                for row in data:
                    if user_data is None:
                        user_data = {
                            "estudiante_id": row["estudiante_id"],
                            "usuario": row["usuario"],
                            "contrasenia": row["contrasenia"],
                            "nombres": row["nombres"],
                            "facultad": row["facultad_nombre"],
                            "carrera": row["carrera_nombre"],
                            "correo": row["correo"],
                            "intereses": row["intereses"],
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



