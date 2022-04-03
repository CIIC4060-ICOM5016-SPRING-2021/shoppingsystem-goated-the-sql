from flask import jsonify

from src.models.dao.backend import BackEnd
from src.models.liked_list import LikedListModel
from src.models.product import ProductModel


class ProductController:
    @classmethod
    def get_all_products(cls):
        """
            Prompts the database to get the full catalog of products

        :return: list of JSONs containing all the products in the database
        """
        products = []

        for product in ProductModel().get_all_products():
            products.append(ProductController().preparer(product))
        return jsonify(products)

    @classmethod
    def get_product(cls, prod_id):
        """
            Prompts the database to search for a product

        :param prod_id: id of the product being searched for
        :return: JSON containing the queried product, 404 error if not found
        """
        queried_product = ProductModel().get_product(prod_id)

        if not queried_product:
            return jsonify("Product Not Found"), 404
        else:
            return ProductController().preparer(queried_product)

    @classmethod
    def change_visibility(cls, prod_id, user_id, visibility: bool):
        """
            Prompts the database to make a visibility parameter change to a product.

        :param prod_id: id of the product to be altered
        :param user_id: id of the user requesting the change
        :param visibility: updated visibility state of the product
        """
        ProductModel().db_change_visibility(user_id, prod_id, visibility)

    @classmethod
    def change_price(cls, prod_id, user_id, new_price):
        """
            Prompts the database to make a price change to a product.

        :param prod_id: id of the product to be altered
        :param user_id: id of the user requesting the change
        :param new_price: updated price of the product
        """
        ProductModel().db_change_price(user_id, prod_id, new_price)

    @classmethod
    def change_product(cls, prod_id, user_id, changes_list):
        # TODO: Implement method. Must be given a product to change and the list of changes done to it
        # Must validate user before letting the change go through. If the user
        # doesn't hae admin status, return action forbidden error. If it is an user and not an admin
        # the change can only be a like.

        # adding a like to a product, nothing more
        if changes_list['like'] == 1:
            BackEnd().create_element(LikedListModel(), user_id, prod_id)

    @classmethod
    def add_product(cls, request_json):
        """
            Prompts the database to add a new product to the catalog

        :param request_json:
        :return: 200 and product details when successfully created, 500 on failed product creation
        """
        temp_product = ProductModel()
        temp_product.set_name(request_json['name'])
        temp_product.set_desc(request_json['description'])
        temp_product.set_price(request_json['price'])
        temp_product.set_category(request_json['category'])
        temp_product.set_stock(request_json['stock'])
        new_product = temp_product.add_product()

        if new_product:
            return jsonify(cls.model_to_dict(new_product)), 200
        else:
            return jsonify("Unable to create the product."), 500

    @classmethod
    def delete_product(cls, prod_id, user_id):
        # TODO: Implement method. Must be given a product, and a user to validate, and the
        # method must delete it
        # Return id of deleted product
        pass

    @classmethod
    def preparer(cls, product):
        """
            Creates a python dictionary equivalent of a given Product Model

        :param product: ProductModel to convert
        :return: dictionary equivalent of the ProductModel given
        """
        prodict = {
            'id': product.get_prod_id(),
            'name': product.get_name(),
            'desc': product.get_desc(),
            'price': product.get_price(),
            'category': product.get_category(),
            'quantity': product.get_stock(),
            'visible': product.get_visibility()
        }
        return prodict

    @classmethod
    def json_to_model(cls, request):
        """
            Creates a Product Entity Model from a received request in JSON.

        :param request: request received via HTTP
        :return: Product Entity Model
        """
        model = ProductModel()

        model.set_prod_id(request['product_id'])
        model.set_visibility(request['visible'])
        model.set_name(request['name'])
        model.set_desc(request['description'])
        model.set_price(request['price'])
        model.set_category(request['category'])
        model.set_stock(request['stock'])

        return model
