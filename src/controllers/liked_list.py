from src.models.liked_list import LikedListModel

from src.models.liked_list import LikedListModel


class LikedListController:
    @classmethod
    def get_likes(cls, user_id):
        # TODO: Implement calls to logic in models package
        likes_list = len(LikedListModel().get_all_elements(user_id))
        return likes_list

    @classmethod
    def get_likes_of_prod(cls, prod_id):
        return LikedListModel().get_likes(prod_id)
