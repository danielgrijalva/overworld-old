# letterboxd-for-games
A [letterboxd](https://letterboxd.com) for video games.
  
![landing](https://user-images.githubusercontent.com/11547406/57320244-47f1da00-70b3-11e9-9c08-821548c351ca.png)
  
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

So far you can search for any game and view its details in a _letterboxd-styled_ page.  
  
![demo](https://user-images.githubusercontent.com/11547406/57188656-d0a82480-6ebf-11e9-990f-bf69a7df0d90.gif)
  
## Acknowledgements
Data from the [Giant Bomb API](https://www.giantbomb.com/api/).
