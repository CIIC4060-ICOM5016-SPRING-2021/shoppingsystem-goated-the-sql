from flask import jsonify


class ProductController:
    def get_All_Products(self):
        P1 = {
            "pid": 123,
            "pname": "tuerca",
            "pcolor": "gris",
            "price": 0.1,
            "pweight": 15,
            "pmaterial": "steel"
        }
        P5 = {
            "pid": 22,
            "pname": "tuerca",
            "pcolor": "gris",
            "price": 0.1,
            "pweight": 15,
            "pmaterial": "steel"
        }
        P3 = {
            "pid": 44,
            "pname": "tuerca",
            "pcolor": "gris",
            "price": 0.1,
            "pweight": 15,
            "pmaterial": "steel"
        }
        P2 = {
            "pid": 5,
            "pname": "tuerca",
            "pcolor": "gris",
            "price": 0.1,
            "pweight": 15,
            "pmaterial": "steel"
        }

        result = [P2, P3, P5, P1]
        return jsonify(result)
