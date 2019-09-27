from ..commands.TestSteps import TestSteps


class ProfilePage:
    profile = {
        "label_username": "css=div.middle.aligned.seven.wide.computer.five.wide.mobile.column h2",
        "label_game_count": "xpath=//div[@class='label'][text()='Games']/preceding-sibling::div[@class='value']"
    }

    def __init__(self):
        self.steps = TestSteps()

    def get_game_count(self, driver):
        return self.steps.get_text(driver, self.profile["label_game_count"])