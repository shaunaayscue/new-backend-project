### Express Routes Project
A project using NODE and Express JS.

### Installation

- Get the project
  - download zip
  - clone
```
git clone https://github.com/shaunaayscue/new-backend-project
```

-Create OAuth 2.0 Client credentials at console.cloud.google.com.
Authorized JavaScript origins (where your app will running at): http://localhost:3000
-Authorized redirect URIs (the subroutine to take users through authentication): http://localhost:3000/auth/google/callback
- In the .env file, add the ClientID and Client Secret from your Google App credentials.

- Open a Terminal.
- Install required packages.
```
npm install
```
- Start the server
```
nodemon server.js
```
In your browser, go to:
```
http://localhost:3000
```



