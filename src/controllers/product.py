from flask import jsonify

from src.models.product import ProductModel
from src.models.user import UserModel


class ProductController:
    @classmethod
    def get_all_products(cls):
        products = []
        for product in ProductModel().get_all_products():
            products.append(ProductController().preparer(product))
        return jsonify(products)

    @classmethod
    def get_product(cls, prod_id):
        queried_product = ProductModel().get_product(prod_id)

        if not queried_product:
            return jsonify("Product Not Found"), 404
        else:
            return jsonify(ProductController().preparer(queried_product)), 200

    @classmethod
    def change_visibility(cls, prod_id, user_id, visibility: bool):
        ProductModel().db_change_visibility(user_id, prod_id, visibility)

    @classmethod
    def change_price(cls, prod_id, user_id, new_price):
        ProductModel().db_change_price(user_id, prod_id, new_price)

    @classmethod
    def preparer(cls, product):
        prodict = {'id': product.get_prod_id(), 'name': product.get_name(), 'desc': product.get_desc(),
                   'price': product.get_price(), 'category': product.get_category(), 'likes': product.get_likes(),
                   'quantity': product.get_quantity(), 'visibility': product.get_visibility()}
        return prodict
