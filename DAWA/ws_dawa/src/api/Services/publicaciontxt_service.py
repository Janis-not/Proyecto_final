from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.publicaciontxt_componet import PublicaciontxtComponent
from ws_dawa.src.api.Model.Request.publicaciontxt_request import PublicaciontxtRequest
from flask import request
from flask_restful import Resource


class PublicaciontxtService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Registro")
            # Obtener el request
            rq_json = request.get_json()
            # Validar ese request sea compatible con el modelo
            new_request = PublicaciontxtRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = PublicaciontxtComponent.publicaciontxt(rq_json['titulo'], rq_json['estudiante_id'],
                                                               rq_json['contenido'])
            if resultado['result']:
                return response_success("Publicacion Creada")
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
