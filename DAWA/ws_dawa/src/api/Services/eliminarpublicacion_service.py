from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.eliminarpublicacion_component import EliminarPublicacionComponent
from flask import request
from flask_restful import Resource


class EdPublicacionService(Resource):
    @staticmethod
    def put():
        try:
            HandleLogs.write_log("Ejecutando servicio de Eliminar Publicacion")
            c_publicacion_id = request.args.get('id')
            if not c_publicacion_id:
                return response_error("El parámetro 'id' es requerido")

            resultado = EliminarPublicacionComponent.EliminarPublicacion(c_publicacion_id)
            if resultado['result']:
                return response_success("Se elimino la publicacion con Exito")
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
