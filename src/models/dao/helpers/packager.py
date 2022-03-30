from flask import jsonify


class Packager:
    @classmethod
    def package_response(cls, response, obj_type):
        if type(response) == list:
            result = list()

            for item in response:
                result.append(cls.convert(item, obj_type))
            return result
        else:
            return cls.convert(response, obj_type)

    @classmethod
    def convert(cls, item: tuple, to_obj):
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
            result2=[item[0],
                     item[1],
                     item[2],
                     item[3],
                     item[4],
                     item[5],
                     item[6],
                     item[7]]

            result.set_prod_id(item[0])
            result.set_name(item[1])
            result.set_desc(item[2])
            result.set_price(item[3])
            result.set_category(item[4])
            result.set_likes(item[5])
            result.set_quantity(item[6])
            result.set_visibility(item[7])

            return result2
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
