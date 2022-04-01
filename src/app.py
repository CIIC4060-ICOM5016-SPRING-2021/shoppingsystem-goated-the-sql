from flask import Flask, request, jsonify

from controllers.cart import CartController
from controllers.product import ProductController
from controllers.user import UserController
from models.user import UserModel

app = Flask(__name__)

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


@app.route('/goated_the_sql/product/<int:prod_id>', methods=['GET', 'PUT', 'DELETE'])
def item_handler(prod_id):
    if request.method == 'GET':
        return ProductController.get_product(prod_id)
    elif request.method == 'PUT':
        # dummy code to get the idea through
        list_of_changes = []
        return ProductController.change_product(prod_id, user.get_user_id(), list_of_changes)
    elif request.method == 'DELETE':
        # dummy code to get the idea through
        return ProductController.delete_product(prod_id, user.get_user_id())
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/products/all', methods=['GET', 'POST'])
def products_handler():
    if request.method == 'GET':
        return ProductController.get_all_products()
    elif request.method == 'POST':
        # this post is simulating what the professor did it class. Unsure what to
        # do with it rn (03/31/2022)
        # dummy code to get the idea through
        return ProductController.add_product(request.json)
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/users/all', methods=['GET'])
def users_handler():
    if request.method == 'GET':
        return UserController.get_all_users()
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/user/add', methods=['POST'])
def user_add():
    if request.method == 'POST':
        created_user = UserController.register_user(request.json)
        return created_user
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/user/<int:usr_id>', methods=['GET', 'PUT', 'DELETE'])
def user_handler(usr_id):
    if request.method == 'GET':
        return UserController.get_user(usr_id)
    elif request.method == 'PUT':
        # dummy code to get the idea through
        list_of_changes = []
        return UserController.change_user(usr_id, user.get_user_id(), list_of_changes)
    elif request.method == 'DELETE':
        # dummy code to get the idea through
        return UserController.delete_user(usr_id, user.get_user_id())
    else:
        return jsonify("Operation not suGOATED."), 405


@app.route('/goated_the_sql/cart')
def carts_handler():
    return CartController().get_cart()


if __name__ == "__main__":
    app.run(debug=True)
