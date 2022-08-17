from flask import jsonify

from src.backend.models.cart import CartModel
from src.backend.models.order import OrderModel, OrderProduct
from src.backend.models.product import ProductModel
from src.backend.models.user import UserModel


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
            # new_order.set_product_list([])
            for item in order_products:
                prod = ProductModel.get_product(item['product_id'])

                stock = prod.get_stock()
                if item['quantity_bought'] < stock:
                    # Need to decrease the stock by the quantity bought
                    prod.set_stock(stock - int(item['quantity_bought']))
                    # Todo change the user id updating the products
                    ProductModel.db_update_product(prod, 213)
                    # Add product to order
                    new_order.add_product_json_to_model(item)
                else:
                    return jsonify(
                        "You have attempted to order a quantity larger than the current available stock. The order has "
                        "failed"), 400

            return jsonify(cls.model_to_dict(new_order.db_add_order(user_id))), 200
        except AttributeError:
            return jsonify("The given products are missing details or do not contain aptly named keys."), 400

    @classmethod
    def create_order_from_cart(cls, user_id):
        """
        Makes a new order based on the cart for the given user id
        :param user_id: The user_id for the user creating the order
        :return: The order just made
        """
        # Make new order
        new_order = OrderModel()
        new_order.set_user_id(user_id)

        # Get all products from cart with given user id
        cart = CartModel.get_cart(user_id)

        # Iterate through the list of cart items and get the information necessary to add to order
        # Make every cart model product into an order product detail model
        try:
            for item in cart:
                prod = ProductModel.get_product(item.get_product_id())

                stock = prod.get_stock()
                if item.get_product_quantity() <= stock:
                    # Need to decrease the stock by the quantity bought
                    prod.set_stock(stock - int(item.get_product_quantity()))
                    # Todo change the user id updating the products
                    ProductModel.db_update_product(prod, 213)
                    # Add product to order
                    new_order.add_cart_item_to_model(item)

            CartModel.clear_cart(user_id)
            return jsonify(cls.model_to_dict(new_order.db_add_order(user_id)))

        except AttributeError:
            return jsonify("The given products are missing details or do not contain aptly named keys.")

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
                return jsonify("The order was not found or does not exist."), 404
        except PermissionError:
            return jsonify("User is not authorized to get this order."), 401

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

            return orders_json
        else:
            jsonify("The given user has no orders."), 404
        pass

    @classmethod
    def update_order(cls, user_id, updater_id, order_id, changes_json_obj):
        """
            If the given user is an administrator, updates the order corresponding to the given ID with the provided
            changes.

        :param updater_id: id of the user requesting the update
        :param user_id: id of the given user
        :param order_id: id of the desired order to change
        :param changes_json_obj: list or json object containing the changes desired to the order
        """
        if UserModel.db_is_admin(updater_id):

            order_model = cls.json_to_model(changes_json_obj)

            # Redundant to make sure the change happens to the correct order and the code does not try to change the
            # foreign keys/primary keys
            order_model.set_order_id(order_id)
            order_model.set_user_id(user_id)

            try:
                updated_id = order_model.db_update_order(user_id, order_id)
                if updated_id:
                    return jsonify("Order Updated. The new id is: " + str(updated_id)), 200
                else:
                    return jsonify("Unable to update order."), 500
            except AttributeError:
                return jsonify("No changes to order detected."), 204

        else:
            return jsonify("Not authorized."), 401

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
                'name': products.name,
                'desc': products.description,
                'price_sold': products.price_sold,
                'quantity_bought': products.quantity_bought,
                'category': products.category
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

        model.set_product_list([])

        for item in request['products_ordered']:
            model.add_product_json_to_model(item)

        model.set_order_total(request['order_total'])
        model.set_total_product_quantity(request['total_product_quantity'])

        return model


class OrderProductController:

    @classmethod
    def get_top_categories(cls):
        list_of_categories = []
        for category in OrderProduct.get_top_categories():
            list_of_categories.append(cls.model_to_dict(category, True))
        return list_of_categories

    @classmethod
    def get_top_products(cls):
        list_of_products = []
        for product in OrderProduct.get_top_products():
            from src.backend.controllers.product import ProductController
            list_of_products.append(ProductController.model_to_dict(product))
        return list_of_products

    @classmethod
    def get_personalized_user_statistics(cls, user_id):
        most_bought_categories = []
        most_bought_products = []  # ranked by amount
        cheapest_bought_products = []
        most_expensive_bought_products = []

        for category in OrderProduct.get_top_categories(user_id):
            most_bought_categories.append(cls.model_to_dict(category, True))

        for product in OrderProduct.get_top_products(user_id):
            from src.backend.controllers.product import ProductController
            most_bought_products.append(ProductController.model_to_dict(product))

        for product in OrderProduct.get_products_sorted(user_id, True):
            from src.backend.controllers.product import ProductController
            cheapest_bought_products.append(ProductController.model_to_dict(product))

        for product in OrderProduct.get_products_sorted(user_id, False):
            from src.backend.controllers.product import ProductController
            most_expensive_bought_products.append(ProductController.model_to_dict(product))

        return [{"Most Bought Categories": most_bought_categories},
                {"Most Bought Products": most_bought_products},
                {"Cheapest Bought Products": cheapest_bought_products},
                {"Most Expensive Bought Products": most_expensive_bought_products}]

    @classmethod
    def model_to_dict(cls, order_product_model, categories=False):
        if categories:
            dic = {"name": order_product_model.category,
                   "quantity_bought": order_product_model.quantity_bought}
        else:
            dic = {"name": order_product_model.get_name(),
                   "appearances": order_product_model.get_product_quantity()}
        return dic

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
