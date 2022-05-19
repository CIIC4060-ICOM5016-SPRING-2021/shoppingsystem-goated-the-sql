class Packager:
    @classmethod
    def package_response(cls, response, obj_type, categories=False):
        """
            Converts a response from the database into an object related to its entity.

        :param categories:
        :param response: List[Tuple] or Tuple containing the information of the entity model desired
        :param obj_type: Entity Model desired
        :return: List[Entity Model] if response is a List or Entity Model if response is a single Tuple
        """
        if response is None:
            return None
        elif type(response) == list:
            result = list()

            for item in response:
                result.append(cls.convert_tuple_to_obj(item, obj_type, True, categories))
            return result
        else:
            converted_obj = cls.convert_tuple_to_obj(response, obj_type, categories)
            return converted_obj

    @classmethod
    def convert_tuple_to_obj(cls, item: tuple, to_obj, multiple_results_likedlist=False, categories=False):
        """
            Converts a given Tuple into the desired Entity Model Object

        :param categories:
        :param multiple_results_likedlist:
        :param item: Tuple to convert
        :param to_obj: String containing the name of Entity Model Object desired
        :return: Entity Model, same type as requested
        """
        if to_obj == 'UserModel':
            from src.backend.models.user import UserModel

            result = UserModel()
            result.set_user_id(item[0])
            result.set_first_name(item[1])
            result.set_last_name(item[2])
            result.set_created_on(item[3])
            result.set_validity(item[4])
            result.set_password(item[5])
            result.set_phone_num(item[6])
            result.set_admin_status(item[7])

            return result
        elif to_obj == 'ProductModel':
            from src.backend.models.product import ProductModel

            result = ProductModel()
            result.set_prod_id(item[0])
            result.set_name(item[1])
            result.set_desc(item[2])
            result.set_price(item[3])
            result.set_category(item[4])
            result.set_stock(item[5])
            result.set_visibility(item[6])

            return result

        elif to_obj == 'OrderProduct':
            from src.backend.models.order import OrderProduct
            result = OrderProduct()
            # product_name, count(*) as appearances
            if categories:
                result.category = item[0]
                result.quantity_bought = item[1]
            else:
                result.name = item[0]
                # using this to store the number of appearances of the product on the table
                result.quantity_bought = item[1]
            return result

        elif to_obj == 'LikedListModel':
            from src.backend.models.liked_list import LikedListModel
            result = LikedListModel()
            if multiple_results_likedlist:
                result.set_like_count(item[0])
                result.set_prod_id(item[1])
            else:
                result.set_like_count(item[0])
            return result

        elif to_obj == 'CartModel':
            from src.backend.models.cart import CartModel
            result = CartModel()
            result.set_product_id(item[0])
            result.set_user_id(item[1])
            result.set_product_quantity(item[2])
            result.set_product_price(item[3])
            if item.__sizeof__() > 3:
                result.set_name(item[4])
            return result

        # NOTE: USE THIS ONLY WHEN YOU ARE SURE YOU WILL RECEIVE TUPLES OF SIZE 1(ONE)
        elif to_obj == 'List':
            return item[0]
