# Actions

{% api-method method="get" host="http://localhost:8000" path="/api/actions/" %}
{% api-method-summary %}
Get Actions
{% endapi-method-summary %}

{% api-method-description %}
Endpoint for obtaining a user's relationship with a game.  
  
Actions are events that link a user and a game. Users can indicate that they have played or liked a game and add a game to their backlog or wishlist. This relationship is represented with `many-to-many` fields.  
  
If the requested game does not exist in Overworld's database, that means that no one has interacted with it, and so we return nothing.  
  
The user must be authenticated for obvious reasons.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Authentication token of the user.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="igdb" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=true %}
Name of the game.
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Actions successfully retrieved.
{% endapi-method-response-example-description %}

```javascript
{
    "played": true,
    "liked": true,
    "backlog": false,
    "wishlist": false
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/actions/log/" %}
{% api-method-summary %}
Log
{% endapi-method-summary %}

{% api-method-description %}
Endpoint for indicating that you've played a game.  
  
This adds/removes a game from the user's `played` field, which is a `many-to-many` relationship. If the game isn't in the database, it is created with the `get_or_create` method.  
  
Users must be authenticated to interact with this endpoint.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Authentication token of the user.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="igdb" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=true %}
Name of the game.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Game logged successfully.
{% endapi-method-response-example-description %}

```javascript
{
    "game": 27,
    "user": 1,
    "action": "like",
    "value": false
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/actions/like/" %}
{% api-method-summary %}
Like
{% endapi-method-summary %}

{% api-method-description %}
Endpoint for indicating that you've liked a game.  
  
This adds/removes a game from the users `liked` field, which is a `many-to-many` relationship. If the game isn't in the database, we create it with the `get_or_create` method.  
  
Users must be authenticated to interact with this endpoint.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Authentication token of the user.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="igdb" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=true %}
Name of the game.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Game liked successfully.
{% endapi-method-response-example-description %}

```javascript
{
    "game": 27,
    "user": 1,
    "action": "like",
    "value": false
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/actions/backlog/" %}
{% api-method-summary %}
Backlog
{% endapi-method-summary %}

{% api-method-description %}
Endpoint for adding a game to your backlog.  
  
This adds/removes a game from the users `backlog` field, which is a `many-to-many` relationship. If the game isn't in the database, we create it with the `get_or_create` method.  
  
Users must be authenticated to interact with this endpoint.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Authentication token of the user.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="igdb" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=true %}
Name of the game
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Added to backlog successfully.
{% endapi-method-response-example-description %}

```javascript
 {
    "game": 27,
    "user": 1,
    "action": "backlog",
    "value": true
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/actions/wishlist/" %}
{% api-method-summary %}
Wishlist
{% endapi-method-summary %}

{% api-method-description %}
Endpoint for adding a game to your wishlist.  
  
This adds/removes a game from the users `wishlist` field, which is a many-to-many relationship. If the game isn't in the database, we create it with the `get_or_create` method.  
  
Users must be authenticated to interact with this endpoint.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Authentication token of the user.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="igdb" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=true %}
Name of the game.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Added to wishlist successfully.
{% endapi-method-response-example-description %}

```javascript
{
    "game": 27,
    "user": 1,
    "action": "wishlist",
    "value": false
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/actions/ratings/" %}
{% api-method-summary %}
Rate
{% endapi-method-summary %}

{% api-method-description %}
Rate a game.  
  
Creates a `Rating` object, which consists of a user, a game and a rating value. If the game or rating don't exist in the database, create them using the `get_or_create` method.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Authentication token of the user.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="game" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}

{% api-method-parameter name="rating" type="integer" required=true %}
Rating value from 1 to 10.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Game rated successfully.
{% endapi-method-response-example-description %}

```javascript
{
    "game": 27,
    "user": 1,
    "rating": 7
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://localhost:8000" path="/api/actions/ratings/" %}
{% api-method-summary %}
Get Rating
{% endapi-method-summary %}

{% api-method-description %}
Get rating for a specific game by the logged-in user.  
  
If the game or rating don't exist in the database, no rating exists, so it returns nothing.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Authentication token of the user. 
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="game" type="integer" required=true %}
ID of the game from IGDB.
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Successfully retrieved rating.
{% endapi-method-response-example-description %}

```javascript
{
    "game": 27,
    "user": 1,
    "rating": 9
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

