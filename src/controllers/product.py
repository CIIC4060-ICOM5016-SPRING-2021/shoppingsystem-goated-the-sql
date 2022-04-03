from flask import jsonify

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
            return jsonify(ProductController().model_to_dict(queried_product)), 200

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
    def add_product(cls, json):
        temp_product = ProductModel()
        temp_product.set_name(json['name'])
        temp_product.set_desc(json['desc'])
        temp_product.set_price(json['price'])
        temp_product.set_category(json['category'])
        temp_product.set_stock(json['stock'])
        new_product = temp_product.add_product()

        if new_product:
            return jsonify(cls.model_to_dict(new_product)), 200
        else:
            return jsonify("Unable to create the product."), 500

    @classmethod
    def update_product(cls, prod_id, json):
        product_model = cls.json_to_model(json)

    @classmethod
    def delete_product(cls, prod_id, user_id):
        """
            Prompts the database to delete a product.

        :param prod_id:
        :param user_id:
        :return:
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
    def json_to_model(cls, json):
        result = ProductModel()

        # TODO: figure out how to deal with this
        result.get_name(json['name'])
        result.get_desc(json['desc'])
        result.get_price(json['price'])
        result.get_category(json['category'])
        result.get_stock(json['stock'])

        return result
