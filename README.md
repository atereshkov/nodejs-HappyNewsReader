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
* Storing articles in the local database.
* View posts (offline browsing).

## Additional functionality

* Users registration and authorization
* Ability to add posts to user’s favorites
* Search for posts by some criteria (post header)
* Administrator can manage posts: create, delete, edit.
* Pagination

## Use case diagram

## Terms dictionary

* Posts
* Favorites
* User
* Admin
* Guest

## REST API

Auth

* POST /api/v1/auth/login - login with username and password
* POST /api/v1/auth/register - register user

Posts

* GET /api/v1/posts - get all posts (guest / user / admin)
* GET /api/v1/posts?page=2&limit=20 - get posts with pagination (guest / user / admin)
* GET /api/v1/posts?header=Some search criteria (guest / user /admin)
* GET /api/v1/posts/225 - get post by id (guest / user / admin)
* POST /api/v1/posts - add new post (admin)
* PUT /api/v1/posts/225 - edit post by id (admin)
* DELETE /api/v1/posts/225 - delete post by id (admin)

Favorites

* GET /api/v1/users/10/favorites - get user's favorite posts (user / admin)
* GET /api/v1/users/10/favorites/10 - get user favorite post by id (user / admin)
* POST /api/v1/users/10/favorites - add post to favorites (user / admin)
* DELETE /api/v1/users/10/favorites - delete all user's favorites (user / admin)

Users

* GET /api/v1/users - get all users (admin)
* GET /api/v1/users/10 - get user by id (admin / user)
* PUT /api/v1/users/10 - update user info by id (admin)
* DELETE /api/v1/users/10 - delete user by id (admin)

## Design

Soon...

## Start

* Go to the app folder
* Run npm install
* Run npm start
