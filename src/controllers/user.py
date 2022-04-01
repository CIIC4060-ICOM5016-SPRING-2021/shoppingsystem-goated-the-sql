from flask import jsonify

from src.models.user import UserModel


class UserController:
    @classmethod
    def get_user(cls, user_id):
        # This will only return the verification of the account and first & last name for security purposes
        queried_user = UserModel().get_user(user_id)

        if not queried_user:
            return jsonify("User Not Found"), 404
        else:
            return jsonify(UserController().preparer(queried_user)), 200

    @classmethod
    def register_user(cls, json):
        temp_user = UserModel()
        temp_user.set_first_name(json['first_name'])
        temp_user.set_last_name(json['last_name'])
        temp_user.set_password(json['password'])
        temp_user.set_phone_num(json['phone'])
        new_user = temp_user.add_user()
        if not new_user:
            jsonify("Unable to complete request"), 500
        else:
            return jsonify(cls.preparer(new_user))

    @classmethod
    def get_all_users(cls):
        users = []
        for user in UserModel().get_all_users():
            users.append(UserController().preparer(user))

        return jsonify(users)

    @classmethod
    def preparer(cls, user):
        user_dict = {
            'first name': user.get_first_name(),
            'last name': user.get_last_name(),
            'validity': user.get_validity(),
            'phone #': user.get_phone_num(),
            'password': user.get_password(),
            'admin': user.get_admin_status(),
            'id': user.get_user_id()
        }
        return user_dict

    @classmethod
    def change_user(cls, usr_id, param, list_of_changes):
        pass

    @classmethod
    def delete_user(cls, usr_id, param):
        pass
