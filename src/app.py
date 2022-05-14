import logging
import sys

from flask import Flask, request, jsonify

from src.backend.controllers.cart import CartController
from src.backend.controllers.liked_list import LikedListController
from src.backend.controllers.order import OrderController, OrderProductController
from src.backend.controllers.product import ProductController
from src.backend.controllers.user import UserController

app = Flask(__name__)

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)


# Sign up must be done, probably not on this page, to validate the user
# before granting powers over the DB


# methods=['GET','POST','PUT','DELETE']

# The requests won't be handled here. We call our controllers to do that for us
# There is a library that allows you to do the routing on other files, but this is
# the simplest way

@app.route('/')
def handler():
    return 'Hello, World!'


# ================================================= v PRODUCTS v =======================================================
@app.route('/goated_the_sql/products/all', methods=['GET'])
def all_products():
    if request.method == 'GET':
        if request.data:
            if 'request' in request.json.keys():
                if request.json['request'] == 'ordered':
                    return ProductController.get_all_products_organized(request.json['filter'],
                                                                        request.json['in_ascending_order'])
                elif request.json['request'] == 'filtered':
                    return ProductController.get_all_products_by_category(request.json['category'])

        else:
            list_of_products = ProductController.get_all_products()
            return_json = {"Products": list_of_products}
            global_statistics = {"Cheapest Products": ProductController.get_cheapest_products(),
                                 "Most Expensive Products": ProductController.get_priciest_products(),
                                 "Most Liked Products": LikedListController.get_top_likes(),
                                 "Hottest Categories": OrderProductController.get_top_categories(),
                                 "Hottest Products": OrderProductController.get_top_products()
                                 }
            return_json["Global Statistics"] = global_statistics

            return jsonify(return_json)
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/product/add', methods=['POST'])
def register_product():
    if request.method == 'POST':
        if request.data:
            if request.json:
                return ProductController.add_product(request.json)
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/product/<int:prod_id>', methods=['GET', 'PUT', 'DELETE', 'POST'])
def product_page(prod_id):
    if request.method == 'GET':

        product_details = ProductController.get_product(prod_id)

        if type(product_details) == dict:
            return_list = [product_details,
                           {"liked_count": LikedListController.get_likes_of_prod(prod_id).get_like_count()}]
            return jsonify(return_list)
        else:
            return jsonify("Product Not Found"), 404
    elif request.method == 'PUT':
        if request.data:
            if request.json:
                # If it receives no JSON request then it will assume the user wants to like the product
                if type(request.json) is list:
                    if UserController.get_user(request.json[0]['user_id'])[1] == 200:
                        return ProductController.update_product(request.json[1], request.json[0])
                    else:
                        return jsonify("User Not Found"), 404
                else:
                    # Will check if this user has liked this product before, toggling the like status
                    if UserController.get_user(request.json['user_id'])[1] == 200:
                        LikedListController.toggle_like(prod_id, request.json['user_id'])
                        return_list = [ProductController.get_product(prod_id),
                                       {"liked_count": LikedListController.get_likes_of_prod(prod_id).get_like_count()}]
                        return jsonify(return_list)
                    else:
                        return jsonify("User Not Found"), 404

    elif request.method == 'POST':
        if request.data:
            if request.json:
                # Request contains product id and quantity
                return jsonify(CartController.add_product(request.json['user_id'], request.json))

    elif request.method == 'DELETE':
        """ 
        I have no idea how to get the user id securely, Imma be honest...
            The following line is way too easy to bypass in terms of security, someone could just spam numbers until 
            they get a user id that has admin rights
        """

        if request.data:
            if request.json:
                product_details = ProductController.get_product(prod_id)

                if type(product_details) == dict:
                    return ProductController.delete_product(prod_id, request.json['user_id'])
                else:
                    return jsonify("Product Not Found"), 404
    else:
        return jsonify("Operation not suGOATED."), 405


# ======================================================================================================================

# =================================================== v USERS v ========================================================
@app.route('/goated_the_sql/users/all', methods=['GET'])
def users_handler():
    if request.method == 'GET':
        return UserController.get_all_users()
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/user/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def user_handler(user_id):
    if request.method == 'GET':
        return UserController.get_user(user_id)
    elif request.method == 'PUT':
        if request.data:
            if request.json:
                requester_id = UserController.get_user(request.json['user_to_update_id'])
                subject_id = UserController.get_user(user_id)

                # Repeated code, fix this after project complete
                if requester_id[1] == 200 and subject_id[1] == 200:
                    return UserController.update_user(request.json['user_to_update_id'], user_id, request.json)
                elif requester_id[1] != 200 and subject_id[1] == 200:
                    return jsonify("User Requesting Change Not Found"), 404
                elif requester_id[1] == 200 and subject_id[1] != 200:
                    return jsonify("User To Be Updated Not Found"), 404
                elif requester_id[1] != 200 and subject_id[1] != 200:
                    return jsonify("Users Not Found"), 404
    elif request.method == 'DELETE':
        if request.data:
            if request.json:
                requester_id = UserController.get_user(request.json['user_to_update_id'])
                subject_id = UserController.get_user(user_id)

                # Repeated code, fix this after project complete
                if requester_id[1] == 200 and subject_id[1] == 200:
                    return UserController.delete_user(request.json['user_to_update_id'], user_id)
                elif requester_id[1] != 200 and subject_id[1] == 200:
                    return jsonify("User Requesting Change Not Found"), 404
                elif requester_id[1] == 200 and subject_id[1] != 200:
                    return jsonify("User To Be Updated Not Found"), 404
                elif requester_id[1] != 200 and subject_id[1] != 200:
                    return jsonify("Users Not Found"), 404
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/<int:user_id>/liked_list', methods=['GET'])
def liked_list(user_id):
    if request.method == 'GET':
        user_requested = UserController.get_user(user_id)

        if type(user_requested) == tuple and user_requested[1] == 200:
            likes_list = LikedListController().get_likes(user_id)
            return jsonify(likes_list)
        else:
            return jsonify("User Not Found"), 404
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/sign-up', methods=['POST'])
def register_user():
    if request.method == 'POST':
        if request.data:
            if request.json:
                return UserController.add_user(request.json)
    else:
        return jsonify("Operation not suGOATED."), 405


# ======================================================================================================================

# =================================================== v CART v =========================================================
@app.route('/goated_the_sql/cart/<int:usr_id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def carts_handler(usr_id):
    if request.method == 'GET':
        return jsonify(CartController.get_cart(usr_id))
    elif request.method == 'PUT':
        if request.data:
            if request.json:
                return jsonify(CartController.update_quantity(usr_id, request.json))
    elif request.method == 'POST':
        if request.data:
            if request.json:
                return jsonify(CartController.add_product(usr_id, request.json))
    elif request.method == 'DELETE':
        if request.data:
            if request.json:
                return jsonify(CartController.delete_cart(usr_id, request.json))
        else:
            return jsonify(CartController.clear_cart(usr_id))
    else:
        return jsonify("Lmao no"), 405


# ======================================================================================================================

# =================================================== v ORDERS v =======================================================
@app.route('/goated_the_sql/user/<int:user_id>/orders', methods=['GET', 'PUT', 'DELETE'])
def orders_page(user_id):
    if request.method == 'GET':
        if request.data:
            if request.json:
                if UserController.get_user(user_id)[1] == 200:
                    return OrderController.get_specific_order(user_id, request.json['order_id'])
                else:
                    return jsonify("User Not Found"), 404
        else:
            if UserController.get_user(user_id)[1] == 200:
                json = {"Orders": OrderController.get_all_orders(user_id),
                        "Personalized User Statistics": OrderProductController.get_personalized_user_statistics(
                            user_id)
                        }
                return jsonify(json)
            else:
                return jsonify("User Not Found"), 404
    elif request.method == 'PUT':
        if request.data:
            if request.json:
                # This works so the user who is in their order's page is the person requesting the change,
                # that way if a normal user is trying to change an order they'll be limited to only their orders
                # when trying to request.
                if UserController.get_user(user_id)[1] == 200:
                    return OrderController.update_order(request.json['order_user_id'],
                                                        user_id,
                                                        request.json['order_id'],
                                                        request.json['changed_order'])
                else:
                    return jsonify("User Not Found"), 404
            else:
                return jsonify("Must provide order changes."), 400
        else:
            return jsonify("No update information provided."), 400

    elif request.method == 'DELETE':
        if request.data:
            if request.json:
                if UserController.get_user(user_id)[1] == 200:
                    return OrderController.delete_order(user_id, request.json['order_id'])
                else:
                    return jsonify("User Not Found"), 404
            else:
                return jsonify("Must provide order to delete."), 400
        else:
            return jsonify("No deletion information provided."), 400

    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/checkout', methods=['POST'])
def checkout_page():
    if request.data:
        if request.json:
            try:
                # Check if the user exists
                orderer_id = UserController.get_user(request.json['user_id'])

                if orderer_id[1] == 200:
                    return OrderController.create_order(request.json['user_id'], request.json['order_products'])
                else:
                    return jsonify("User Not Found"), 404
            except KeyError:
                return OrderController.create_order_from_cart(request.json['user_id'])
    else:
        return jsonify("No order information provided."), 400


# ======================================================================================================================

if __name__ == "__main__":
    app.run(debug=True)
