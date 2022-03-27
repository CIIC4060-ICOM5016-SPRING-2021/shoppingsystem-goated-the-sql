from src.models.user import UserModel


class UserController:
    def get_user(self):
        # TODO: Implement calls to logic in models package
        return "goomba"

    def register_user(self):
        new_user = UserModel()
        # TODO: Get values from the page and add them into a user

        new_user.register_user()
