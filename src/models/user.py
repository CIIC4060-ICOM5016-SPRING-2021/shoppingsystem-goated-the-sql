from src.models.dao.backend import BackEnd
import hashlib


# TODO: Missing update-user-in-database functionality (CRD/CRUD implemented)
class UserModel:
    __user_id: int
    __f_name: str
    __l_name: str
    __valid: bool
    __password: str
    __phone: str
    __admin: bool

    # User ID Getter
    def get_user_id(self):
        return self.__user_id

    # User ID Setter
    def set_user_id(self, user_id: int):
        self.__user_id = user_id

    # First Name Getter
    def get_first_name(self):
        return self.__f_name

    # First Name Setter
    def set_first_name(self, new_first_name: str):
        self.__f_name = new_first_name

    # Last Name Getter
    def get_last_name(self):
        return self.__l_name

    # Last Name Setter
    def set_last_name(self, new_last_name: str):
        self.__l_name = new_last_name

    # Validity Getter
    def get_validity(self):
        return self.__valid

    # Validity Setter
    def set_validity(self, validity: bool):
        self.__valid = validity

    # Password Getter
    # TODO: Find a more secure way of passing the password to store in the database

    #       Maybe make it so that the password is hashed in logic outside the controller and within the class itself?
    #       ie. whenever the password value gets initiated?
    #       too much work to solve for the project atm gonna just leave it for later
    def get_password(self):
        return self.__password

    # Password Setter
    def set_password(self, password: str):
        # TODO: Update the Relational Table Diagram to represent the varchar limit increment
        pwd_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        self.__password = pwd_hash

    # Phone Getter
    def get_phone_num(self):
        return self.__phone

    # Phone Setter
    def set_phone_num(self, new_phone_num):
        self.__phone = new_phone_num

    # Admin Status Getter
    def get_admin_status(self):
        return self.__admin

    # Admin Status Setter
    def set_admin_status(self, status: bool):
        self.__admin = status

    @classmethod
    def add_user(cls):
        BackEnd().create_element(cls)

    # TODO: Ask if this should be a toggle for visibility or an outright deletion of user records
    @classmethod
    def delete_user(cls, user_id):
        BackEnd().delete_element(UserModel(), user_id)

    @classmethod
    def get_user(cls, user_id):
        return BackEnd.get_element(UserModel(), pk=user_id)

    @classmethod
    def db_is_admin(cls, user_id):
        user = BackEnd().get_element(UserModel(), pk=user_id)
        if user.get_admin_status():
            return True
        else:
            return False

