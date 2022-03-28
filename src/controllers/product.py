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

    def change_visibility(self, prod_id, user_id, visibility: bool):
        # TODO: Move this check to the models section?
        if UserModel().get_user(user_id).db_is_admin():
            product = ProductModel().get_product(prod_id)
            product.set_visibility(visibility)
            ProductModel().update_product(prod_id, product)


    def change_price(self, prod_id, user_id, new_price):
        # TODO: Move this check to the models section?
        if UserModel().get_user(user_id).db_is_admin():
            product = ProductModel().get_product(prod_id)
            product.set_price(new_price)
