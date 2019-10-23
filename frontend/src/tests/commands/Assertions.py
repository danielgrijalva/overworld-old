"""Re-usable methods for asserting the expected results in tests."""


class Assertions:
    def verify_url(self, driver, expected_url):
        assert expected_url in driver.current_url

    def verify_element_text(self, element, expected_text):
        assert expected_text in element.text, element.text + " did not equal '" + expected_text + "'."