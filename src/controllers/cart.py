from flask import jsonify
from src.models.cart import CartModel

class CartController:
    def get_cart(self, usr_id: int):
        # TODO: Implement calls to logic in models package
        return CartModel.get_cart(usr_id)