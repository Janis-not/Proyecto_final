from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.fotoperfil_component import FotoComponent
from flask import request
from flask_restful import Resource


class FotoService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Foto")
            # Obtener el archivo y los parámetros adicionales del request
            if 'file' not in request.files or 'estudiante_id' not in request.form:
                return response_error("Faltan parámetros en la solicitud")

            file = request.files['file']
            estudiante_id = request.form['estudiante_id']
            if file:
                # Convertir el archivo a bytes
                foto_perfil = file.read()

                resultado = FotoComponent.foto(foto_perfil, estudiante_id)
                if resultado['result']:
                    return response_success("Registro Exitoso")
                else:
                    return response_error(resultado['message'])
            else:
                return response_error("No se ha enviado un archivo")

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())