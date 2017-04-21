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


## REST API

#### Posts

* GET /api/v1/posts - get all posts (guest / user)
* GET /api/v1/posts?page=2&limit=20 - get posts with pagination (guest / user)





## Design

Coming soon...

## Start server

* Go to the app/server folder
* Run npm install
* Run npm start

#Start client

*Go to app/client folder
*Run npm install
*For serve run npm start
*For static-serve run npm static-serve
