from ..commands.TestSteps import TestSteps


class LandingPage:
    register = {
        "btn_sign_up": "css=button[type='submit']",
        "btn_user_dropdown": "css=div.dropdown",
        "btn_profile": "css=a[href^='/user/']",
        "input_email": "css=input[name='email']",
        "input_username": "css=input[name='username']",
        "input_password": "css=input[name='password']",
        "input_confirm_password": "css=input[name='password2']",
        "label_error_spiel": "css=div.error.message"
    }
    landing = {
        "btn_get_started": "css=button.green",
        "btn_sign_in": "xpath=//a[@class='link item'][text()='Sign In']",
        "btn_search_result": "css=div.result[name='{}']",
        "label_welcome": "css=div.ui.container h1",
        "input_search": "css=input.prompt",
        "icon_search_loading": "css=div.search.loading"
    }
    login = {
        "input_username": "css=input[name='username']",
        "input_password": "css=input[name='password']",
        "btn_sign_in": "css=button[type='submit']"
    }

    def __init__(self):
        self.steps = TestSteps()

    def click_get_started_button(self, driver):
        self.steps.get_element(driver, self.landing["btn_get_started"]).click()

    def click_sign_in_button(self, driver):
        self.steps.get_element(driver, self.landing["btn_sign_in"]).click()

    def click_search_result(self, driver, search_result):
        search_result_locator = self.landing["btn_search_result"]
        self.steps.get_element(driver, search_result_locator.format(search_result)).click()

    def perform_register(self, driver, email, username, password, confirm_password):
        self.steps.get_element(driver, self.register["input_email"]).send_keys(email)
        self.steps.get_element(driver, self.register["input_username"]).send_keys(username)
        self.steps.get_element(driver, self.register["input_password"]).send_keys(password)
        self.steps.get_element(driver, self.register["input_confirm_password"]).send_keys(confirm_password)
        self.steps.get_element(driver, self.register["btn_sign_up"]).click()

    def perform_login(self, driver, username, password):
        self.steps.get_element(driver, self.login["input_username"]).send_keys(username)
        self.steps.get_element(driver, self.login["input_password"]).send_keys(password)
        self.steps.get_element(driver, self.login["btn_sign_in"]). click()

    def perform_search(self, driver, search_term):
        self.steps.get_element(driver, self.landing["input_search"]).send_keys(search_term)
        self.steps.wait_until_element_not_visible(driver, self.landing["icon_search_loading"])

    def go_to_profile(self, driver):
        self.steps.get_element(driver, self.register["btn_user_dropdown"]).click()
        self.steps.get_element(driver, self.register["btn_profile"]).click()
