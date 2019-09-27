import pytest

from ..commands.Utils import Utils
from ..commands.Assertions import Assertions
from ..commands.TestSteps import TestSteps
from ..page_objects import LandingPage
from ..page_objects import ProfilePage
from ..page_objects import GamePage

utils = None
asserts = None
steps = None
driver = None
landing_page = None
profile_page = None
game_page = None
login_data = None
log_data = None
config_data = None


class TestLog(object):
    utils = None
    asserts = None
    steps = None
    driver = None
    landing_page = None
    profile_page = None
    game_page = None
    login_data = None
    log_data = None
    config_data = None

    def search_game_and_click_played(self, driver, game_title):
        self.landing_page.perform_search(driver, game_title)
        self.landing_page.click_search_result(driver, game_title)
        self.game_page.click_played_button(driver)

    @classmethod
    def setup_class(cls):
        cls.utils = Utils()
        cls.asserts = Assertions()
        cls.steps = TestSteps()
        cls.driver = cls.utils.set_webdriver("chromedriver")
        cls.landing_page = LandingPage.LandingPage()
        cls.profile_page = ProfilePage.ProfilePage()
        cls.game_page = GamePage.GamePage()
        cls.login_data = cls.utils.get_test_data("login", "local")
        cls.log_data = cls.utils.get_test_data("log", "local")
        cls.config_data = cls.utils.get_config_data()
        cls.steps.navigate_to_url(cls.driver, cls.config_data["url_base_local"])
        cls.landing_page.click_sign_in_button(cls.driver)
        cls.landing_page.perform_login(cls.driver, cls.login_data["input_data"]["username"],
                                       cls.login_data["input_data"]["password"])
        cls.steps.wait_until_element_not_visible(cls.driver, cls.landing_page.login["btn_sign_in"])

    def setup_method(self):
        self.steps.navigate_to_url(self.driver, self.config_data["url_base_local"])

    def teardown_method(self):
        self.search_game_and_click_played(self.driver, self.log_data["input_data"]["game_title"])

    @classmethod
    def teardown_class(cls):
        cls.utils.close_webdriver(cls.driver)

    @pytest.mark.smoke
    def test_mark_game_as_played(self):
        self.landing_page.go_to_profile(self.driver)
        current_game_count = self.profile_page.get_game_count(self.driver)
        self.search_game_and_click_played(self.driver, self.log_data["input_data"]["game_title"])
        self.landing_page.go_to_profile(self.driver)
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.profile_page.profile["label_game_count"]),
            str(int(current_game_count) + 1))
