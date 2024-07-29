from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.publicacion_component import PublicacionComponent
from flask import request
from flask_restful import Resource


class PublicacionService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Registro")
            # Obtener el request
            if 'file' not in request.files or 'estudiante_id' not in request.form:
                return response_error("Faltan parámetros en la solicitud")

            file = request.files['file']
            titulo = request.form['titulo']
            estudiante_id = request.form['estudiante_id']
            contenido = request.form['contenido']
            if file:
                imagen = file.read()
                resultado = PublicacionComponent.publicacionFoto(titulo, estudiante_id, contenido, imagen)
                if resultado['result']:
                    return response_success("Registro Exitoso")
                else:
                    return response_error(resultado['message'])
            else:
                return response_error("No se ha enviado un archivo")

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())