# survey
wdi project 3


##priority user stories

* users can register and sign into the app
* signed in users can create custom surveys with an intuitive front-end interface.
* each new survey is created at a unique URL.
* logged in users can respond to surveys
* survey creators can view the survey results
* survey creators can decide to publically display survey results

## optional feature user stories

* survey creators have an interface for sending out invitiations to take the survey.
* * could be in the form of a url shortlink to be sent over email



##questions for the team

- do we want users to be able to answer questions without signing in? It might make for a  better user experience to be able to answer anonymously, but it's harder to track whether or not they've answered multiple times.


- if we don't want to enforce it, the app could be more versatile (ie a tool that we could embed in other platforms), but we'd need to have some solution, like requiring a valid email address.

- perhaps a public/private option for the survey creator, so they can enforce if users need to be invited or logged in to see a survey.



## Survey Views
1. Create
  - authorization: user who is creating the form
2. Respond
  - authorization: 1. user with URL
                   2. home page list of surveys
3. Results
 - authorization 1. creator of the form
                 2. users who responded
                 3. anyone with URL
