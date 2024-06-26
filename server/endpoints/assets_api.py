from flask import jsonify, request
from models.assets import Assets
from models.databaseconfig import db
from models.requests import Requests
def add_assets():
    data = request.get_json()
    assetname = data.get('assetname')
    description = data.get('description')
    condition = data.get('condition')
    availability = "available"
    quantity = data.get('quantity')
    asset = Assets(assetname=assetname, description=description, condition=condition, availability=availability, quantity=quantity)
    
    db.session.add(asset)
    db.session.commit()
    return {"message": "Asset added successfully"}, 201 
def delete_assets():
    data = request.get_json()
    id = data.get('id')
    asset = Assets.query.filter_by(id=id).first()
    if asset:
        db.session.delete(asset)
        db.session.commit()
    return {"message": "Asset deleted successfully"}, 201   

def patch_assets():
    data = request.get_json()
    id = data.get('id')
    asset = Assets.query.filter_by(id=id).first()
    if asset:
        for key, value in data.items():
            setattr(asset, key, value)
        db.session.commit()
    return {"message": "Asset updated successfully"}, 201

def get_assets():
    assets = Assets.query.filter(Assets.quantity > 0).all()
    if assets:
        return jsonify([asset.to_dict() for asset in assets])
        

def get_assets_for_user():
    id = request.get_json("id")
    user_id = id['id']  # Extract the value from the dictionary
    approved_assets = db.session.query(Assets).join(Requests).filter(
        Requests.user_id == user_id,
        Requests.status =='Approved'
    ).all()
    print(approved_assets)
    return jsonify([asset.to_dict() for asset in approved_assets])