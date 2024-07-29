from marshmallow import Schema, fields


class FotoUsuarioRequest(Schema):
    estudiante_id = fields.String(required=True)
