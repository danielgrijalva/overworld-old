# Contributing to Overworld

You are here to contribute to Overworld? awesome! :tada:, please read this document in order to know how to ask questions, how to start working on something or how to set up the project on your machine.

All contributors are expected to follow our [Code of Conduct](/CODE_OF_CONDUCT.md). Please make sure you are welcoming and friendly in our community.

* To ask any question related to the project, propose a new feature or report a bug, [create a new issue](https://github.com/danielgrijalva/overworld/issues/new/choose).
* If you want to start contributing, take a look at the current [issues](https://github.com/danielgrijalva/overworld/issues) and comment on the ones you'll work.

You will need to [fork this project](https://help.github.com/en/articles/fork-a-repo) and [submit a pull request](https://help.github.com/en/articles/about-pull-requests) with your contribution. If you are new to open source, check out [GitHub Flow](https://guides.github.com/introduction/flow/index.html) for a more detailed explanation on how the contributing process works.

## Development

The app is separated into two projects, *frontend* (`React`) and *backend* (`Django REST Framework`).

A few things to consider:
* The frontend was bootsrapped using [`create-react-app`](https://github.com/facebook/create-react-app).
* [`Redux`](https://redux.js.org/) is used to manage state across the app.
* We use [`Semantic UI`](https://react.semantic-ui.com/) for UI components.
* For user authentication, we use [`django-rest-knox`](https://github.com/James1345/django-rest-knox).

### Setup

* Obtain your API keys from [IGDB](https://api.igdb.com) and paste it inside your `.env` file. But first, copy the `.env.default` file to your actual `.env`:

```
cp .env.default .env
```

* Now, set up the backend:

```bash
cd backend/
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

* Set up the frontend: 

```bash
cd frontend/
npm install
npm start
```

As you can see, both the frontend and backend are two separate entities. To access the backend API go to `localhost:8000`, but most of the time you'll be using the main app (the frontend) by going to `localhost:3000`.

## Code Style

### Python

Please, follow the [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide. For more information about the Python code style, refer to the [The Hitchhiker’s Guide to Python](https://docs.python-guide.org/writing/style/).

### JavaScript

We follow the [Airbnb style guide](https://github.com/airbnb/javascript) for JavaScript. React specific guidelines can be found [here](https://github.com/airbnb/javascript/tree/master/react).

### Commit style

I personally use the [`gitmoji`](https://gitmoji.carloscuesta.me/) guide for my commit messages to keep them clean and simple. This is merely optional; your commits will be [_squashed_](https://github.blog/2016-04-01-squash-your-commits/) into master anyway :information_desk_person:

Please be thorough and specific with your commits. _Don't_ do anything like this:

```
 git add .
 git commit -m 'updated a lot of stuff'
```

Instead, be more thoughtful and specific:

```
git add /path/to/specific/file/
git commit -m 'quick summary of what you did'
```

I would go even further and add more details to the commit message with [`git commit --ammend`](https://help.github.com/en/articles/changing-a-commit-message):

```
quick summary of what you did
- added more fields to profile model
- fixed bug where profile image wouldn't load
- added documentation to README
```

## Get in touch

You can reach out to me on [Twitter](https://twitter.com/danielgrijalvas) or by [creating a new issue](https://github.com/danielgrijalva/overworld/issues/new/choose) :zap:.
