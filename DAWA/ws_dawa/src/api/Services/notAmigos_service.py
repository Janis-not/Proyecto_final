from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.noAmigos_component import noAmigosComponent
from flask import request
from flask_restful import Resource


class noAmigos(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Ejecutando servicio de Listar Usuario")
            c_estudiante_id = request.args.get('id')

            if not c_estudiante_id:
                return response_error("El parámetro 'id' es requerido")

            resultado = noAmigosComponent.getAllnoAmigos(c_estudiante_id)
            if resultado['result']:
                if resultado['data'].__len__() > 0:
                    return response_success(resultado['data'])
                else:
                    return response_not_found()
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
