from flask import Flask

from controllers.product import ProductController
from controllers.cart import CartController

app = Flask(__name__)


@app.route('/')
def handler():
    return 'Hello, World!'


@app.route('/product/<int:prod_id>')
def item_handler(prod_id):
    return ProductController.get_product(prod_id)


@app.route('/products/all')
def products_handler():
    return ProductController().get_all_products()


@app.route('/cart')
def carts_handler():
    return CartController().get_cart()


if __name__ == "__main__":
    app.run(debug=True)
