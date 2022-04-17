from flask import jsonify
from src.models.dao.backend import BackEnd

class CartModel:
    __product_id: int
    __usr_id: int
    __product_quantity: int
    __product_price: float

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
        self.__product_quantity = product_quantity

    # Product Price Getter:
    def get_product_price(self):
        return self.__product_price

    # Product Price Setter:
    def set_product_price(self, product_price: int):
        self.__product_price = product_price

    @classmethod
    def get_cart(cls, user_id):
        list_of_products = BackEnd.get_all_elements(CartModel(), "*", "user_id={}".format(user_id))
        return list_of_products

    def add_item(self):
        return BackEnd.create_element(self)

    @classmethod
    def clear_cart(cls, usr_id):
        return BackEnd.delete_element(CartModel(), usr_id)

    @classmethod
    def delete_item(cls, usr_id, product_id):
        return BackEnd.delete_element(CartModel(), usr_id, product_id)

    @classmethod
    def update_quantity(cls, usr_id, product_id, quantity):
        return BackEnd.update_element_attribute('cart', 'product_quantity={}'.format(quantity),
                                                'user_id={} AND product_id={}'.format(usr_id, product_id))
