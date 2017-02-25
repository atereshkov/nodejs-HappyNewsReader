# HappyNewsReader

Simple nodejs application with HTML / Javascript / CSS client.
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
* Search for posts by some criteria (date, etc.)
* Administrator can manage posts: create, delete, edit.
* Pagination

## Use case diagram

## Terms dictionary

* Post
* User
* Admin
* Guest

## REST API

Posts

* GET /api/v1/posts - get all posts
* GET /api/v1/posts?page=2&limit=20 - get posts with pagination
* GET /api/v1/posts/225 - get post by id
* POST /api/v1/posts - add new post
* PUT /api/v1/posts/225 - edit post by id
* DELETE /api/v1/posts/225 - delete post by id


## Design

Soon...

## Start

* Go to app folder
* Run npm install
* Run npm start
