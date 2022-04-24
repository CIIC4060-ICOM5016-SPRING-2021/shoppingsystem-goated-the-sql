from src.backend.models.dao.db_connection import BackEnd
from src.backend.models.product import ProductModel


class LikedListModel:
    __likes: int
    __prod_id: int

    def get_like_count(self):
        return self.__likes

    def set_like_count(self, likes: int):
        self.__likes = likes

    def get_prod_id(self):
        return self.__prod_id

    def set_prod_id(self, prod_id: int):
        self.__prod_id = prod_id

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
        from src.backend.models.user import UserModel

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

    @classmethod
    def get_top_likes(cls):
        list_of_products = []
        for row in BackEnd.get_elements_beta(model=LikedListModel(), select_attributes="count(*) as likes, product_id",
                                             filter_clause=None, order_attribute="likes", group_attribute="product_id",
                                             sort="desc", limit=10):
            list_of_products.append(cls.model_to_dict(ProductModel().get_product(row.get_prod_id())))
        return list_of_products

    @classmethod
    def model_to_dict(cls, product):
        """
            Creates a python dictionary equivalent of a given Product Model

        :param product: ProductModel to convert
        :return: dictionary equivalent of the ProductModel given
        """
        prodict = {
            'id': product.get_prod_id(),
            'name': product.get_name(),
            'desc': product.get_desc(),
            'price': product.get_price(),
            'category': product.get_category(),
            'quantity': product.get_stock(),
            'visible': product.get_visibility()
        }
        return prodict
