

class Packager:
    @classmethod
    def package_response(cls, response, obj_type):
        """
            Converts a response from the database into an object related to its entity.

        :param response: List[Tuple] or Tuple containing the information of the entity model desired
        :param obj_type: Entity Model desired
        :return: List[Entity Model] if response is a List or Entity Model if response is a single Tuple
        """
        if response is None:
            return None
        elif type(response) == list:
            result = list()

            for item in response:
                result.append(cls.convert_tuple_to_obj(item, obj_type))
            return result
        else:
            return cls.convert_tuple_to_obj(response, obj_type)

    @classmethod
    def convert_tuple_to_obj(cls, item: tuple, to_obj):
        """
            Converts a given Tuple into the desired Entity Model Object

        :param item: Tuple to convert
        :param to_obj: String containing the name of Entity Model Object desired
        :return: Entity Model, same type as requested
        """
        if to_obj == 'UserModel':
            from src.models.user import UserModel
            result = UserModel()

            result.set_first_name(item[0])
            result.set_last_name(item[1])
            result.set_validity(item[2])
            result.set_phone_num(item[3])
            result.set_admin_status(item[4])

            return result
        elif to_obj == 'ProductModel':
            from src.models.product import ProductModel

            result = ProductModel()
            result.set_prod_id(item[0])
            result.set_name(item[1])
            result.set_desc(item[2])
            result.set_price(item[3])
            result.set_category(item[4])
            result.set_likes(item[5])
            result.set_quantity(item[6])
            result.set_visibility(item[7])

            return result
        elif to_obj == 'OrderModel':
            from src.models.order import OrderModel
            result = OrderModel()
            # TODO: Insert logic
            return result
        elif to_obj == 'LikedListModel':
            from src.models.liked_list import LikedListModel
            result = LikedListModel()
            # TODO: Insert logic
            return result
        elif to_obj == 'CartModel':
            from src.models.cart import CartModel
            result = CartModel()
            # TODO: Insert logic
            return result