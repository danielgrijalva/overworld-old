"""Locators for the Game details page, and methods for interacting with them."""

from ..commands.TestSteps import TestSteps


class GamePage:
    game = {
        "btn_played": "css=div i[value='played']"
    }

    def __init__(self):
        self.steps = TestSteps()

    def click_played_button(self, driver):
        self.steps.get_element(driver, self.game["btn_played"]).click()