from src.models.product import ProductModel


class OrderController:
    # TODO: Move all the method description a level deeper into the Models. Make these just say that it prompts the db
    @classmethod
    def create_order(cls, user_id, order_products: list[ProductModel]):
        """
            Creates an order in the database containing the given list of products.

        :param user_id: id of the user the order is related to
        :param order_products: list of products related to the order
        """
        pass

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
