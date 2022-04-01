from flask import jsonify

from src.models.product import ProductModel
from src.models.user import UserModel


class ProductController:
    @classmethod
    def get_all_products(cls):
        # TODO: Make this usable by a web browser
        products = []
        for product in ProductModel().get_all_products():
            products.append(ProductController().preparer(product))
        return jsonify(products)

    @classmethod
    def get_product(cls, prod_id):
        return jsonify(ProductController().preparer(ProductModel().get_product(prod_id)))

    @classmethod
    def change_visibility(cls, prod_id, user_id, visibility: bool):
        ProductModel().db_change_visibility(user_id, prod_id, visibility)

    @classmethod
    def change_price(cls, prod_id, user_id, new_price):
        ProductModel().db_change_price(user_id, prod_id, new_price)

    @classmethod
    def change_product(cls, prod_id, user_id, changes_list):
        # TODO: Implement method. Must be given a product to change and the list of changes done to it
        pass

    @classmethod
    def add_product(cls, json):
        # TODO: Implement method. Must be given a product in a json and the
        # method must add it
        #Return id of added product
        pass

    @classmethod
    def delete_product(cls, prod_id, user_id):
        # TODO: Implement method. Must be given a product, and a user to validate, and the
        # method must delete it
        #Return id of deleted product
        pass

    @classmethod
    def preparer(cls, product):
        prodict = {'id': product.get_prod_id(), 'name': product.get_name(), 'desc': product.get_desc(),
                   'price': product.get_price(), 'category': product.get_category(), 'likes': product.get_likes(),
                   'quantity': product.get_quantity(), 'visibility': product.get_visibility()}
        return prodict