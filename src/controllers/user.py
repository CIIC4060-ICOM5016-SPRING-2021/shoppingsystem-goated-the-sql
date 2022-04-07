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
            return jsonify(UserController().model_to_dict(queried_user)), 200

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
            return jsonify(cls.model_to_dict(new_user))

    @classmethod
    def get_all_users(cls):
        users = []
        for user in UserModel().get_all_users():
            users.append(UserController().model_to_dict(user))

        return jsonify(users)

    @classmethod
    def add_user(cls, request_json):
        """
           Prompts the database to add a new user

           :param request_json:
           :return: 200 and user information when successfully created, 500 on failed user creation
        """
        new_user = cls.json_to_model(request_json)
        new_user = new_user.add_user()

        if new_user:
            return jsonify(cls.model_to_dict(new_user)), 200
        else:
            return jsonify("Unable to create the user."), 500

    @classmethod
    def model_to_dict(cls, user):
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
    def update_user(cls, user_id, updater_id, updates):
        """
            Prompts the database for an attribute change in the requested product.

        :param updates:
        :param updater_id: id of the user requesting the change. Will be verified to check if the
                            required change is allowed
        :param user_id: id of the user to be updated
        :return: 200 if completed successfully, 500 if problem was encountered while making the change, 403 if user is
        not authorized to request the change, 406 if no changes are detected
        """
        user_model = cls.json_to_model(updates)
        user_model.set_user_id(user_id)
        try:
            updated = UserModel.db_update_user(user_model, user_id, updater_id)
            if updated:
                return jsonify("User Updated"), 200
            else:
                return jsonify("Unable to update user"), 500
        except ValueError:
            return jsonify("User is not authorized"), 403
        except AttributeError:
            return jsonify("No changes to user detected"), 204

    @classmethod
    def delete_user(cls, user_id, updater_id):
        """
            Prompts the database to delete a product.

        :param user_id: id of the user requested to delete
        :param updater_id: id of the user requesting the deletion
        :return: 200 if successfully deleted, 500 if problem was encountered while making the deletion, 403 if user is
        not authorized to request the deletion
        """
        try:
            deleted = UserModel().db_delete_user(user_id, updater_id)
            if deleted:
                return jsonify("User Deleted"), 200
            else:
                return jsonify("Unable to delete user"), 500
        except ValueError:
            return jsonify("User is not authorized"), 403

    @classmethod
    def json_to_model(cls, request):
        """
            Creates a Product Entity Model from a received request in JSON.

        :param request: request received via HTTP
        :return: Product Entity Model
        """
        model = UserModel()

        model.set_first_name(request['first_name'])
        model.set_last_name(request['last_name'])
        model.set_validity(request['valid'])
        model.set_password(request['password'])
        model.set_phone_num(request['phone'])
        model.set_admin_status(request['admin'])

        return model
