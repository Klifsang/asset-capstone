from flask import jsonify, request, session
from models.requests import Requests
from models.databaseconfig import db
from models.Notifications import Notifications
from models.assets import Assets
from models.employee import Employee
def add_requests():
    data = request.get_json()
    asset_id = data['assetId']
    user_id = data['userId']
    comment = data['comment']
    quantity = data['quantity']
    user = Employee.query.get(user_id)
    if user and user.status == 'Approved':
        new_request = Requests(asset_id=asset_id, user_id=user_id, comment=comment, quantity=quantity)
        db.session.add(new_request)
        db.session.commit()
        return {"message": "Request added successfully"}, 201
    else:
        return {"message": "You are not authorized to add a request"}, 401
    

def delete_requests(id):
    rquest = Requests.query.filter_by(id=id).first()
    if rquest:
        db.session.delete(rquest)
        db.session.commit()
    return {"message": "Request deleted successfully"}, 201   

def patch_requests():
    data = request.get_json()
    id = data.get('id')
    rquest = Requests.query.filter_by(id=id).first()
    if rquest:
        for key, value in data.items():
            setattr(rquest, key, value)
            status = "pending"
            if value == "Approved":
                # Reduce the quantity of the asset
                asset = Assets.query.get(rquest.asset_id)
                if asset and asset.quantity > 0:
                    status = "approved"
                    print (asset.quantity)
                    asset.quantity -= 1
                notif = Notifications(request_id=id, user_id=rquest.user_id, status=status, asset_id=rquest.asset_id, assetname=asset.assetname)
                db.session.add(notif)
            db.session.commit()
    return {"message": "Request updated successfully"}, 201


def get_requests():
    requests = Requests.query.all()
    if requests:
        requests_data = []
        for request in requests:
            asset = Assets.query.get(request.asset_id)
            employee = Employee.query.get(request.user_id)  # Assuming the user_id refers to the employee
            if asset and employee:
                request_data = request.to_dict()
                request_data['assetname'] = asset.assetname
                request_data['image_url'] = asset.image_url
                request_data['username'] = employee.username  # Add the username of the staff member
                requests_data.append(request_data)
        return jsonify(requests_data)
    else:
        return jsonify([])


def my_requests():
    id = session["user_id"]
    requests = Requests.query.filter_by(user_id=id).all()
    if requests:
        # Fetch the assets for each request
        requests_data = []
        for request in requests:
            asset = Assets.query.get(request.asset_id)
            employee = Employee.query.get(request.user_id)  # Assuming the user_id refers to the employee
            if asset:
                request_data = request.to_dict()
                request_data['assetname'] = asset.assetname
                request_data['image_url'] = asset.image_url
                request_data['username'] = employee.username  # Add the username of the staff member
                requests_data.append(request_data)
        return jsonify(requests_data)
    else:
        return jsonify([])