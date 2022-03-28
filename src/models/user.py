from src.models.dao.backend import BackEnd
import hashlib


class UserModel:
    __f_name: str
    __l_name: str
    __valid: bool
    __password: str
    __phone: str
    __admin: bool

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
    def get_password(self):
        return self.__password

    # Password Setter
    def set_password(self, password: str):
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

    def register_user(self):
        BackEnd().create_element(self)

    def delete_user(self, user_id):
        BackEnd().delete_element(UserModel(), user_id)

    def get_user(self, user_id):
        BackEnd.read_element(UserModel(), pk=user_id)
