import re


class Parser:

    # Searches for the given value in a file
    def get_file_value(self, file_path: str, value: str):
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

            result = re.search(re.escape(value) + r'[[:space:]]?=[[:space:]]?\S+', ' '.join(lines)).group()
            return str.replace(result, value + "=", "")
