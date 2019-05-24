# overworld

![logo](/media/logo.png)

> *A [letterboxd](https://letterboxd.com) for video games.*

## Development
The app is built upon React powered by a Django Rest Framework API.

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
* View several details of the game

> [Demo](/medio/demo.gif) 

![landing](/media/landing.png)
  
## Acknowledgements
Data from the [Giant Bomb API](https://www.giantbomb.com/api/).  
Icon made by [Freepik](https://www.freepik.com/).