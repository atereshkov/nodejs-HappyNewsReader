# HappyNewsReader

The service provides access to news with "positive/happy” orientation. This means that only happy posts will be parsed from s13.ru. Parsing is based on emotional coloring of post header. 

## Navigation

* [Functionality](#functionality)
* [Additional functionality](#additional-functionality)
* [Use case diagram](#use-case-diagram)
* [Terms dictionary](#terms-dictionary)
* [REST-API](#rest-api)
* [Design](#design)
* [Start](#start)

## Functionality

* Parsing posts from s13.ru
* Analysis of emotional coloring (tone analysis).
* Storing posts in the local database.
* View posts (offline browsing).

## Additional functionality

* Users registration and authorization
* Ability to add posts to user’s favorites
* Search for posts by some criteria (post header)
* Get posts by weeks (for example, from 03/19/2017 to 03/26/2017)
* Pagination

## Use case diagram

Coming soon...

## Terms dictionary

* Posts
* Favorites
* User
* Guest

## REST API

#### Auth

* POST /api/v1/auth/login - login with username and password
* POST /api/v1/auth/register - register user

#### Posts

* GET /api/v1/posts - get all posts (guest / user)
* GET /api/v1/posts?page=2&limit=20 - get posts with pagination (guest / user)
* GET /api/v1/posts?header=Some search criteria - search posts with specific headers (guest / user)
* GET /api/v1/posts?from=03/19/2017&to=03/26/2017 - (guest / user) (or unix timestamp would be better? from=1331162374&to=1331162999)
* GET /api/v1/posts/225 - get post by id (guest / user)

#### Favorites

* GET /api/v1/users/10/favorites - get user's favorite posts (user)
* POST /api/v1/users/10/favorites - add post to favorites (user)

#### Users

* GET /api/v1/users/10 - get user by id (user)

## Design

Coming soon...

## Start server

* Go to the app folder
* Run npm install
* Run npm start
