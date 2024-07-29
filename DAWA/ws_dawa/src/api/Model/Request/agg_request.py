from marshmallow import Schema, fields


class AggRequest(Schema):
    estudiante_id = fields.Int(required=True)
    seguido_id = fields.Int(required=True)