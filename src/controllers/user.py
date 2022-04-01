from src.models.user import UserModel
from flask import jsonify


class UserController:
    @classmethod
    def get_user(self, user_id):
        # This will only return the verification of the account and first & last name for security purposes
        return jsonify(UserController().preparer(UserModel().get_user(user_id)))

    def register_user(self, json):
        #new_user = UserModel()
        # TODO: Get values from the page and combine them into a user

        #new_user.add_user()
        pass

    @classmethod
    def get_all_users(cls):
        users = []
        for user in UserModel().get_all_users():
            users.append(UserController().preparer(user))

        return jsonify(users)

    @classmethod
    def preparer(cls, user):
        user_dict = {'first name': user.get_first_name(),
                     'last name': user.get_last_name(),
                     'validity': user.get_validity(),
                     'phone #': user.get_phone_num(),
                     'password': user.get_password(),
                     'admin': user.get_admin_status()}
        return user_dict

    @classmethod
    def change_user(cls, usr_id, param, list_of_changes):
        pass

    @classmethod
    def delete_user(cls, usr_id, param):
        pass
