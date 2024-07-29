from marshmallow import Schema, fields


class ReaccionEliminarRequest(Schema):
    estudiante_id = fields.String(required=True)
    publicacion_id = fields.String(required=True)
