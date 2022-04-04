from flask import jsonify
from src.models.cart import CartModel


class CartController:
    @classmethod
    def get_cart(cls, usr_id: int):
        return CartModel.get_cart(usr_id)

    @classmethod
    def add_product(cls, usr_id, json):
        temp_cart = CartModel()
        temp_cart.set_product_id(json['product id'])
        temp_cart.set_product_quantity(json['quantity'])
        return temp_cart.add_item()
