from flask import jsonify

from src.models.liked_list import LikedListModel
from src.models.dao.backend import BackEnd
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

    @classmethod
    def delete_liked_list(cls, user_id, updater_id):
        """
            Prompts the database to delete the liked list of a user.

        :param user_id: id of the user requested to delete
        :param updater_id: id of the user requesting the deletion
        :return: 200 if successfully deleted, 500 if problem was encountered while making the deletion, 403 if user is
        not authorized to request the deletion
        """
        try:
            deleted = LikedListModel().db_delete_liked_list(user_id, updater_id)
            if deleted:
                return jsonify("User Deleted"), 200
            else:
                return jsonify("Unable to delete user"), 500
        except ValueError:
            return jsonify("User is not authorized"), 403

    @classmethod
    def toggle_like(cls, prod_id, user_id):
        # previously_liked = BackEnd.get_element(LikedListModel(), "{}"count(*)", )
        pass
