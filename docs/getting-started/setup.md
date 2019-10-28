---
description: Installing Overworld in your machine
---

# Setup

The app is separated into two projects, `frontend` \([React](https://reactjs.org/)\) and `backend` \([Django REST Framework](https://www.django-rest-framework.org/)\).

A few things to consider:

* The frontend was bootsrapped using [`create-react-app`](https://github.com/facebook/create-react-app).
* [`Redux`](https://redux.js.org/) is used to manage state across the app.
* We use [`Semantic UI`](https://react.semantic-ui.com/) for UI components.
* For user authentication, we use [`django-rest-knox`](https://github.com/James1345/django-rest-knox).

{% hint style="info" %}
Overworld needs Python 3.6+ to run.
{% endhint %}

## Installation

After forking the repository, copy the `.env.default` file to your actual `.env`:

```bash
cp .env.default .env
```

Then obtain your API keys from [IGDB](https://api.igdb.com) and paste it inside your new `.env` file.

#### Set up the backend

You can set up the backend by using the provided [setup\_run\_backend](https://github.com/danielgrijalva/overworld/blob/master/setup_run_backend.sh) script like so:

```bash
./setup_run_backend.sh
```

It will try to install missing dependencies \(Python and Postgres\) through [Homebrew](https://brew.sh/), if it's available on your system. It will then install requirements through pip, migrate, and then finally start the server.

If you're not using Homebrew or want to do things manually, here are the steps required:

```bash
cd backend/
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Set up the frontend

* Create the `.env` file:

```bash
cd frontend/
cp .env.default .env
```

* Install the dependencies:

```bash
npm ci
```

**Note: Due to a bug in Semantic UI on Windows 10 node version 10.10.0 or lower is required to install it.**

This will build the project dependencies based off of the `package-lock.json`.

[`Semantic UI`](https://react.semantic-ui.com/) has an interactive installer and may prompt you for input in the console. Choose the default options if prompted:

1. Set-up Semantic UI: `Automatic (Use default locations and all components)`
2. Is this your project folder?: Confirm it is the project folder and choose `Yes`
3. Where should we put Semantic UI inside your project?: `semantic/`

After the build completes:

```bash
npm start
```

As you can see, both the frontend and backend are two separate entities. To access the backend API go to `localhost:8000`, but most of the time you'll be using the main app \(the frontend\) by going to `localhost:3000`.

