import hashlib
from datetime import datetime

import psycopg2

from src.backend.models.dao.db_connection import BackEnd


class UserModel:
    __user_id: int
    __f_name: str
    __l_name: str
    __valid: bool
    __password: str
    __phone: str
    __admin: bool
    __created_on: datetime

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

    # Created_on Getter
    def get_created_on(self):
        return self.__created_on

    # Created_on Setter
    def set_created_on(self, created_on: datetime):
        self.__created_on = created_on

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
        # pwd_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        self.__password = password

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

    def add_user(self):
        return BackEnd.create_element(self)

    @classmethod
    def delete_user(cls, user_id):
        BackEnd().delete_element(UserModel(), user_id)

    @classmethod
    def db_delete_user(cls, user_id, updater_id):
        """
           Queries a deletion in the database if the user has administrative rights to make this change.

       :param user_id: id of the user being requested to delete
       :param updater_id: id of the user requesting the change
       :return: True if the product is deleted successfully, False if there is problem deleting the product
       :raises ValueError: user does not have rights to delete the product
       """

        if UserModel.db_is_admin(updater_id):
            return BackEnd.delete_element(UserModel(), user_id)
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def db_update_user(cls, model, user_id, updater_id):
        """
            Compares a given product with one in the database with the same id number. Then queries an update to a
            product in the database.


        :param model: User Entity Model containing all the changes to the user
        :param user_id: id of the user being updated
        :param updater_id: id of the user requesting the update
        :return: True if the product is successfully updated or there are no changes found between the requested updates
        and the database,
        """

        if UserModel.db_is_admin(updater_id) or updater_id == user_id:
            try:
                db_model = UserModel.get_user(user_id)

                changes = []
                if db_model.get_first_name() != model.get_first_name():
                    changes.append("first_name = '{}'".format(model.get_first_name()))

                if db_model.get_last_name() != model.get_last_name():
                    changes.append("last_name = '{}'".format(model.get_last_name()))

                if db_model.get_validity() != model.get_validity():
                    changes.append("valid = {}".format(model.get_validity()))

                if db_model.get_password() != model.get_password():
                    changes.append("password = '{}'".format(model.get_password()))

                if db_model.get_phone_num() != model.get_phone_num():
                    changes.append("phone = {}".format(model.get_phone_num()))

                if db_model.get_admin_status() != model.get_admin_status():
                    changes.append("admin = {}".format(model.get_admin_status()))

                if changes:
                    BackEnd.update_element_attribute("usr",
                                                     ", ".join(changes),
                                                     "user_id  = {}".format(user_id)
                                                     )
                    return True
                else:
                    raise AttributeError("No differences were found between the database and given user.")
            except psycopg2.Error:
                return False
        else:
            raise ValueError("User does not have the rights to make this change.")

    @classmethod
    def get_user(cls, user_id):
        """

        :param user_id: user identification number
        :return: UserModel of found Model, None if not found
        """
        return BackEnd().get_element(UserModel(), user_id, "*")

    @classmethod
    def get_all_users(cls):
        """
        Queries the database for all users in the catalog

        :return: list containing UserModels
        """
        return BackEnd().get_all_elements(UserModel(), "*", "")

    @classmethod
    def db_is_admin(cls, user_id):
        user = BackEnd().get_element(UserModel(), user_id, "*")
        if user.get_admin_status():
            return True
        else:
            return False
