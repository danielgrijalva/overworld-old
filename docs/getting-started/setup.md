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
Overworld needs Python 3.7+ to run.
{% endhint %}

### Installation

After forking the repository, do the following:

* Obtain your API keys from [IGDB](https://api.igdb.com) and paste it inside your `.env` file. But first, copy the `.env.default` file to your actual `.env`:

```text
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

As you can see, both the frontend and backend are two separate entities. To access the backend API go to `localhost:8000`, but most of the time you'll be using the main app \(the frontend\) by going to `localhost:3000`.

