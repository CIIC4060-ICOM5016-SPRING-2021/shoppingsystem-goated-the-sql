from flask import jsonify

from src.models.product import ProductModel
from src.models.user import UserModel


class ProductController:
    @classmethod
    def get_all_products(cls):
        # TODO: Make this usable by a web browser
        return jsonify(ProductModel().get_all_products())
        #list = []
        for product in ProductModel().get_all_products():
            print(product)
            sublist=[]
            #sublist.append(product.get_prod_id())
            #sublist.append(product.get_name())
            #sublist.append(product.get_desc())
            #sublist.append(product.get_price())
            #sublist.append(product.get_category())
            #sublist.append(product.get_likes())
            #sublist.append(product.get_quantity())
            #sublist.append(product.get_visibility())
            #list.append(sublist)
        return jsonify(list)




    @classmethod
    def get_product(cls, prod_id):
        # TODO: Make this usable by a web browser
        return ProductModel().get_product(prod_id)

    @classmethod
    def change_visibility(cls, prod_id, user_id, visibility: bool):
        ProductModel().db_change_visibility(user_id, prod_id, visibility)

    @classmethod
    def change_price(cls, prod_id, user_id, new_price):
        ProductModel().db_change_price(user_id, prod_id, new_price)
