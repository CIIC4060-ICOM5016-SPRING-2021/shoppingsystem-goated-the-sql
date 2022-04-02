from flask import jsonify

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
        pass

    @classmethod
    def add_product(cls, json):
        # TODO: Implement method. Must be given a product in a json and the
        # method must add it
        # Return id of added product
        pass

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
            'likes': product.get_likes(),
            'quantity': product.get_quantity(),
            'visibility': product.get_visibility()
        }
        return prodict
