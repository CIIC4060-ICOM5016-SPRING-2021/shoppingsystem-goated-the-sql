from src.backend.models.dao.db_connection import BackEnd


class CartModel:
    __product_id: int
    __usr_id: int
    __product_quantity: int
    __product_price: float
    __name: str

    # Product ID Getter:
    def get_product_id(self):
        return self.__product_id

    # Product ID Setter:
    def set_product_id(self, product_id: int):
        self.__product_id = product_id

    # User ID Getter:
    def get_user_id(self):
        return self.__usr_id

    # User ID Setter:
    def set_user_id(self, usr_id: int):
        self.__usr_id = usr_id

    # prod_name Setter:
    def set_name(self, name: str):
        self.__name = name

    # Product name Getter:
    def get_name(self):
        return self.__name

    # Product Quantity Getter:
    def get_product_quantity(self):
        return self.__product_quantity

    # Product Quantity Setter:
    def set_product_quantity(self, product_quantity: int):
        self.__product_quantity = product_quantity

    # Product Price Getter:
    def get_product_price(self):
        return self.__product_price

    # Product Price Setter:
    def set_product_price(self, product_price: int):
        self.__product_price = product_price

    @classmethod
    def get_cart(cls, user_id):
        #list_of_products = BackEnd.get_elements_join(CartModel(), "product_id,usr_id,product_quantity,product_price,name", "user_id={}".format(user_id))
        list_of_products = BackEnd.get_elements_join(model=CartModel(),
                                                    select_attributes = "product_id,user_id,product_quantity,product_price,name",
                                                    filter_clause = "user_id={}".format(user_id),
                                                    group_attribute = "",
                                                    order_attribute = "",
                                                    sort = "",
                                                    limit = 1,
                                                    on = '',
                                                    categories = True)
        return list_of_products

    def add_item(self):
        return BackEnd.create_element(self)

    @classmethod
    def clear_cart(cls, usr_id):
        return BackEnd.delete_element(CartModel(), usr_id)

    @classmethod
    def delete_item(cls, usr_id, product_id):
        return BackEnd.delete_element(CartModel(), usr_id, product_id)

    @classmethod
    def update_quantity(cls, usr_id, product_id, quantity):
        return BackEnd.update_element_attribute('cart', 'product_quantity={}'.format(quantity),
                                                'user_id={} AND product_id={}'.format(usr_id, product_id))
