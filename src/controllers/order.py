from flask import jsonify

from src.models.order import OrderModel


class OrderController:
    # TODO: Move all the method description a level deeper into the Models. Make these just say that it prompts the db
    @classmethod
    def create_order(cls, user_id, order_products: list):
        """
            Creates an order in the database containing the given list of products.

        :param user_id: id of the user the order is related to
        :param order_products: list of products related to the order
        """
        new_order = OrderModel()
        new_order.set_user_id(user_id)
        try:
            for item in order_products:
                new_order.add_product_to_model(item)

            return jsonify(cls.model_to_dict(new_order.db_add_order(user_id)))
        except KeyError:
            return jsonify("The given products are missing details or do not contain aptly named keys."), 400

    @classmethod
    def get_specific_order(cls, user_id, order_id):
        """
            Gets a specific order from a user

        :param user_id: id of the given user
        :param order_id: id of the desired order
        """
        pass

    @classmethod
    def get_all_orders(cls, user_id):
        """
            Gets all the orders the given user has completed. If the given user is an administrator, it will return
            all the existing orders on the platform.

        :param user_id: id of the given user
        """

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
        pass

    @classmethod
    def model_to_dict(cls, order_model: OrderModel):

        list_of_product_dicts = []

        for products in order_model.get_product_list():
            product_dict = {
                'name': products.get_name(),
                'desc': products.get_description(),
                'price_sold': products.get_price_sold(),
                'quantity_bought': products.get_quantity_bought()
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
            model.add_product_to_model(item)

        model.set_order_total(request['order_total'])
        model.set_total_product_quantity(request['total_product_quantity'])

        return model
