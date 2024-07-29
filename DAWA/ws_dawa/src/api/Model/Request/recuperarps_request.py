from marshmallow import Schema, fields
from marshmallow import fields, validate, ValidationError


class RecuperarRequest(Schema):
    contrasenia = fields.String(required=True)
    correo = fields.String(required=True)