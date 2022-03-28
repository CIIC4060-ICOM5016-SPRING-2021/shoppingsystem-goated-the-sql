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
        return BackEnd.get_all_elements(ProductModel(), "*", "")

    @classmethod
    def get_product(cls, prod_id):
        return BackEnd.get_element(ProductModel(), prod_id)

    @classmethod
    def update_product(cls, prod_id, product):
        # TODO: Implement this
        return "goomba"
