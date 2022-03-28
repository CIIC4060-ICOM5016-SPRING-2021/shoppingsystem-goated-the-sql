from src.models.user import UserModel


class UserController:
    def get_user(self, user_id):
        # This will only return the verification of the account and first & last name for security purposes
        UserModel().get_user(user_id)

    def register_user(self):
        new_user = UserModel()
        # TODO: Get values from the page and add them into a user

        new_user.register_user()
