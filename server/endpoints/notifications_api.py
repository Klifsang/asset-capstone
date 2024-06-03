from flask import jsonify, request, session
from models.Notifications import Notifications
from app import db

def get_notifications():
    """
    Returns a list of all notifications
    """
    id = session["user_id"]
    notifs = Notifications.query.filter_by(user_id = id).all()
    return jsonify([notif.to_dict() for notif in notifs]),200

def delete_notifications(id):
    """
    Deletes all notifications
    """
    Notifications.query.filter_by(id = id).delete()
    db.session.commit()
    return jsonify({"message": "Notifications deleted"}),200

def mark_as_read(id):
    """
    Marks a notification as read
    """
    notif = Notifications.query.filter_by(id = id).first()
    if notif:
        notif.read = True
        db.session.commit()
    return jsonify({"message": "Notification marked as read"}),200