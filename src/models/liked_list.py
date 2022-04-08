from src.models.dao.backend import BackEnd
from src.models.product import ProductModel

from src.models.dao.backend import BackEnd
from src.models.product import ProductModel


class LikedListModel:
    __likes: int
    __elements: list
    __element: int

    # User ID Getter
    # def get_user_id(self):
    #    return self.__user_id

    # User ID Setter
    # def set_user_id(self, user_id: int):
    #    self.__user_id = user_id

    # Elements Getter
    # def get_elements(self):
    #    return self.__elements

    # Elements Setter
    # def set_elements(self, elements: list):
    #    self.__elements = elements

    # the getter and setters for element are helpers for organizing
    # the data down at the packager.py file. If it seems weird to
    # have a liked list with both one and multiple elements, its
    # because it is. It just helps us package the data, for now
    # 04/01/2022
    # def get_product_id(self):
    #    return self.__element

    # def set_product_id(self, prod_id: int):
    #    self.__element = prod_id

    def get_like_count(self):
        return self.__likes

    def set_like_count(self, likes: int):
        self.__likes = likes

    @classmethod
    def get_likes(cls, prod_id: int):
        likes = BackEnd().get_element(LikedListModel(), "{}".format(prod_id), "count(*)")
        return likes

    @classmethod
    def get_all_elements(cls, user_id):
        list_user_product = BackEnd().get_all_elements(LikedListModel(), "*", "user_id={}".format(user_id))
        list_of_products = []
        for product in list_user_product:
            list_of_products.append(BackEnd.get_element(ProductModel(),
                                                        "*",
                                                        "product_id={}".format(product.get_product_id())))
        return list_of_products

    @classmethod
    def db_delete_liked_list(cls, user_id, updater_id):
        """
           Queries a deletion in the database if the user has administrative rights to make this change.

       :param user_id: id of the user being requested to delete
       :param updater_id: id of the user requesting the deletion
       :return: True if the product is deleted successfully, False if there is problem deleting the user
       :raises ValueError: user does not have rights to delete the user
       """
        from src.models.user import UserModel

        if UserModel.db_is_admin(updater_id):
            return BackEnd.delete_element(LikedListModel(), user_id)
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def toggle_like(cls, prod_id, user_id):
        return BackEnd.get_element(LikedListModel(), prod_id, "count(*)", user_id)

    @classmethod
    def delete_like(cls, prod_id, user_id):
        return BackEnd.delete_element(LikedListModel(), user_id, prod_id)

    @classmethod
    def add_like(cls, prod_id, user_id):
        return BackEnd.create_element(LikedListModel(), user_id, prod_id)
