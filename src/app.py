import logging
import sys

from flask import Flask, request, jsonify

from src.controllers.cart import CartController
from src.controllers.liked_list import LikedListController
from src.controllers.product import ProductController
from src.controllers.user import UserController
from src.models.user import UserModel

app = Flask(__name__)

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

# Sign up must be done, probably not on this page, to validate the user
# before granting powers over the DB
user = UserModel()
user.set_user_id(1)


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
        return ProductController.get_all_products()
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/product/add', methods=['POST'])
def register_product():
    if request.method == 'POST':
        return ProductController.add_product(request.json)
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/product/<int:prod_id>', methods=['GET', 'PUT', 'DELETE'])
def product_page(prod_id):
    if request.method == 'GET':
        return_list = [ProductController.get_product(prod_id),
                       {"liked_count": LikedListController.get_likes_of_prod(prod_id).get_like_count()}]
        return jsonify(return_list)
    elif request.method == 'PUT':
        # dummy code to get the idea through
        # list_of_changes = {"like": 1}
        # ProductController.change_product(prod_id, user.get_user_id(), list_of_changes)
        # return_list = [ProductController.get_product(prod_id),
        #              {"liked_count": LikedListController.get_likes_of_prod(prod_id).get_like_count()}]
        # return jsonify(return_list)
        if UserModel.db_is_admin(user.get_user_id()):
            return ProductController.update_product(request.json[1], request.json[0])
        else:
            # Will check if this user has liked this product before, toggling the like status
            LikedListController.toggle_like(prod_id, user.get_user_id())
            return_list = [ProductController.get_product(prod_id),
                           {"liked_count": LikedListController.get_likes_of_prod(prod_id).get_like_count()}]
            return jsonify(return_list)

    elif request.method == 'POST':
        # Need the request to be a json of the product
        # request.json[0] is the quantity
        return CartController.add_product(user.get_user_id(), prod_id, request.json[0])

    elif request.method == 'DELETE':
        """ 
        I have no idea how to get the user id securely, Imma be honest...
            The following line is way too easy to bypass in terms of security, someone could just spam numbers until 
            they get a user id that has admin rights
        """
        return ProductController.delete_product(prod_id, request.json['user_id'])
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
        return UserController.update_user(user_id, user.get_user_id(), request.json)
    elif request.method == 'DELETE':
        return UserController.delete_user(user_id, user.get_user_id())
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/sign-up', methods=['POST'])
def register_user():
    if request.method == 'POST':
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
        return jsonify(CartController.update_quantity(usr_id, request.json))
    elif request.method == 'POST':
        return jsonify(CartController.add_product(usr_id, request.json))
    elif request.method == 'DELETE':
        return jsonify(CartController.delete_cart(usr_id, request.json))
    else:
        return jsonify("Lmao no"), 405


@app.route('/goated_the_sql/<int:user_id>/liked_list', methods=['GET'])
def liked_list(user_id):
    if request.method == 'GET':
        likes_list = LikedListController().get_likes(user_id)
        return jsonify(likes_list)
    else:
        return jsonify("Operation not suGOATED."), 405


# ======================================================================================================================
if __name__ == "__main__":
    app.run(debug=True)
