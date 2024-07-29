from marshmallow import Schema, fields


class BuscarRequest(Schema):
    estudiante_nombres = fields.String(required=True)
