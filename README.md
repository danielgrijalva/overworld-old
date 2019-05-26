# Overworld

![logo](/media/logo.png)

> ### *A [letterboxd](https://letterboxd.com) for video games.*

* [Development](#development)
  + [Setup](#setup)
* [Features](#features)
* [Acknowledgements](#acknowledgements)
  
## Development

The app is separated into two projects, *frontend* (`React`) and *backend* (`Django REST Framework`).

### Setup

* Obtain your API keys from [Giant Bomb](https://www.giantbomb.com/api/) and [IGDB](https://api.igdb.com) and paste them inside the `.env` file:

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

## Features

So far you can do the following:
* Create an account
* Log in/out
* Search for games
* View a game's details (summary, platforms, crew, release date and more)
* Rate a game on a scale of 1 to 10
* Add a game to your played games
* Add a game to your backlog and/or wish list
* Like a game

> #### [Demo](https://raw.githubusercontent.com/danielgrijalva/overworld/master/media/demo.gif) 

![landing](/media/landing.png)
  
## Acknowledgements

Data from [Giant Bomb API](https://www.giantbomb.com/api/) and [IGDB](https://api.igdb.com).  
Icon made by [Freepik](https://www.freepik.com/).
