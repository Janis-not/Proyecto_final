from marshmallow import Schema, fields
from marshmallow import fields, validate, ValidationError
import base64

class RegistroRequest(Schema):
    usuario = fields.String(required=True)
    contrasenia = fields.String(required=True)
    nombres = fields.String(required=True)
    carrera_id = fields.Int(required=True)
    correo = fields.String(required=True)
    intereses = fields.String(required=True)
