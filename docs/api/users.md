---
description: Endpoints related to auth/users of Overworld.
---

# Users

{% api-method method="get" host="http://localhost:8000" path="/api/users/user/" %}
{% api-method-summary %}
User
{% endapi-method-summary %}

{% api-method-description %}
**Retrieves basic data of the logged-in user.**  
  
This is used to validate requests from the frontend.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
JWT token of the user
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "id": 1,
    "username": "madeline",
    "email": "example@mail.com"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://localhost:8000" path="/api/users/:username" %}
{% api-method-summary %}
Profile
{% endapi-method-summary %}

{% api-method-description %}
**Endpoint for obtaining a user's profile.**  
  
The profile consists of the user's activity, favorite games, bio, reviews, contact information, stats, lists, followers and other stuff.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The desired user.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Successfully retrieved the user's profile data.
{% endapi-method-response-example-description %}

```javascript
{
    "id": 1,
    "username": "madeline",
    "email": "example@mail.com",
    "bio": "I like games",
    "location": "A Mountain",
    "twitter": null,
    "played": [
        {
            "id": 12,
            "igdb": "18099",
            "name": "Pokémon Moon"
        },
        {
            "id": 3,
            "igdb": "3030-68907",
            "name": "Sekiro: Shadows Die Twice"
        }
    ],
    "liked": [
        {
            "id": 10,
            "igdb": "26226",
            "name": "Celeste"
        }
    ],
    "backlog": [
        {
            "id": 11,
            "igdb": "19560",
            "name": "God of War"
        }
    ],
    "wishlist": [
        {
            "id": 9,
            "igdb": "1877",
            "name": "Cyberpunk 2077"
        }
    ],
    "following": [
        2
    ],
    "followers": []
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
User not found.
{% endapi-method-response-example-description %}

```javascript
{
    "detail": "Not found."
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/profile/:username" %}
{% api-method-summary %}
Update Profile
{% endapi-method-summary %}

{% api-method-description %}
**Update your profile information.**  
  
Users can update their bio, username, location, twitter username, email, and soon their favorite games...
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
Your username. It won't work with other user.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="username" type="string" required=false %}
Your username
{% endapi-method-parameter %}

{% api-method-parameter name="email" type="string" required=false %}
Your email
{% endapi-method-parameter %}

{% api-method-parameter name="location" type="string" required=false %}
Your location \(not validated\)
{% endapi-method-parameter %}

{% api-method-parameter name="twitter" type="string" required=false %}
Your Twitter username \(not validated\)
{% endapi-method-parameter %}

{% api-method-parameter name="bio" type="string" required=false %}
Your bio
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```text

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/register/" %}
{% api-method-summary %}
Register
{% endapi-method-summary %}

{% api-method-description %}
**Endpoint for signing up to Overworld.**  
  
All authentication related functionality in Overworld is handled by `django-rest-knox`.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="email" type="string" required=true %}
Email necessary for registering.
{% endapi-method-parameter %}

{% api-method-parameter name="username" type="string" required=true %}
The Overworld username.
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
Password, 8 characters minimum.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
User registered successfully.
{% endapi-method-response-example-description %}

```javascript
{
    "user": {
        "id": 1,
        "username": "madeline",
        "email": "email@example.com"
    },
    "token": "fda1fa3519fcf097aa0643c2594dfb46ea6e66f730c661"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
Username already exists.
{% endapi-method-response-example-description %}

```javascript
{
    "username": [
        "A user with that username already exists."
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/login/" %}
{% api-method-summary %}
Login
{% endapi-method-summary %}

{% api-method-description %}
**Endpoint for login into Overworld.**  
  
All authentication related functionality in Overworld is handled by `django-rest-knox`.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The Overworld username.
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
The user's password.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Logged in successfully.
{% endapi-method-response-example-description %}

```javascript
{
    "user": {
        "id": 1,
        "username": "madeline",
        "email": "email@example.com"
    },
    "token": "fda1fa3519fcf097aa0643c2594dfb46ea6e66f730c661"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
Incorrect username/password.
{% endapi-method-response-example-description %}

```javascript
{
    "non_field_errors": [
        "Incorrect username/password."
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/logout/" %}
{% api-method-summary %}
Logout
{% endapi-method-summary %}

{% api-method-description %}
**Logout a user.**  
  
This means destroying their token from the database.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
JWT token of the user.
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}
Successfully logged out.
{% endapi-method-response-example-description %}

```text
[]
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
No token or invalid token provided.
{% endapi-method-response-example-description %}

```javascript
{
    "detail": "Invalid token."
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/follow/" %}
{% api-method-summary %}
Follow
{% endapi-method-summary %}

{% api-method-description %}
**Endpoint for following a user.**  
  
This adds a user to the current user's `following` field, and adds the current user to that user's `followers` field. These fields are a `many-to-many` relationship.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
A JWT token. You must be authenticated.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The user you want to follow.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
[]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/unfollow/" %}
{% api-method-summary %}
Unfollow
{% endapi-method-summary %}

{% api-method-description %}
**Endpoint to unfollow a user.**  
  
This removes a user from the current user's `following` field, and removes the current user from that user's `followers` field. These fields are a `many-to-many` relationship.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="Authorization" type="string" required=true %}
A JWT token. You must be authenticated.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="username" type="string" required=true %}
The user you want to unfollow.
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
[]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

