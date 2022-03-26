class DirectoryTraversal:
    def go_up_dir(self, amount: int, path: str):
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
