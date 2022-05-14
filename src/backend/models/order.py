from dataclasses import dataclass

import psycopg2

from src.backend.models.dao.db_connection import BackEnd
from src.backend.models.product import ProductModel
from src.backend.models.user import UserModel


@dataclass
class OrderProduct:
    order_id: int = None
    product_id: int = None

    # These are the only ones important/returned to the JSON responses
    name: str = None
    description: str = None
    price_sold: float = None
    quantity_bought: int = None
    category: str = None

    def tuple_to_model(self, tuple_to_convert: tuple):
        self.name = tuple_to_convert[0]
        self.description = tuple_to_convert[1]
        self.price_sold = tuple_to_convert[2]
        self.quantity_bought = tuple_to_convert[3]
        self.category = tuple_to_convert[4]
        self.product_id = tuple_to_convert[5]


class OrderProductDetails:
    __order_id: int
    __product_id: int

    # These are the only ones important/returned to the JSON responses
    __name: str
    __description: str
    __price_sold: float
    __quantity_bought: int
    __category: str

    def get_order_id(self):
        return self.__order_id

    def set_order_id(self, order_id):
        self.__order_id = order_id

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

    def get_description(self):
        return self.__description

    def set_description(self, desc):
        self.__description = desc

    def get_price_sold(self):
        return self.__price_sold

    def set_price_sold(self, price_sold):
        self.__price_sold = price_sold

    def get_quantity_bought(self):
        return self.__quantity_bought

    def set_quantity_bought(self, quantity_bought):
        self.__quantity_bought = quantity_bought

    def get_category(self):
        return self.__category

    def set_category(self, category):
        self.__category = category

    def get_product_id(self):
        return self.__product_id

    def set_product_id(self, product_id):
        self.__product_id = product_id

    def tuple_to_model(self, tuple_to_convert):
        self.set_name(tuple_to_convert[0])
        self.set_description(tuple_to_convert[1])
        self.set_price_sold(tuple_to_convert[2])
        self.set_quantity_bought(tuple_to_convert[3])
        self.set_category(tuple_to_convert[4])

    @classmethod
    def get_top_categories(cls, user_id=0):
        try:
            if user_id == 0:
                return BackEnd.get_elements_beta(model=OrderProductDetails(),
                                                 select_attributes="category, count(product_name) as products",
                                                 order_attribute="products",
                                                 group_attribute="category",
                                                 sort="desc",
                                                 limit=10,
                                                 filter_clause='',
                                                 categories=True)
            else:
                return BackEnd.get_elements_join(model=OrderProductDetails(),
                                                 select_attributes="category, count(product_name) as products",
                                                 order_attribute="products",
                                                 group_attribute="category",
                                                 sort="desc",
                                                 limit=10,
                                                 on='order_id_fk = order_id',
                                                 filter_clause="user_id = {}".format(user_id),
                                                 categories=True)
        except psycopg2.Error:
            raise AttributeError

    @classmethod
    def get_top_products(cls, user_id=0):
        from src.backend.models.product import ProductModel
        try:
            list_of_product = []
            if user_id == 0:
                for row in BackEnd.get_elements_beta(model=OrderProductDetails(),
                                                     select_attributes="product_name, count(*) as appearances",
                                                     order_attribute="appearances",
                                                     group_attribute="product_name",
                                                     sort="desc",
                                                     limit=10,
                                                     filter_clause='',
                                                     categories=False
                                                     ):
                    list_of_product.append(BackEnd.get_element(model=ProductModel(),
                                                               pk="'{}'".format(row.get_name()),
                                                               select_attributes="*",
                                                               helper="name")
                                           )
            else:
                for row in BackEnd.get_elements_join(model=OrderProductDetails(),
                                                     select_attributes="product_name, count(*) as appearances, sum("
                                                                       "quantity_bought) as count",
                                                     order_attribute="count",
                                                     group_attribute="product_name",
                                                     sort="desc",
                                                     limit=10,
                                                     on='order_id_fk = order_id',
                                                     filter_clause="user_id = {}".format(user_id),
                                                     categories=False
                                                     ):
                    list_of_product.append(BackEnd.get_element(model=ProductModel(),
                                                               pk="'{}'".format(row.get_name()),
                                                               select_attributes="*",
                                                               helper="name")
                                           )
            return list_of_product

        except psycopg2.Error:
            raise AttributeError

    @classmethod
    def get_products_sorted(cls, user_id, ascending):
        from src.backend.models.product import ProductModel
        try:
            list_of_product = []
            if user_id == 0:
                for row in BackEnd.get_elements_beta(model=OrderProductDetails(),
                                                     select_attributes="product_name, count(*) as appearances",
                                                     order_attribute="appearances",
                                                     group_attribute="product_name",
                                                     sort="desc",
                                                     limit=10,
                                                     filter_clause='',
                                                     categories=False
                                                     ):
                    list_of_product.append(BackEnd.get_element(model=ProductModel(),
                                                               pk="'{}'".format(row.get_name()),
                                                               select_attributes="*",
                                                               helper="name")
                                           )
            else:
                for row in BackEnd.get_elements_join(model=OrderProductDetails(),
                                                     select_attributes="distinct product_name, price_sold",
                                                     order_attribute="price_sold",
                                                     sort="asc" if ascending else "desc",
                                                     limit=10,
                                                     on='order_id_fk = order_id',
                                                     filter_clause="user_id = {}".format(user_id),
                                                     categories=False
                                                     ):
                    list_of_product.append(BackEnd.get_element(model=ProductModel(),
                                                               pk="'{}'".format(row.get_name()),
                                                               select_attributes="*",
                                                               helper="name")
                                           )
            return list_of_product

        except psycopg2.Error:
            raise AttributeError


class OrderModel:
    __order_id: int
    __user_id: int
    __time_of_order: str
    __product_list: list
    __order_total: float
    __total_product_quantity: int

    def __init__(self):
        # Initializes the list of products
        self.__product_list = []

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

        # TODO: Should this method be within OrderModel or OrderProduct?
        product_details = ProductModel.get_product(item_to_add['product_id'])

        product = OrderProduct(
            name=product_details.get_name(),
            description=product_details.get_desc(),
            price_sold=item_to_add['price_sold'],
            quantity_bought=item_to_add['quantity_bought'],
            category=product_details.get_category(),
            product_id=product_details.get_prod_id()
        )
        self.__product_list.append(product)

    def add_cart_item_to_model(self, item):
        """
            Takes an item from the users cart and add it to their current order

            :param item: CartModel for the given user
        """
        product_mod = ProductModel.get_product(item.get_product_id())

        product = OrderProduct(
            name=product_mod.get_name(),
            description=product_mod.get_desc(),
            price_sold=product_mod.get_price(),
            quantity_bought=item.get_product_quantity(),
            category=product_mod.get_category(),
            order_id=0,
            product_id=product_mod.get_product_id()
        )

        self.add_product_to_model(product)

    def add_product_to_model(self, item_to_add: OrderProduct):
        """
            Adds a given OrderProductDetails object to the OrderModel.

            PLEASE INITIATE THE PRODUCT LIST BEFORE CALLING THIS METHOD. THIS COULD BE NOW FIXED, HAVE TO TEST!

            EXAMPLE:
                model.set_product_list([])

                model.add_product_to_model(x)

        :param item_to_add: OrderProductDetails object to be added
        """
        self.__product_list.append(item_to_add)

    def remove_product_from_model(self, item_to_remove):
        """
            Converts a given json object to a OrderProductDetails and removes it from the OrderModel.

        :param item_to_remove: json containing the details of the product to be removed
        """
        # noinspection DuplicatedCode
        product = OrderProduct(
            name=item_to_remove['name'],
            description=item_to_remove['desc'],
            price_sold=item_to_remove['price_sold'],
            quantity_bought=item_to_remove['quantity_bought'],
            category=item_to_remove['category'],
            order_id=0,
            product_id=0
        )

        for item in self.__product_list:
            if item.get_name() == product.name \
                    and item.get_description() == product.description \
                    and item.get_price_sold() == product.price_sold \
                    and item.get_quantity_bought() == product.quantity_bought:
                self.__product_list.remove(item)

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
        order = BackEnd.get_element(OrderModel(), order_id, 'full')

        if order:
            if UserModel.db_is_admin(user_id) or order.get_user_id() == user_id:
                return order
            else:
                raise PermissionError
        else:
            return None

    @classmethod
    def db_get_all_orders(cls, user_id):
        """
            Gets all the orders corresponding to the given user. If the user is an administrator, then all existing
            orders on the platform will be returned.

        :param user_id: id of the user whose orders have been requested
        """
        try:
            if UserModel.db_is_admin(user_id):
                return BackEnd.get_all_elements(OrderModel(), '*', '')
            else:
                return BackEnd.get_all_elements(OrderModel(), '*', "user_id = {}".format(user_id))
        except psycopg2.Error:
            raise AttributeError

    @classmethod
    def db_delete_order(cls, user_id, order_id):
        if UserModel.db_is_admin(user_id):
            return BackEnd.delete_element(OrderModel(), order_id)
        else:
            raise PermissionError

    def db_update_order(self, user_id, order_id):
        try:
            # Update order
            BackEnd.delete_element(OrderModel(), order_id)

            return BackEnd.create_element(self, user_id).get_name()

        except psycopg2.Error:
            return False
