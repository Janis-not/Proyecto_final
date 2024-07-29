from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.eliminaramigo_component import AmigoEliminadoComponent
from flask import request
from flask_restful import Resource


class ELiminarAmigoService(Resource):
    @staticmethod
    def put():
        try:
            HandleLogs.write_log("Ejecutando servicio de Dejar de Seguir")
            c_amigo_id = request.args.get('id')
            if not c_amigo_id:
                return response_error("El parámetro 'id' es requerido")

            resultado = AmigoEliminadoComponent.AmigoEliminado(c_amigo_id)
            if resultado['result']:
                return response_success("Se Dejo de seguir :D")
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
