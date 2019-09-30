import pytest

from ..commands.Utils import Utils
from ..commands.Assertions import Assertions
from ..commands.TestSteps import TestSteps
from ..page_objects import LandingPage
from ..page_objects import ProfilePage


class TestRegister(object):
    utils = None
    asserts = None
    steps = None
    driver = None
    landing_page = None
    profile_page = None
    register_data = None
    config_data = None

    @classmethod
    def setup_class(cls):
        cls.utils = Utils()
        cls.asserts = Assertions()
        cls.steps = TestSteps()
        cls.driver = cls.utils.set_webdriver("chromedriver")
        cls.landing_page = LandingPage.LandingPage()
        cls.profile_page = ProfilePage.ProfilePage()
        cls.register_data = cls.utils.get_test_data("register", "local")
        cls.config_data = cls.utils.get_config_data()

    def setup_method(self):
        self.steps.navigate_to_url(self.driver, self.config_data["url_base_local"])

    @classmethod
    def teardown_class(cls):
        cls.utils.close_webdriver(cls.driver)

    @pytest.mark.smoke
    def test_valid_registration(self):
        """Test that registration succeeds when valid inputs are provided."""
        register_email = self.utils.generate_test_email()
        username = self.utils.generate_test_username()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, register_email, username,
                                           self.register_data["input_data"]["password"],
                                           self.register_data["input_data"]["password"])
        self.steps.wait_until_element_not_visible(self.driver, self.landing_page.register["btn_sign_up"])
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.landing["label_welcome"]),
            self.register_data["expected_data"]["spiel_register_success"])
        self.landing_page.go_to_profile(self.driver)
        profile_url = self.config_data["url_base_local"] + self.config_data["url_profile"]
        self.asserts.verify_url(self.driver, profile_url.format(username))
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.profile_page.profile["label_username"]), username)

    @pytest.mark.negative
    def test_register_with_existing_email(self):
        """Test that registration fails when a used email address is provided."""
        username = self.utils.generate_test_username()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, self.register_data["input_data"]["email"], username,
                                           self.register_data["input_data"]["password"],
                                           self.register_data["input_data"]["password"])
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.register["label_error_spiel"]),
            self.register_data["expected_data"]["spiel_existing_email_error"])

    @pytest.mark.negative
    def test_register_with_invalid_email_address(self):
        """Test that registration fails when an invalid format email address is provided."""
        register_email = self.utils.generate_test_email(domain="invalid")
        username = self.utils.generate_test_username()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, register_email, username,
                                           self.register_data["input_data"]["password"],
                                           self.register_data["input_data"]["password"])
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.register["label_error_spiel"]),
            self.register_data["expected_data"]["spiel_invalid_email_error"])

    @pytest.mark.negative
    def test_register_with_blank_username(self):
        """Test that registration fails when spaces are provided for the username."""
        register_email = self.utils.generate_test_email()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, register_email, " ",
                                           self.register_data["input_data"]["password"],
                                           self.register_data["input_data"]["password"])
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.register["label_error_spiel"]),
            self.register_data["expected_data"]["spiel_blank_field_error"])

    @pytest.mark.negative
    def test_register_with_existing_username(self):
        """Test that registration fails when a used username is provided."""
        register_email = self.utils.generate_test_email()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, register_email,
                                           self.register_data["input_data"]["existing_username"],
                                           self.register_data["input_data"]["password"],
                                           self.register_data["input_data"]["password"])
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.register["label_error_spiel"]),
            self.register_data["expected_data"]["spiel_existing_username_error"])

    @pytest.mark.negative
    def test_register_with_invalid_username(self):
        """Test that registration fails when an invalid format username is provided."""
        register_email = self.utils.generate_test_email()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, register_email,
                                           self.register_data["input_data"]["invalid_username"],
                                           self.register_data["input_data"]["password"],
                                           self.register_data["input_data"]["password"])
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.register["label_error_spiel"]),
            self.register_data["expected_data"]["spiel_invalid_username_error"])

    @pytest.mark.negative
    def test_register_with_long_username(self):
        """Test that registration fails when a username with more than 150 characters is provided."""
        register_email = self.utils.generate_test_email()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, register_email,
                                           self.register_data["input_data"]["long_username"],
                                           self.register_data["input_data"]["password"],
                                           self.register_data["input_data"]["password"])
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.register["label_error_spiel"]),
            self.register_data["expected_data"]["spiel_long_username_error"])

    @pytest.mark.negative
    def test_register_with_blank_password(self):
        """Test that registration fails when blanks are provided for the password."""
        register_email = self.utils.generate_test_email()
        username = self.utils.generate_test_username()
        self.landing_page.click_get_started_button(self.driver)
        self.landing_page.perform_register(self.driver, register_email, username, "        ", "        ")
        self.asserts.verify_element_text(
            self.steps.get_element(self.driver, self.landing_page.register["label_error_spiel"]),
            self.register_data["expected_data"]["spiel_blank_field_error"])
