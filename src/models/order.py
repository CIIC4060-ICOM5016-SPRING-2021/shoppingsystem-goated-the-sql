class OrderModel:
    product_details = {
        "name": str,
        "desc": str,
        "price_sold": float,
        "quantity_bought": int
    }

    __order_id: int
    __user_id: int
    __time_of_order: str
    __product_list: list[product_details]
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
