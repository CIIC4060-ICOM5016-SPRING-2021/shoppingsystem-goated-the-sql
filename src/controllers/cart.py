from flask import jsonify
from src.models.cart import CartModel
from src.models.product import ProductModel


class CartController:
    @classmethod
    def get_cart(cls, usr_id: int):
        return jsonify(CartModel.get_cart(usr_id))

    @classmethod
    def add_product(cls, usr_id, json):
        if not json:
            return False

        prod_id = json['product_id']
        quantity = json['quantity']
        item = ProductModel.get_product(prod_id)
        # TODO check if item is already in the users cart and add quantity to the record
        if quantity > item.get_stock():
            return False
        temp_cart = CartModel()
        temp_cart.set_user_id(usr_id)
        temp_cart.set_product_id(prod_id)
        temp_cart.set_product_price(item.get_price())
        temp_cart.set_product_quantity(quantity)

        return temp_cart.add_item()
