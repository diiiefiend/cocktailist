# Schema Information

## cocktails
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
bar_id      | integer   | not null, foreign key (references bars)
name        | string    | not null
liquor      | string    | not null
ingredients | string    | not null

## feeds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
cocktail_id | string    | not null, foreign key (references cocktails)
activity    | string    | not null (rated, added, listed)
data        | string    | not null (rated: first 10 words of review, added: ingredients & bar, listed: list)

## bars
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
address     | string    | not null

## ratings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
cocktail_id | integer   | not null, foreign key (references cocktails)
rating      | integer   | not null
body        | string    | 
date        | date      | (from timestamps)

## lists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
user_id     | integer   | not null, foreign key (references users)

## listitems
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
cocktail_id | integer   | not null, foreign key (references cocktails)
list_id     | integer   | not null, foreign key (references lists)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
cocktail_id | integer   | not null, foreign key (references cocktails)
tag_id      | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

