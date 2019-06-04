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
* We use `Redux` to manage our state across the app.
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

## Get in touch

You can reach out to me on [Twitter](https://twitter.com/danielgrijalvas) or by [creating a new issue](https://github.com/danielgrijalva/overworld/issues/new/choose) :zap:.
