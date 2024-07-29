from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import response_error, response_success, response_not_found
from ws_dawa.src.api.Components.editarestudiante_component import EdEstudianteComponent
from ws_dawa.src.api.Model.Request.edestudiante_request import EdEstudianteRequest
from flask import request
from flask_restful import Resource


class ElEstudianteService(Resource):
    @staticmethod
    def put():
        try:
            HandleLogs.write_log("Ejecutando servicio de Editar Publicacion")
            c_estudiante_id = request.args.get('id')
            if not c_estudiante_id:
                return response_error("El parámetro 'id' es requerido")
            # Obtener el request
            rq_json = request.get_json()
            # Validar ese request sea compatible con el modelo
            new_request = EdEstudianteRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = EdEstudianteComponent.EdEstudiante(rq_json['usuario'],
                                                           rq_json['nombres'], rq_json['correo'],
                                                           rq_json['intereses'], c_estudiante_id)
            if resultado['result']:
                return response_success("Se edito la publicacion con Exito")
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())