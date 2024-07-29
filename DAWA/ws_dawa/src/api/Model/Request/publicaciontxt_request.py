from marshmallow import Schema, fields
from marshmallow import fields, validate, ValidationError


class PublicaciontxtRequest(Schema):
    titulo = fields.String(required=True)
    estudiante_id = fields.Int(required=True)
    contenido = fields.String(required=True)
