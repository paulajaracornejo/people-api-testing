# API REST Testing on cypress.io

This project purpose is to do an exercise for testing API REST on cypress.io

## Installation
Requires and be sure to have this:
- Node.js 8 and above
- npm
- git

Install the dependencies
```
$ npm install cypress
```

Open in a new terminal and execute this commands for clone this repository:
```
$ git clone https://github.com/paulajaracornejo/people-api-testing.git
````
Then, open your project in the directory:
```
$ cd people-api-testing
```
If the endpoint has expired, you can get another in CRUDCRUD.com and replace value in a variable baseUrl in cypress.json
```
"baseUrl": "https://crudcrud.com/api/a21d4a3bafb0473887f88390b6af074b"
````


### Development/Testing
Run test with cypress.io IDE:
````
$ npx cypress open
````
### Run
Run tests:
```
$ npx cypress run
```