"""Re-usable methods for setting up and manipulating environment and test data."""

import os
import json

from selenium import webdriver
from faker import Faker

_pwd = os.path.dirname(__file__).split("overworld")[0]


class Utils:
    def __init__(self):
        with open(_pwd + "overworld\\frontend\\src\\tests\\data\\config\\config.json") as json_file:
            self.config_data = json.load(json_file)
        self.fake = Faker()

    def set_webdriver(self, driver):
        driver = driver.lower()
        if driver == "chromedriver":
            driver_instance = webdriver.Chrome(self.config_data["chromedriver_path"])
            driver_instance.implicitly_wait(self.config_data["implicit_wait_timeout"])
            return driver_instance

    def close_webdriver(self, driver):
        driver.close()

    def get_config_data(self):
        return self.config_data

    def get_test_data(self, test_data_name, test_env):
        with open(_pwd + "overworld\\frontend\\src\\tests\\data\\test_data\\" + test_data_name + ".json") as json_file:
            return json.load(json_file)[test_env]

    def generate_test_email(self, domain=None):
        return self.fake.email(domain)

    def generate_test_username(self):
        return self.fake.user_name()