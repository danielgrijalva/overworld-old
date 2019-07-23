---
description: Running frontend tests in Overworld
---

# Frontend

### Overview

Overworld's frontend unit tests use [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/). Jest is used as the test runner, assertion library and mocking library. Enzyme is a utility that complements Jest to help render components, finding elements and interacting with elements.

### Running the tests

From the `frontend` folder:

```text
npm test
```

### Coverage

Test coverage is measured with Jest's built in test coverage utility and [codecov.io](https://codecov.io). To check coverage locally run the following command.

```text
npm test -- --coverage
```

After the tests are completed, a coverage report will be shown on the command line.

{% hint style="success" %}
Take a look at Overworld's [front end coverage state](https://codecov.io/gh/danielgrijalva/overworld/tree/master/frontend). Or, the [overall coverage state](https://codecov.io/gh/danielgrijalva/overworld).
{% endhint %}

### Test Organization

Overworld's frontend unit tests are colocated with the files and components they are testing. This makes it easy to find the tests related to the components under test. For Jest to find and run a test, the test file name should be in the form of `<component_name>.test.js`. 

For example:

```text
|- /popular
|  |- index.js
|  |- Popular.test.js
|  |- styles.css
```



