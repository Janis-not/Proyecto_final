from marshmallow import Schema, fields

class PublicacionRequest(Schema):
    titulo = fields.String(required=True)
    estudiante_id = fields.Int(required=True)
    contenido = fields.String(required=True)

