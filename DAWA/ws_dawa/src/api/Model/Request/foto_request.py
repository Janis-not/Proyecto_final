from marshmallow import Schema, fields

class FotoRequest(Schema):
    estudiante_id = fields.String(required=True)