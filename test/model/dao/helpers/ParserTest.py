import unittest
import os
from src.models.dao.helpers.parser import Parser

current_dir = os.path.dirname(__file__)


class TestParser(unittest.TestCase):
    def test_get_from_file(self):
        prsr = Parser()

        # Host check
        self.assertEqual(
            prsr.get_file_value("../files/test_credentials.txt", "host"),
            "goomba")
        # Username check
        self.assertEqual(
            prsr.get_file_value("../files/test_credentials.txt", "username"),
            "goomber3000")
        # Password check
        self.assertEqual(
            prsr.get_file_value("../files/test_credentials.txt", "password"),
            "toogoomboyou")
        # Database check
        self.assertEqual(
            prsr.get_file_value("../files/test_credentials.txt", "database"),
            "bowsercastle")

