from flask import jsonify

from src.models.order import OrderModel


class OrderController:
    # TODO: Move all the method description a level deeper into the Models. Make these just say that it prompts the db
    @classmethod
    def create_order(cls, user_id, order_products: list):
        """
            Prompts the creation of an order in the database.

        :param user_id: id of the user that the order will be added to
        :param order_products: list of products to be associated with the order
        :return: json equivalent of the order model
        """
        new_order = OrderModel()
        new_order.set_user_id(user_id)
        try:
            # Initiate product list
            new_order.set_product_list([])
            for item in order_products:
                new_order.add_product_json_to_model(item)

            return jsonify(cls.model_to_dict(new_order.db_add_order(user_id))), 200
        except KeyError or AttributeError:
            return jsonify("The given products are missing details or do not contain aptly named keys."), 400

    @classmethod
    def get_specific_order(cls, user_id, order_id):
        """
            Gets a specific order from a user.

        :param user_id: id of the given user
        :param order_id: id of the desired order
        """

        try:
            order = OrderModel.db_get_specific_order(user_id, order_id)
            if order:
                return jsonify(cls.model_to_dict(order))
            else:
                return jsonify("User is not authorized to get this order."), 401
        except FileNotFoundError:
            return jsonify("The given order id was not found in the database."), 404

    @classmethod
    def get_all_orders(cls, user_id):
        """
            Prompts the database to get all orders corresponding to the given user id.

        :param user_id: id of the given user
        """
        try:
            orders = OrderModel.db_get_all_orders(user_id)
        except AttributeError:
            return jsonify("User does not exist."), 404

        if orders:
            orders_json = []

            for transaction in orders:
                orders_json.append(cls.model_to_dict(transaction))

            return jsonify(orders_json), 200
        else:
            jsonify("The given user has no orders."), 404
        pass

    @classmethod
    def update_order(cls, user_id, order_id, changes_json_obj):
        """
            If the given user is an administrator, updates the order corresponding to the given ID with the provided
            changes.

        :param user_id: id of the given user
        :param order_id: id of the desired order to change
        :param changes_json_obj: list or json object containing the changes desired to the order
        """
        pass

    @classmethod
    def delete_order(cls, user_id, order_id):
        """
            If the given user is an administrator, deletion of the given order is requested.

        :param user_id:
        :param order_id:
        """

        try:
            deletion = OrderModel.db_delete_order(user_id, order_id)
        except PermissionError:
            return jsonify("Unauthorized."), 401

        if deletion:
            return jsonify("Order has been deleted."), 200
        else:
            return jsonify("Unable to delete order."), 500
        pass

    @classmethod
    def model_to_dict(cls, order_model: OrderModel):

        list_of_product_dicts = []

        for products in order_model.get_product_list():
            product_dict = {
                'name': products.get_name(),
                'desc': products.get_description(),
                'price_sold': products.get_price_sold(),
                'quantity_bought': products.get_quantity_bought(),
                'category': products.get_category()
            }

            list_of_product_dicts.append(product_dict)

        order_dict = {
            'order_id': order_model.get_order_id(),
            'user_id': order_model.get_user_id(),
            'time_of_order': order_model.get_time_of_order(),
            'products_ordered': list_of_product_dicts,
            'order_total': order_model.get_order_total(),
            'total_product_quantity': order_model.get_total_product_quantity()
        }

        return order_dict

    @classmethod
    def json_to_model(cls, request):

        model = OrderModel()

        model.set_order_id(request['order_id'])
        model.set_user_id(request['user_id'])
        model.set_time_of_order(request['time_of_order'])

        for item in request['products_ordered']:
            model.add_product_json_to_model(item)

        model.set_order_total(request['order_total'])
        model.set_total_product_quantity(request['total_product_quantity'])

        return model
