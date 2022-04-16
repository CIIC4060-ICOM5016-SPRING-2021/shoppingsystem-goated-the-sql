from src.models.dao.backend import BackEnd
from src.models.user import UserModel


class OrderProductDetails:
    __name: str
    __description: str
    __price_sold: float
    __quantity_bought: int

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

    def get_description(self):
        return self.__description

    def set_description(self, description):
        self.__description = description

    def get_price_sold(self):
        return self.__price_sold

    def set_price_sold(self, price_sold):
        self.__price_sold = price_sold

    def get_quantity_bought(self):
        return self.__quantity_bought

    def set_quantity_bought(self, quantity_bought):
        self.__quantity_bought = quantity_bought


class OrderModel:
    __order_id: int
    __user_id: int
    __time_of_order: str
    __product_list: list[OrderProductDetails]
    __order_total: float
    __total_product_quantity: int

    def get_order_id(self):
        return self.__order_id

    def set_order_id(self, order_id):
        self.__order_id = order_id

    def get_user_id(self):
        return self.__user_id

    def set_user_id(self, user_id):
        self.__user_id = user_id

    def get_time_of_order(self):
        return self.__time_of_order

    def set_time_of_order(self, time_of_order):
        self.__time_of_order = time_of_order

    def get_product_list(self):
        return self.__product_list

    def set_product_list(self, product_list):
        self.__product_list = product_list

    def get_order_total(self):
        return self.__order_total

    def set_order_total(self, order_total):
        self.__order_total = order_total

    def get_total_product_quantity(self):
        return self.__total_product_quantity

    def set_total_product_quantity(self, total_product_quantity):
        self.__total_product_quantity = total_product_quantity

    def add_product_json_to_model(self, item_to_add):
        """
            Converts a given json object to a OrderProductDetails and adds it to an OrderModel.

            PLEASE INITIATE THE PRODUCT LIST BEFORE CALLING THIS METHOD.

            EXAMPLE:
                model.set_product_list([])

                model.add_product_to_model(x)

        :param item_to_add: json containing the details of the product to be added
        """
        product = OrderProductDetails()
        product.set_name(item_to_add['name'])
        product.set_description(item_to_add['desc'])
        product.set_price_sold(item_to_add['price_sold'])
        product.set_quantity_bought(item_to_add['quantity_bought'])

        # The product list must be initiated before calling this method
        self.__product_list.append(product)

    def add_product_to_model(self, item_to_add: OrderProductDetails):
        """
            Adds a given OrderProductDetails object to the OrderModel.

        :param item_to_add: OrderProductDetails object to be added
        """
        self.__product_list.append(item_to_add)

    def remove_product_from_model(self, item_to_remove):
        """
            Converts a given json object to a OrderProductDetails and removes it from the OrderModel.

        :param item_to_remove: json containing the details of the product to be removed
        """
        product = OrderProductDetails()
        product.set_name(item_to_remove['name'])
        product.set_description(item_to_remove['desc'])
        product.set_price_sold(item_to_remove['price_sold'])
        product.set_quantity_bought(item_to_remove['quantity_bought'])

        for item_to_remove in self.__product_list:
            if item_to_remove.get_name() == product.get_name() \
                    and item_to_remove.get_description() == product.get_description() \
                    and item_to_remove.get_price_sold() == product.get_price_sold() \
                    and item_to_remove.get_quantity_bought() == product.get_quantity_bought():
                self.__product_list.remove(item_to_remove)

    def db_add_order(self, user_id):
        """
            Creates an order in the database containing the given list of products.

        :param user_id: id of the user the order is related to
        """

        return BackEnd.create_element(self, user_id=user_id)

    @classmethod
    def db_get_specific_order(cls, user_id, order_id):
        """
            Gets the given order and its corresponding products from the database. The user parameter is for
            confirmation of data access.

        :param user_id: id of the user requesting the order
        :param order_id: id of the order being queried
        """

        # The backend for the order contains a slight difference between the normal model entities, it can return just
        # an order and the time it was created by requesting 'order' or an order with all the products corresponding to
        # it by requesting 'full' in the select attributes parameter
        order = BackEnd.get_element(OrderModel, order_id, 'full')

        if UserModel.db_is_admin(user_id) or order.get_user_id() == user_id:
            return order
