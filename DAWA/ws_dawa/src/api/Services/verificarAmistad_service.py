from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.verificarAmistad_component import verificarAmistadComponent
from ws_dawa.src.api.Model.Request.verificarAmistad_request import verificarAmistadRequest
from flask import request
from flask_restful import Resource


class VerificarAmistad(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Registro")
            # Obtener el request
            rq_json = request.get_json()
            # Validar ese request sea compatible con el modelo
            new_request = verificarAmistadRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = verificarAmistadComponent.getAllAmistad(rq_json['estudiante_id'], rq_json['seguido_id'])
            if resultado['result']:
                data = resultado['data']
                amistad_data = None

                for row in data:
                    if amistad_data is None:
                        amistad_data = {
                            "amigo_id": row["amigo_id"],
                            "estado": row["estado"]
                        }
                response = {
                    "data": amistad_data
                }

                return response_success(response)
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
