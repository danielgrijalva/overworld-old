# Contributing to Overworld

The app is separated into two projects, *frontend* (`React`) and *backend* (`Django REST Framework`).

## Setup

* Obtain your API keys from [IGDB](https://api.igdb.com) and paste it inside your `.env` file. But first, copy the `.env.default` file:

```
cp .env.default .env
```

* Set up the backend:

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
