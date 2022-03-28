from src.models.dao.backend import BackEnd


class ProductModel:
    __prod_id: int
    __name: str
    __desc: str
    __price: float
    __category: str
    __liked_count: int
    __quantity: int
    __visible: bool

    # Product ID Getter
    def get_prod_id(self):
        return self.__prod_id

    # Product ID Setter
    def set_prod_id(self, prod_id: int):
        self.__prod_id = prod_id

    # Name Getter
    def get_name(self):
        return self.__name

    # Name Setter
    def set_name(self, new_name: str):
        self.__name = new_name

    # Description Getter
    def get_desc(self):
        return self.__desc

    # Description Setter
    def set_desc(self, new_desc: str):
        self.__desc = new_desc

    # Price Getter
    def get_price(self):
        return self.__price

    # Price Setter
    def set_price(self, new_price: float):
        self.__price = new_price

    # Category Getter
    def get_category(self):
        return self.__category

    # Category Setter
    def set_category(self, new_category: str):
        self.__category = new_category

    # Liked Count Getter
    def get_likes(self):
        return self.__liked_count

    # Liked Count Setter
    def set_likes(self, likes: int):
        self.__liked_count = likes

    # Quantity Getter
    def get_quantity(self):
        return self.__quantity

    # Quantity Setter
    def set_quantity(self, new_quantity: int):
        self.__quantity = new_quantity

    # Visibility Getter
    def get_visibility(self):
        return self.__visible

    # Visibility Setter
    def set_visibility(self, new_visibility: bool):
        self.__visible = new_visibility

    @classmethod
    def add_product(cls):
        BackEnd().create_element()

    @classmethod
    def get_all_products(cls):
        return BackEnd().get_all_elements(ProductModel(), "*", "")

    @classmethod
    def get_product(cls, prod_id):
        return BackEnd().get_element(ProductModel(), prod_id)

    @classmethod
    def update_product(cls, prod_id, product):
        # TODO: Implement this
        return "goomba"

    @classmethod
    def get_all_products_by_price(cls, ascending=True):
        if ascending:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "price", "ASC")
        else:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "price", "DESC")

    @classmethod
    def get_all_products_by_name(cls, ascending=True):
        if ascending:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "name", "ASC")
        else:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "name", "DESC")

    @classmethod
    def get_all_products_by_category(cls, category: str):
        return BackEnd().get_all_elements(ProductModel(), "*", "category = " + category)

    @classmethod
    def db_set_visibility(cls, user_id: int, prod_id: int, new_visibility: bool):
        from src.models.user import UserModel

        user = BackEnd().get_element(UserModel(), pk=user_id)
        if user.db_is_admin():
            product = BackEnd().get_element(ProductModel(), pk=prod_id)
            product.set_visibility(new_visibility)
            product.update_product(prod_id, product)
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def db_set_price(cls, user_id: int, prod_id: int, new_price: float):
        from src.models.user import UserModel

        user = BackEnd().get_element(UserModel(), pk=user_id)
        if user.db_is_admin():
            product = BackEnd().get_element(ProductModel(), pk=prod_id)
            product.set_price(new_price)
            product.update_product(prod_id, product)
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def db_set_quantity(cls, user_id: int, prod_id: int, new_quantity: int):
        from src.models.user import UserModel

        user = BackEnd().get_element(UserModel(), pk=user_id)
        if user.db_is_admin():
            product = BackEnd().get_element(ProductModel(), pk=prod_id)
            product.set_quantity(new_quantity)
            product.update_product(prod_id, product)
        else:
            raise ValueError("User does not have the rights to make this change.")

