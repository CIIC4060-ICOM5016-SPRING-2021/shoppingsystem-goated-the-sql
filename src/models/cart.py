from flask import jsonify
from src.models.dao.backend import BackEnd

class CartModel:
    __cart_id: int
    __product_id: int
    __usr_id: int
    __product_quantity: int
    __product_price: float

    # Cart ID Getter:
    def get_cart_id(self):
        return self.__cart_id

    # Cart ID Setter:
    def set_cart_id(self, cart_id: int):
        self.__cart_id = cart_id

    # Product ID Getter:
    def get_product_id(self):
        return self.__product_id

    # Product ID Setter:
    def set_product_id(self, product_id: int):
        self.__product_id = product_id

    # User ID Getter:
    def get_user_id(self):
        return self.__usr_id

    # User ID Setter:
    def set_user_id(self, usr_id: int):
        self.__usr_id = usr_id

    # Product Quantity Getter:
    def get_product_quantity(self):
        return self.__product_quantity

    # Product Quantity Setter:
    def set_product_quantity(self, product_quantity: int):
        self.__cart_id = product_quantity

    # Product Price Getter:
    def get_product_price(self):
        return self.__product_price

    # Product Price Setter:
    def set_product_price(self, product_price: int):
        self.__cart_id = product_price

    @classmethod
    def get_cart(cls, user_id):
        list_of_products = BackEnd.get_all_elements(CartModel(), "*", "user_id={}".format(user_id))
        return jsonify(list_of_products)
