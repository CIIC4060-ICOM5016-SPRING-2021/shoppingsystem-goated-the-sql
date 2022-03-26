import re


class Parser:

    # Searches for the given value in a file
    def get_file_value(self, file_path: str, value: str):
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

            # TODO: implement a bit more lazy searching (ie. including spaces surrounding the '=')
            result = re.search(re.escape(value) + r'=\S+', ' '.join(lines)).group()
            return str.replace(result, value + "=", "")
