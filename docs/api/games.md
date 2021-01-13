---
description: Endpoints related to game data.
---

# Games

{% api-method method="get" host="http://localhost:8000" path="/api/games/:guid" %}
{% api-method-summary %}
Game
{% endapi-method-summary %}

{% api-method-description %}
**Get a game from IGDB.**  
  
Makes a call to the `https://api.igdb.com/v4/games` endpoint, specifying the fields \(defined as `game_fields` in the `fields.py` file\) and game ID in the `POST` data.  
  
For more details read https://api-docs.igdb.com/?javascript\#game
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="guid" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Game successfully retrieved.
{% endapi-method-response-example-description %}

```javascript
[
    {
        "id": 26226,
        "cover": {
            "id": 61293,
            "image_id": "hybw5ksgnrhdm23wshqi"
        },
        "first_release_date": 1516838400,
        "genres": [
            {
                "id": 8,
                "name": "Platform"
            },
            {
                "id": 31,
                "name": "Adventure"
            },
            {
                "id": 32,
                "name": "Indie"
            }
        ],
        "involved_companies": [
            {
                "id": 62411,
                "company": {
                    "id": 5542,
                    "name": "Matt Makes Games"
                },
                "developer": true,
                "publisher": true
            }
        ],
        "name": "Celeste",
        "platforms": [
            {
                "id": 6,
                "name": "PC (Microsoft Windows)"
            }
            {
                "id": 48,
                "name": "PlayStation 4"
            },
            {
                "id": 49,
                "name": "Xbox One"
            },
            {
                "id": 130,
                "name": "Nintendo Switch"
            }
        ],
        "screenshots": [
            {
                "id": 51197,
                "image_id": "fwjvpiu2ircdq5afkm1o"
            },
            {
                "id": 51198,
                "image_id": "e9lk3alqutkrciksfque"
            },
            {
                "id": 51199,
                "image_id": "wjw3vnaclj29fqtziwsr"
            },
        ],
        "slug": "celeste",
        "summary": "A single-player platformer about climbing a mountain. Battle your inner demons and climb through more than 250 devious stages to reach the summit. It won't be easy.",
        "themes": [
            {
                "id": 1,
                "name": "Action"
            },
            {
                "id": 17,
                "name": "Fantasy"
            }
        ],
        "time_to_beat": 36000
    }
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://localhost:8000" path="/api/games/search/:name" %}
{% api-method-summary %}
Search
{% endapi-method-summary %}

{% api-method-description %}
**Search for a game.**Calls `https://api.igdb.com/v4/games`.   
  
The search term must be a string: the name of the game you want to search. The fields shown in the results are defined as `search_fields` in the `fields.py` file.  
  
For more details on how to search the IGDB API, read https://api-docs.igdb.com/?javascript\#search-176
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="name" type="string" required=true %}
Search term
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
[
    {
        "id": 431,
        "first_release_date": 1195171200,
        "name": "Uncharted: Drake's Fortune",
        "slug": "uncharted-drake-s-fortune"
    },
    {
        "id": 565,
        "first_release_date": 1246320000,
        "name": "Uncharted 2: Among Thieves",
        "slug": "uncharted-2-among-thieves"
    },    
    {
        "id": 512,
        "first_release_date": 1319760000,
        "name": "Uncharted 3: Drake's Deception",
        "slug": "uncharted-3-drake-s-deception"
    },
    {
        "id": 7331,
        "first_release_date": 1462838400,
        "name": "Uncharted 4: A Thief's End",
        "slug": "uncharted-4-a-thief-s-end"
    }
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://localhost:8000" path="/api/games/popular/" %}
{% api-method-summary %}
Popular
{% endapi-method-summary %}

{% api-method-description %}
**Gets popular or trending games.**  
  
Calls the `games` endpoint, sorting the results by popularity \(desc\). This endpoint is called in Overworld's landing page.   
  
An example of this is documented on IGDB https://api-docs.igdb.com/?javascript\#examples-12.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Successfully retrieved popular games.
{% endapi-method-response-example-description %}

```javascript
[    
    {
        "id": 1877,
        "cover": {
            "id": 75012,
            "image_id": "co1lvo"
        },
        "name": "Cyberpunk 2077",
        "popularity": 1176.8147604493802
    },
    {
        "id": 119207,
        "cover": {
            "id": 74840,
            "image_id": "co1lqw"
        },
        "name": "Aquapark.io",
        "popularity": 1000.6323410532205
    },
    {
        "id": 38967,
        "cover": {
            "id": 75151,
            "image_id": "co1lzj"
        },
        "name": "Cooking Simulator",
        "popularity": 912.8163501869213
    },
    {
        "id": 114455,
        "cover": {
            "id": 71287,
            "image_id": "co1j07"
        },
        "name": "Pacify",
        "popularity": 541.7807019230505
    }
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://localhost:8000" path="/api/games/backdrop/:guid" %}
{% api-method-summary %}
Backdrop
{% endapi-method-summary %}

{% api-method-description %}
**Gets the background image for the landing page.**  
  
Makes a call to `https://api.igdb.com/v4/games`, with image-related fields only. The game the backdrop is selected from is randomly selected in the frontend.  
  
Documentation for building images from the `image_id` is here: https://api-docs.igdb.com/\#images
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="guid" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Successfully retrieved a game's backdrop.
{% endapi-method-response-example-description %}

```javascript
[
    {
        "id": 11156,
        "name": "Horizon Zero Dawn",
        "screenshots": [
            {
                "id": 10700,
                "image_id": "fmvburhlunnhs3mdqysc"
            },
            {
                "id": 10701,
                "image_id": "o7ehlmbjcvkeeltwreeg"
            },
            {
                "id": 10702,
                "image_id": "gdc15kvjedin5c4v6cce"
            },
            {
                "id": 10703,
                "image_id": "gko0jchtb85kbsc1dg9l"
            },
            {
                "id": 10704,
                "image_id": "llwixfa0dy8fpex3tcwr"
            }
        ],
        "slug": "horizon-zero-dawn"
    }
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

