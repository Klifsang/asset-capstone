from app import db

class Notifications(db.Model):
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    request_id = db.Column(db.Integer, db.ForeignKey('requests.id'), default=1)
    user_id = db.Column(db.Integer)
    asset_id = db.Column(db.Integer)
    status = db.Column(db.String)
    assetname =db.Column(db.String)
    read = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'request_id': self.request_id,
            'user_id': self.user_id,
            'asset_id': self.asset_id,
            'status': self.status,
            'assetname': self.assetname,
            'read': self.read,
        }