from marshmallow import Schema, fields


class verificarAmistadRequest(Schema):
    estudiante_id = fields.String(required=True)
    seguido_id = fields.String(required=True)
