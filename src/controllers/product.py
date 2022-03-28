from flask import jsonify

from src.models.product import ProductModel
from src.models.user import UserModel


class ProductController:
    @classmethod
    def get_all_products(cls):
        # TODO: Make this usable by a web browser
        return ProductModel().get_all_products()

    @classmethod
    def get_product(cls, prod_id):
        # TODO: Make this usable by a web browser
        return ProductModel().get_product(prod_id)

    @classmethod
    def change_visibility(cls, prod_id, user_id, visibility: bool):
        ProductModel().db_set_visibility(user_id, prod_id, visibility)

    @classmethod
    def change_price(cls, prod_id, user_id, new_price):
        ProductModel().db_set_price(user_id, prod_id, new_price)
