from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.verFacultades_component import FacultadComponent
from flask import request
from flask_restful import Resource


class FacultadService(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Ejecutando servicio de Listar Usuario")  # Log the execution
            resultado = FacultadComponent.getAllFacultad()  # Fetch faculties data

            if resultado['result']:
                if resultado['data'].__len__() > 0:
                    return response_success(resultado['data'])  # Return successful response
                else:
                    return response_not_found()  # Return not found response
            else:
                return response_error(resultado['message'])  # Return error response

        except Exception as err:
            HandleLogs.write_error(err)  # Log the error
            return response_error("Error en el método: " + err.__str__())  # Return error response

