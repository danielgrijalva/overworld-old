# Overworld Front-end End-to-End Tests
This directory contains test scripts for the Overworld front-end covering end-to-end/system test scenarios. The scripts have been written using Pytest and Selenium WebDriver.

## Setup
All required libraries of test scripts are included in `backend/requirements.txt`. Simply run `pip install -r` and you should be good to go!

## Running the Tests
Tests can be found in `frontend/src/tests/e2e/`. Tests can be run using the command `pytest [path_to_test_script]`. For instance, to run all tests in `e2e/`, simply execute `pytest e2e/`.

Running tests in random order is also an option (and is advisable!) through [pytest-random-order](https://pypi.org/project/pytest-random-order/). To do so, run the pytest command with `--random-order` option.

It is possible to generate a report of a test run through [pytest-html](https://pypi.org/project/pytest-html/). To do so, add `--html=[path_to_test_reports]` to the pytest command. For instance, running `pytest e2e/ --html=overworld/frontend/src/tests/reports/report.html` creates a report in the specified directory with the specified file name.