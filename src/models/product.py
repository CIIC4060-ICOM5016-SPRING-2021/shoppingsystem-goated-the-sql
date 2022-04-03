import psycopg2

from src.models.dao.backend import BackEnd


class ProductModel:
    __prod_id: int
    __name: str
    __desc: str
    __price: float
    __category: str
    __stock: int
    __visible: bool

    # Product ID Getter
    def get_prod_id(self):
        """
        :return: product id of the product
        """
        return self.__prod_id

    # Product ID Setter
    def set_prod_id(self, prod_id: int):
        """
        :param prod_id: product id for the product
        """

        self.__prod_id = prod_id

    # Name Getter
    def get_name(self):
        """
        :return: name of the product
        """
        return self.__name

    # Name Setter
    def set_name(self, new_name: str):
        """
        :param new_name: name for the product
        """
        self.__name = new_name

    # Description Getter
    def get_desc(self):
        """
        :return: description of the product
        """
        return self.__desc

    # Description Setter
    def set_desc(self, new_desc: str):
        """
        :param new_desc: description for the product
        """
        self.__desc = new_desc

    # Price Getter
    def get_price(self):
        """
        :return: price of the product
        """
        return self.__price

    # Price Setter
    def set_price(self, new_price: float):
        """
        :param new_price: price for the product
        """
        self.__price = new_price

    # Category Setter
    def get_category(self):
        """
        :return: category of the product
        """
        return self.__category

    # Category Setter
    def set_category(self, new_category: str):
        """
        :param new_category: category for the product
        """
        self.__category = new_category

    # Stock Getter
    def get_stock(self):
        """
        :return: stock available of product
        """
        return self.__stock

    # Stock Setter
    def set_stock(self, new_stock: int):
        """
        :param new_stock: stock available for the product
        """
        self.__stock = new_stock

    #  Visibility Setter
    def get_visibility(self):
        """
        :return: visibility state of the product
        """
        return self.__visible

    # Visibility Getter
    def set_visibility(self, state: bool):
        """
        :param state: boolean visible state of the product
        """
        self.__visible = state

    def add_product(self):
        """
            Queries the database to add the product to the catalog.

        :return: product created in the database
        """
        return BackEnd.create_element(self)

    @classmethod
    def get_product(cls, prod_id):
        """
            Gets the product corresponding to the given id

        :param prod_id: product identification number
        :return: ProductModel of found product, None if not found
        """
        return BackEnd().get_element(ProductModel(), prod_id, "*")

    @classmethod
    def get_all_products(cls):
        """
        Queries the database for all products in the catalog

        :return: list containing ProductModels
        """
        return BackEnd().get_all_elements(ProductModel(), "*", "")

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
    def db_delete_product(cls, prod_id, user_id):
        """
            Queries a deletion in the database if the user has administrative rights to make this change.

        :param prod_id: id of the product being requested to delete
        :param user_id: id of the user requesting the deletion
        :return: True if the product is deleted successfully, False if there is problem deleting the product
        :raises ValueError: user does not have rights to delete the product
        """
        from src.models.user import UserModel

        if UserModel.db_is_admin(user_id):
            try:
                BackEnd.delete_element(ProductModel(), prod_id)
                return True
            except psycopg2.Error:
                return False
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def db_update_product(cls, model, user_id):
        """
            Compares a given product with one in the database with the same id number. Then queries an update to a
            product in the database.

        :param model: Product Entity Model containing all the changes to the product
        :param user_id: id of the user requesting the update
        :return: True if the product is successfully updated or there are no changes found between the requested updates
        and the database,
        """
        from src.models.user import UserModel

        if UserModel.db_is_admin(user_id):
            try:
                db_model = ProductModel.get_product(model.get_prod_id())

                changes = []
                if db_model.get_name() != model.get_name():
                    changes.append("name = '{}'".format(model.get_name()))

                if db_model.get_desc() != model.get_desc():
                    changes.append("description = '{}'".format(model.get_desc()))

                if db_model.get_price() != model.get_price():
                    changes.append("price = {}".format(model.get_price()))

                if db_model.get_category() != model.get_category():
                    changes.append("category = '{}'".format(model.get_category()))

                if db_model.get_stock() != model.get_stock():
                    changes.append("stock = {}".format(model.get_stock()))

                if db_model.get_visibility() != model.get_visibility():
                    changes.append("visible = {}".format(model.get_visibility()))

                if changes:
                    BackEnd.update_element_attribute("products",
                                                     ", ".join(changes),
                                                     "product_id  = {}".format(model.get_prod_id())
                                                     )
                    return True
                else:
                    raise AttributeError("No differences were found between the database and give product.")
            except psycopg2.Error:
                return False
        else:
            raise ValueError("User does not have the rights to make this change.")
