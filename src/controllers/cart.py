from flask import jsonify
from src.models.cart import CartModel
from src.models.product import ProductModel


class CartController:
    @classmethod
    def get_cart(cls, usr_id: int):
        user_cart = []
        for item in CartModel.get_cart(usr_id):
            user_cart.append(CartController.model_to_dict(item))

        return user_cart

    @classmethod
    def model_to_dict(cls, cart: CartModel):
        """
            Creates a python dictionary equivalent of a given Cart Model

        :param cart: CartModel to convert
        :return: dictionary equivalent of the CartModel given
        """
        cartdict = {
            'product_id': cart.get_product_id(),
            'usr_id': cart.get_user_id(),
            'quantity': cart.get_product_quantity(),
            'product_price': cart.get_product_price()
        }
        return cartdict

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

    @classmethod
    def delete_cart(cls, usr_id, json):
        return CartModel.delete_item(usr_id, json['product_id'])

    @classmethod
    def clear_cart(cls, usr_id):
        return CartModel.clear_cart(usr_id)

    @classmethod
    def update_quantity(cls, usr_id, json):
        if json is None:
            return False
        else:
            return CartModel.update_quantity(usr_id, json['product_id'], json['quantity'])
