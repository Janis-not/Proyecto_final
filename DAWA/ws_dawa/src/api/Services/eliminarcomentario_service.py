from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.eliminarcomentario_component import ComentarioEliminadoComponent
from flask import request
from flask_restful import Resource


class ELiminarComentatioService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Eliminar Publicacion")
            c_comentario_id = request.args.get('id')
            if not c_comentario_id:
                return response_error("El parámetro 'id' es requerido")

            resultado = ComentarioEliminadoComponent.ComentarioEliminado(c_comentario_id)
            if resultado['result']:
                return response_success("Se elimino el comentario con Exito")
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
