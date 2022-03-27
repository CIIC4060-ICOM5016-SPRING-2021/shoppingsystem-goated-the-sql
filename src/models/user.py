from src.models.dao.backend import BackEnd


class UserModel:
    f_name: str
    l_name: str
    valid: bool
    password: str
    phone: str
    admin: bool

    # Create function
    def register_user(self):
        BackEnd().create_element(self)

    # Read function
    def get_user(self, user_id):
        # TODO: Implement logic
        return "goomba"

    # Updated function
    def update_user(self, user_id, f_name="", l_name="", pwd="", phone=""):
        return None

    # Delete function
    def hide_user(self, user_id):
        return None
