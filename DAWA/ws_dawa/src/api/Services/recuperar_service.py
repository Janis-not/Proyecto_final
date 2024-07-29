from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.recuperar_component import RecuperarComponent
from ws_dawa.src.api.Model.Request.recuperarps_request import RecuperarRequest
from flask import request
from flask_restful import Resource


class RecuperarpsService(Resource):
    @staticmethod
    def put():
        try:
            HandleLogs.write_log("Ejecutando servicio de Recuperar")
            # Obtener el request
            rq_json = request.get_json()
            # Validar ese request sea compatible con el modelo
            new_request = RecuperarRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = RecuperarComponent.Recuperar(rq_json['contrasenia'], rq_json['correo'])
            if resultado['result']:
                return response_success("Registro Exitoso")
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
