from marshmallow import Schema, fields
from marshmallow import fields, validate, ValidationError


class ComentariosRequest(Schema):
    estudiante_id = fields.Int(required=True)
    publicacion_id = fields.Int(required=True)
    contenido = fields.String(required=True)
