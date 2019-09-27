from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By


class TestSteps:

    def navigate_to_url(self, driver, url):
        driver.get(url)

    def get_element(self, driver, locator, timeout=15):
        try:
            if locator.startswith("css="):
                return wait(driver, timeout).until(
                    ec.visibility_of_element_located((By.CSS_SELECTOR, locator.split("css=")[1])))
            elif locator.startswith("xpath="):
                return wait(driver, timeout).until(
                    ec.visibility_of_element_located((By.XPATH, locator.split("xpath=")[1])))
        except NoSuchElementException:
            return None

    def get_text(self, driver, locator):
        return self.get_element(driver, locator).text

    def wait_until_element_not_visible(self, driver, locator, timeout=15):
        wait(driver, timeout).until(ec.invisibility_of_element_located((By.CSS_SELECTOR, locator.split("css=")[1])))
