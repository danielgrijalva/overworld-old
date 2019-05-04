# letterboxd-for-games
A [letterboxd](https://letterboxd.com) for video games.

## Development
The app is built upon React powered by a Django Rest Framework API.

### Setup

* Obtain your key from [Giant Bomb](https://www.giantbomb.com/api/) and paste it in the `.env` file:

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

So far you can search for any game and view its details in a _letterboxd-styled_ page.  
  
![demo](https://user-images.githubusercontent.com/11547406/56997872-7711c400-6b66-11e9-90ce-f14caae4565c.gif)

## Acknowledgements
Data from the [Giant Bomb API](https://www.giantbomb.com/api/).
