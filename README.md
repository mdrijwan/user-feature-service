# User-Feature-Service-Api
A sample app to manage user access to new features

**Project**

Implementing a Node API with TypeScript in Serverless framework to manage users' accesses to new features via feature switches.

## Getting Started

Clone the project repository by running the command below if you use SSH

```
git clone git@github.com:mdrijwan/user-feature-service.git
```

If you use https, use this instead

```
git clone https://github.com/mdrijwan/user-feature-service.git
```

Run the command below to install NPM dependencies

```
npm install
```

This project is built on stand alone TypeScript so no compilation needed. But you can compile the `TypeScript` files to `JavaScript` anyway

```
npm run compile
```

Then start the server and follow the instructions in the console.

```
npm run start
```

### Let's get started!

***Methods***
- To create/update user access
  + POST/features

- To see list of countries
  + GET/dev/countries

- To get user access (`pass the params in query`)
  + GET/features
  > Example: GET/localhost:3000/dev/feature?email=tester@test.com&featureName=Tester
  
##### Demo Screenshot!
![demo](https://github.com/mdrijwan/user-feature-service/blob/master/sampleRequest.png)
  

