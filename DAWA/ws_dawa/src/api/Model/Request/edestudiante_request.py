from marshmallow import Schema, fields
from marshmallow import fields, validate, ValidationError



class EdEstudianteRequest(Schema):
    usuario = fields.String(required=True)
    nombres = fields.String(required=True)
    correo = fields.String(required=True)
    intereses = fields.String(required=True)
