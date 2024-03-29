from src.backend.models.cart import CartModel
from src.backend.models.product import ProductModel


class CartController:
    @classmethod
    def get_cart(cls, usr_id: int):
        user_cart = []
        for item in CartModel.get_cart(usr_id):
            user_cart.append(CartController.model_to_dict(item))

        return user_cart

    @classmethod
    def model_to_dict(cls, cart: CartModel):
        """
            Creates a python dictionary equivalent of a given Cart Model

        :param cart: CartModel to convert
        :return: dictionary equivalent of the CartModel given
        """
        cartdict = {
            'product_id': cart.get_product_id(),
            'usr_id': cart.get_user_id(),
            'quantity': cart.get_product_quantity(),
            'product_price': cart.get_product_price()
        }
        return cartdict

    @classmethod
    def add_product(cls, usr_id, json):
        if not json:
            return False

        prod_id = json['product_id']
        quantity = json['quantity']
        item = ProductModel.get_product(prod_id)
        for i in CartModel.get_cart(usr_id):
            if i.get_product_id() == prod_id:
                return "Item is already in cart, cannot add duplicate item"
        # TODO check if item is already in the users cart and add quantity to the record
        # TODO add max stock to quantity is quantity > stock
        if quantity > item.get_stock():
            return "Quantity to add cannot be larger than stock available"
        temp_cart = CartModel()
        temp_cart.set_user_id(usr_id)
        temp_cart.set_product_id(prod_id)
        temp_cart.set_product_price(item.get_price())
        temp_cart.set_product_quantity(quantity)

        temp_cart.add_item()

        return CartController.get_cart(usr_id)

    @classmethod
    def delete_cart(cls, usr_id, json):
        if CartModel.delete_item(usr_id, json['product_id']):
            return "Product has been removed from cart"

    @classmethod
    def clear_cart(cls, usr_id):
        if CartModel.clear_cart(usr_id):
            return "Cart has been cleared"

    @classmethod
    def update_quantity(cls, usr_id, json):
        if json is None:
            return "No information given"
        else:
            if CartModel.update_quantity(usr_id, json['product_id'], json['quantity']):
                return "Quantity successfully updated."
