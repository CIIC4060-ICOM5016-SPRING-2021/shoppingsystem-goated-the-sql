from flask import jsonify
from dao.parts import PartDAO


class PartController:
    def build_dic(self, row):
        result = {}
        result['Pid'] = row[0]
        result['Pname'] = row[1]
        result['Pprice'] = row[2]
        result['Pcolor'] = row[3]
        result['Pweight'] = row[4]
        result['Pmaterial'] = row[5]
        return result

    def getAllParts(self):
        #    P1 = {'pid': 123, 'pname': 'tuerca', 'pcolor': 'gris', 'price': 0.10}

        dao = PartDAO()
        result_tuples = dao.getAllParts()

        result = []
        for row in result_tuples:
            dict = self.build_dict(row)
            result.append(dict)
            # coge cada row y lo convierte a algo jsonify antes de seguir
        return jsonify(result)
