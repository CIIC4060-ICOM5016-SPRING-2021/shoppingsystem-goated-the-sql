from src.models.dao.backend import BackEnd
import hashlib


class UserModel:
    f_name: str
    l_name: str
    valid: bool
    password: str
    phone: str
    admin: bool

    # First Name Getter
    def get_first_name(self):
        return self.f_name

    # First Name Setter
    def set_first_name(self, new_first_name: str):
        self.f_name = new_first_name

    # Last Name Getter
    def get_last_name(self):
        return self.l_name

    # Last Name Setter
    def set_last_name(self, new_last_name: str):
        self.l_name = new_last_name

    # Validity Getter
    def get_validity(self):
        return self.valid

    # Validity Setter
    def set_validity(self, validity: bool):
        self.valid = validity

    # Password Setter
    def set_password(self, password: str):
        pwd_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        self.password = pwd_hash

    # Phone Getter
    def get_phone_num(self):
        return self.phone

    # Phone Setter
    def set_phone_num(self, new_phone_num):
        self.phone = new_phone_num

    # Admin Status Getter
    def get_admin_status(self):
        return self.admin

    def register_user(self):
        BackEnd().create_element(self)

    def get_user(self, user_id):
        BackEnd.read_element(UserModel(), pk=user_id)
