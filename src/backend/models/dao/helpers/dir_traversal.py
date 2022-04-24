class Directories:
    @classmethod
    def go_up_dir(cls, amount: int, path: str):
        """
            Takes a given path and returns a path to previous directories.

        :param amount: amount of directories desired before the given path
        :param path: path to alter
        :return: New path to the x amount of directories before the given path
        """
        # Makes a list of all the directories leading up the given one, cleaning up the empty values just in case
        # something weird happens
        items = path.split("/")
        items = list(filter(lambda a: a != "", items))

        # Remove the amount of directories given (reading end to beginning)
        items = items[:-amount]

        # Create the new directory path
        new_dir = ""
        for path in items:
            new_dir += "/" + path

        return new_dir
