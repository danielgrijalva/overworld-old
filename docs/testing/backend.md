---
description: Running backend tests in Overworld
---

# Backend

### Running the tests

From the `backend` folder:

```text
python manage.py test

>>> Ran 34 tests in 3.51s
```

### Coverage

{% hint style="success" %}
Take a look at Overworld's [current coverage state](https://codecov.io/gh/danielgrijalva/overworld).
{% endhint %}

We test coverage with [coverage.py](https://coverage.readthedocs.io/en/v4.5.x/) and [codecov.io](https://codecov.io). To check coverage locally run the following command.

```text
coverage run backend/manage.py test <apps>
coverage report
```

Make sure to run that command from the project root since `coverage` is configured with the `.coveragerc`file. Also, specify which apps you want to test, for example:

```text
coverage run backend/manage.py test actions games users
```

That would run tests across all of Overworld's backend.

