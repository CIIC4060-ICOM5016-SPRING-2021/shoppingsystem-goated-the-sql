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
        return products

    @classmethod
    def get_all_products_organized(cls, order_by: str, order_in_ascending: bool):
        """
            Prompts the database to get the full catalog organized by the specific attribute requested

        :param order_by: attribute for order the products by
        :param order_in_ascending: true if the results are desired in ascending order, false if otherwise
        :return: list of JSONs containing the products ordered by price or name
        :raises KeyError: attribute to order by desired is not supported
        """
        if type(order_in_ascending) is bool:
            if order_by == 'price':
                result = []
                ordered_models = ProductModel.get_all_products_by_price(ascending=order_in_ascending)

                for product in ordered_models:
                    result.append(cls.model_to_dict(product))

                return jsonify(result), 200

            elif order_by == 'name':
                result = []
                ordered_models = ProductModel.get_all_products_by_name(ascending=order_in_ascending)

                for product in ordered_models:
                    result.append(cls.model_to_dict(product))

                return jsonify(result), 200

            else:
                # This leaves room for expansion later :)
                return jsonify("Cannot organize the list by this attribute."), 422
        else:
            return jsonify("Cannot organize products in the requested order."), 400

    @classmethod
    def get_all_products_by_category(cls, category_name: str):
        result = []

        try:
            products_in_category = ProductModel.get_all_products_by_category(category_name)

            for product in products_in_category:
                result.append(cls.model_to_dict(product))

            return jsonify(result), 200
        except AttributeError:
            return jsonify("Category not found."), 404
        except LookupError:
            return jsonify("There are currently no categories in our system."), 200

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
    def update_product(cls, product_json, user_id_json_obj):
        """
            Prompts the database for an attribute change in the requested product.

        :param product_json: json object containing product information received
        :param user_id_json_obj: json object containing the id of the user requesting the change
        :return: 200 if completed successfully, 500 if problem was encountered while making the change, 403 if user is
        not authorized to request the change, 406 if no changes are detected
        """
        try:
            updated = ProductModel.db_update_product(cls.json_to_model(product_json), user_id_json_obj['user_id'])
            if updated:
                return jsonify("Product Updated"), 200
            else:
                return jsonify("Unable to update product"), 500
        except ValueError:
            return jsonify("User is not authorized"), 403
        except AttributeError:
            return jsonify("No changes to product detected")

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
            if deleted is True:
                return jsonify("Product Deleted"), 200
            else:
                return jsonify("Unable to delete product"), 500
        except ValueError:
            return jsonify("User is not authorized"), 403

    @classmethod
    def get_cheapest_products(cls):
        cheapest_models = ProductModel().get_all_products_by_price(limit=10)
        list_of_json = []
        for model in cheapest_models:
            list_of_json.append(cls.model_to_dict(model))
        return list_of_json

    @classmethod
    def get_priciest_products(cls):
        priciest_models = ProductModel().get_all_products_by_price(ascending=False, limit=10)
        list_of_json = []
        for model in priciest_models:
            list_of_json.append(cls.model_to_dict(model))
        return list_of_json

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
