# Note
Accept is optional
Require is mandatory

If any error happen, the gateway will return 500

# Posts Routes

## GET http://localhost:5005/posts
Get all posts or search for post using keywords

Accept:
- header:
  - x-access-token: user jwt token
- query:
  - page: current page 
  - limit: the amount of post within a page
  - q: word to search for

Return:
- Array of posts in the form of:

        {
            title: String,
            content: String,
            tag: String,
            fame_count: Number (Fame count - lame count),
            creator: String (Username of creator),
            famed: Boolean (Has current user famed),
            lamed: Boolean (Has current user lamed),
            _id: String (Post ID)
        }

## GET http://localhost:5005/posts/user/:username
Get all posts created by user with ":username"

Require:
- params:
  - username: name of the user to search for

Accept:
- header:
  - x-access-token: user jwt token
- query:
  - page: current page 
  - limit: the amount of post within a page

Return:
- Array of posts in the form of:

        {
            title: String,
            content: String,
            tag: String,
            fame_count: Number (Fame count - lame count),
            creator: String (Username of creator),
            famed: Boolean (Has current user famed),
            lamed: Boolean (Has current user lamed),
            _id: String (Post ID)
        }


## GET http://localhost:5005/posts/:id
Get post with _id = ":id"

Require:
- params:
  - id: id of a post

Accept:
- header:
  - x-access-token: user jwt token

Return:
- post in the form of:

        {
            title: String,
            content: String,
            tag: String,
            fame_count: Number (Fame count - lame count),
            creator: String (Username of creator),
            famed: Boolean (Has current user famed),
            lamed: Boolean (Has current user lamed),
            _id: String (Post ID)
        }

## POST http://localhost:5005/posts/
Create a post

Require:
- body:
  - title: title of the post
  - content: content of the post
- header:
  - x-access-token: user jwt token

Accept:
- body:
  - tag: tag of the post

Return:
- Result of the operation

## DELETE http://localhost:5005/posts/:id
Delete post with _id = ":id"

Require:
- params:
  - id: id of a post
- header:
  - x-access-token: user jwt token

Return:
- Result of the operation
  - 204 for success
  - 500 for failure

## PATCH http://localhost:5005/posts/:id/vote
Change the vote on post with _id = ":id"

Require:
- params:
  - id: id of a post
- header:
  - x-access-token: user jwt token
- body:
  - voteType: type of vote, can be ["fame", "lame", ""]

Return:
- Result of the operation
  - 200 for success
  - 500 for failure

## PATCH http://localhost:5005/posts/:id
Update post with _id = ":id"

Require:
- params:
  - id: id of a post
- header:
  - x-access-token: user jwt token
- body:
  - update: 
    - title: updated title (Optional)
    - content: updated content (Optional)
    - tag: updated tag (Optional)


Return:
- Result of the operation
  - 200 for success
  - 500 for failure


# User routes

## POST http://localhost:5005/login
Log user in

Require:
- body:
  - username
  - password

Return:
On success

        {
            message: "Success",
            token: "Bearer " + jwt_token,
            userID,
            username,
        }

On Failure

        {
            message: "err" or "Invalid Username or Password"
        }
## GET http://localhost:5005/isUserAuth
Check user auth status

Require:
- header:
  - x-access-token: user jwt token

Return:
On success

        {
            isLoggedIn: true,
            username,
        }

On Failure

        {
            message: "Incorrect Token Given",
            isLoggedIn: false
        }

## POST http://localhost:5005/register
Register a user

Require:
- body:
  - username
  - password
  - email

Return:
On success

        {
            message: "Success",
        }

On Failure

        {
            message: "Username or email has already been taken",
        }

# Comment Route
## GET http://localhost:5005/posts/:p_id/comments/
Get all comments of a post

Accept:
- header:
  - x-access-token: user jwt token
- query:
  - page: current page 
  - limit: the amount of post within a page
- params:
  - p_id: ID of the post

Return:
- Array of comments in the form of:

        {
            content: String,
            fame_count: Number (Fame count - lame count),
            creator: String (Username of creator),
            famed: Boolean (Has current user famed),
            lamed: Boolean (Has current user lamed),
        }

## GET http://localhost:5005/posts/:p_id/comments/c_id
Get comment with _id = ":c_id"

Require:
- params:
  - p_id: id of a post
  - c_id: id of a comment

Accept:
- header:
  - x-access-token: user jwt token

Return:
- comment in the form of:

        {
            content: String,
            fame_count: Number (Fame count - lame count),
            creator: String (Username of creator),
            famed: Boolean (Has current user famed),
            lamed: Boolean (Has current user lamed),
        }

## POST http://localhost:5005/posts/:p_id/comments
Create a comment

Require:
- body:
  - content: content of the post
- header:
  - x-access-token: user jwt token
- params:
  - p_id: id of the post

Return:
- Result of the operation

## DELETE http://localhost:5005/posts/:id
Delete comment with _id = ":id"

Require:
- params:
  - p_id: id of a post
  - c_id: id of the comment
- header:
  - x-access-token: user jwt token

Return:
- Result of the operation
  - 204 for success
  - 500 for failure

## PATCH http://localhost:5005/posts/:p_id/comments/:c_id/vote
Change the vote on post with _id = ":c_id"

Require:
- params:
  - p_id: id of a post
  - c_id: id of the comment
- header:
  - x-access-token: user jwt token
- body:
  - voteType: type of vote, can be ["fame", "lame", ""]

Return:
- Result of the operation
  - 200 for success
  - 500 for failure

## PATCH http://localhost:5005/posts/:p_id/comments/:c_id
Update comment with _id = ":c_id"

Require:
- params:
  - p_id: id of a post
  - c_id: id of the comment
- header:
  - x-access-token: user jwt token
- body:
  - content: updated content


Return:
- Result of the operation
  - 200 for success
  - 500 for failure
