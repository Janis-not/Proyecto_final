from marshmallow import Schema, fields


class ReaccionRequest(Schema):
    estudiante_id = fields.String(required=True)
    publicacion_id = fields.String(required=True)
