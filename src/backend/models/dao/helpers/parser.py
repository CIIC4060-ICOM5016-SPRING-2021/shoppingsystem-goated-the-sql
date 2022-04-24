import re


class Parser:

    # Searches for the given value in a file
    @classmethod
    def get_file_value(cls, file_path: str, key: str):
        """
            Gets the corresponding value to a given key in a file.

        :param file_path: path to the desired file to parse
        :param key: key containing the value desired
        :return: value corresponding to the desired key

        :raise ValueError: Key queried was not found within the file
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

            try:
                result = re.search(re.escape(key) + r'\s?=\s?\S+', ' '.join(lines)).group()
            except AttributeError:
                result = re.search(re.escape(key) + r'\s?=\s?\S+', ' '.join(lines))

            if result is not None:
                return str.replace(result.replace(" ", ""), key + "=", "")
            else:
                return ValueError("The key queried was not found within the given file")
