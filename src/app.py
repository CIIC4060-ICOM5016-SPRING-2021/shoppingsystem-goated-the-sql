from flask import Flask

from controller.products import ProductController

app = Flask(__name__)


@app.route('/')
def handler():
    return 'Hello, World!'


@app.route('/products/all')
def products_handler():
    return ProductController().get_All_Products()


if __name__ == "__main__":
    app.run(debug=True)
