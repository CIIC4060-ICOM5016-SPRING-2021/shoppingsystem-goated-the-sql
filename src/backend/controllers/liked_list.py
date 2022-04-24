from flask import jsonify
from src.backend.models import LikedListModel


class LikedListController:
    @classmethod
    def get_likes(cls, user_id):
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
        previously_liked = LikedListModel().toggle_like(prod_id, user_id)
        if previously_liked.get_like_count() == 1:
            # quitar like
            LikedListModel.delete_like(prod_id, user_id)
        else:
            # darle like
            LikedListModel.add_like(prod_id, user_id)

    @classmethod
    def get_top_likes(cls):
        # returns top 10 product models with the most likes
        return LikedListModel.get_top_likes()
