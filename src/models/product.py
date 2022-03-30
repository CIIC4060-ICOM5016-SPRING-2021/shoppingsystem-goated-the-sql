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

    def get_prod_id(self):
        """
        :return: product id of the product
        """
        return self.__prod_id

    def set_prod_id(self, prod_id: int):
        """
        :param prod_id: product id for the product
        """
        self.__prod_id = prod_id

    def get_name(self):
        """
        :return: name of the product
        """
        return self.__name

    def set_name(self, new_name: str):
        """
        :param new_name: name for the product
        """
        self.__name = new_name

    def get_desc(self):
        """
        :return: description of the product
        """
        return self.__desc

    def set_desc(self, new_desc: str):
        """
        :param new_desc: description for the product
        """
        self.__desc = new_desc

    def get_price(self):
        """
        :return: price of the product
        """
        return self.__price

    def set_price(self, new_price: float):
        """
        :param new_price: price for the product
        """
        self.__price = new_price

    def get_category(self):
        """
        :return: category of the product
        """
        return self.__category

    def set_category(self, new_category: str):
        """
        :param new_category: category for the product
        """
        self.__category = new_category

    def get_likes(self):
        """
        :return: like count of the product
        """
        return self.__liked_count

    def set_likes(self, likes: int):
        """
        :param likes: like count for the product
        """
        self.__liked_count = likes

    def get_quantity(self):
        """
        :return: quantity available of product
        """
        return self.__quantity

    def set_quantity(self, new_quantity: int):
        """
        :param new_quantity: quantity available for the product
        """
        self.__quantity = new_quantity

    def get_visibility(self):
        """
        :return: visibility state of the product
        """
        return self.__visible

    def set_visibility(self, new_visibility: bool):
        """
        :param new_visibility: visibility state for the product
        """
        self.__visible = new_visibility

    @classmethod
    def add_product(cls):
        """
            Adds the product to the database
        """
        BackEnd().create_element(cls)

    @classmethod
    def get_all_products(cls):
        """
            Queries the database for all products in the catalog

        :return: list containing ProductModels
        """
        return BackEnd().get_all_elements(ProductModel(), "*", "")

    @classmethod
    def get_product(cls, prod_id):
        """
            Gets the product corresponding to the given id

        :param prod_id: product identification number
        :return: ProductModel of found product, None if not found
        """
        return BackEnd().get_element(ProductModel(), prod_id)

    @classmethod
    def get_all_products_by_price(cls, ascending=True):
        """
            Gets all the products in the catalog in ascending or descending order by price, depending on if the
            ascending parameter is set to true or false.

        :param ascending: boolean, true = ascending order of price / false = descending order of price
        :return: list containing ProductModels ordered by price
        """
        if ascending:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "price", "ASC")
        else:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "price", "DESC")

    @classmethod
    def get_all_products_by_name(cls, ascending=True):
        """
            Gets all the products in the catalog in ascending or descending order by name, depending on if the
            ascending parameter is set to true or false.

        :param ascending: boolean, true = ascending order by name / false = descending order by name
        :return: list containing ProductModels ordered by name
        """
        if ascending:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "name", "ASC")
        else:
            return BackEnd().get_all_elements_ordered(ProductModel(), "*", "", "name", "DESC")

    @classmethod
    def get_all_products_by_category(cls, category: str):
        """
            Gets all products in the catalog within the same category.

        :param category: category of the products
        :return: list containing ProductModels with the same category
        """
        return BackEnd().get_all_elements(ProductModel(), "*", "category = " + category)

    @classmethod
    def db_change_visibility(cls, user_id: int, prod_id: int, new_visibility: bool):
        """
            Changes the visibility parameter for products in the database. Either hiding them or showing them

        :param user_id: id of the user requesting the change
        :param prod_id: id of the product being altered
        :param new_visibility: updated visibility state of the product
        :raise ValueError: user id does not have administrator rights
        """
        from src.models.user import UserModel

        if UserModel().db_is_admin(user_id):
            BackEnd().update_element_attribute(
                'products', 'visible = ' + str(new_visibility).lower(), 'product_id = ' + str(prod_id)
            )
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def db_change_price(cls, user_id: int, prod_id: int, new_price: float):
        """
            Changes the price parameter for the product in the database.

        :param user_id: id of the user requesting the change
        :param prod_id: id of the product being altered
        :param new_price: updated price of the product
        :raise ValueError: user id does not have administrator rights
        """
        from src.models.user import UserModel

        if UserModel().db_is_admin(user_id):
            BackEnd().update_element_attribute(
                'products', 'price = ' + str(new_price), 'product_id = ' + str(prod_id)
            )
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def db_change_quantity(cls, user_id: int, prod_id: int, new_quantity: int):
        """
            Changes the quantity available of the product in the database.

        :param user_id: id of the user requesting the change
        :param prod_id: id of the product being altered
        :param new_quantity: updated quantity of the product
        :raise ValueError: user id does not have administrator rights
        """
        from src.models.user import UserModel

        if UserModel().db_is_admin(user_id):
            BackEnd().update_element_attribute(
                'products', 'quantity = ' + str(new_quantity), 'product_id = ' + str(prod_id)
            )
        else:
            raise ValueError("User does not have the rights to make this change.")
