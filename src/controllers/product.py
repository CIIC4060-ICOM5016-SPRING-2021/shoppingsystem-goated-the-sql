from flask import jsonify

from src.models.dao.backend import BackEnd
from src.models.liked_list import LikedListModel
from src.models.product import ProductModel


class ProductController:
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
            return ProductController().model_to_dict(queried_product)

    @classmethod
    def get_all_products(cls):
        """
            Prompts the database to get the full catalog of products

        :return: list of JSONs containing all the products in the database
        """
        products = []

        for product in ProductModel().get_all_products():
            products.append(ProductController().model_to_dict(product))
        return jsonify(products)

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
    def update_product(cls, request_json, user_id_json_obj):
        """
            Prompts the database for an attribute change in the requested product.

        :param request_json: json object containing product information received
        :param user_id_json_obj: json object containing the id of the user requesting the change
        :return: 200 if completed successfully, 500 if problem was encountered while making the change, 403 if user is
        not authorized to request the change, 406 if no changes are detected
        """
        product_model = cls.json_to_model(request_json)

        try:
            updated = ProductModel.db_update_product(product_model, user_id_json_obj['user_id'])
            if updated:
                return jsonify("Product Updated"), 200
            else:
                return jsonify("Unable to update product"), 500
        except ValueError:
            return jsonify("User is not authorized"), 403
        except AttributeError:
            return jsonify("No changes to product detected"), 204

    @classmethod
    def delete_product(cls, prod_id, user_id):
        """
            Prompts the database to delete a product.

        :param prod_id: id of the product requested to delete
        :param user_id: id of the user requesting the deletion
        :return: 200 if successfully deleted, 500 if problem was encountered while making the deletion, 403 if user is
        not authorized to request the deletion
        """
        try:
            deleted = ProductModel().db_delete_product(prod_id, user_id)
            if deleted:
                return jsonify("Product Deleted"), 200
            else:
                return jsonify("Unable to delete product"), 500
        except ValueError:
            return jsonify("User is not authorized"), 403

    @classmethod
    def model_to_dict(cls, product):
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
