import re


class Parser:

    # Searches for the given value in a file
    def get_file_value(self, file_path: str, value: str):
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

            try:
                result = re.search(re.escape(value) + r'\s?=\s?\S+', ' '.join(lines)).group()
            except AttributeError:
                result = re.search(re.escape(value) + r'\s?=\s?\S+', ' '.join(lines))

            if result is not None:
                return str.replace(result.replace(" ", ""), value + "=", "")
            else:
                return ValueError("The value queried was not found within the given file")
