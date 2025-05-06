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
- Navigate to APIs & Services > Credentials
- Create a project
- Click “+ CREATE CREDENTIALS” → choose OAuth client ID
- Select Application type: Web application and name it
- Authorized JavaScript origins (where your app will running at): 
```
http://localhost:3000
```
- Authorized redirect URIs (the subroutine to take users through authentication): 
```
http://localhost:3000/auth/google/callback
```
- In the .env file, add the ClientID and Client Secret from your Google App credentials.

- Open a Terminal.
- Install required packages.
```
npm install
```
- Start the server
```
node server.js
```
In your browser, go to:
```
http://localhost:3000/
```
- I inserted a default 'shopper' and 'admin' user into into the database, but you could create your own if want, using the 'Sign Up Now' button or at the account dropdown or login with a google account.
  - shopper
      - email: alice@example.com
      -  password: 123
  - admin
      - email: admin@example.com
      -  password: 123
### API: Finds bookstores near you.
- In the project that you created earlier at console.cloud.google.com, go to APIs & Services. 
- Click 'Enable APIs and services'
- You need to enable:
```
Maps JavaScript API
```
and
```
Places API
```
- This will make you verify your identity by putting in personal information.
- After you successfully did these steps, you need to get the API Key:
- Click “Create Credentials” → “API Key”
- Google will generate a key for you.
- Next you will need to edit the API key:
  - Under Application restrictions click 'None'
  - Under API restrictions click 'Restrict key' and choose 'Maps JavaScript API' and 'Places API'

- In the code provided, replace 'YOUR_API_KEY' in your Node.js code with your actual API key google provided, specifically in 
```
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" defer></script>
```
and 
```
const GOOGLE_API_KEY = 'YOUR_API_KEY';
```
- Restart the server again with node server.js and refresh the browser.
  - Then click the 'Find Bookstores' button and allow http://localhost:3000 to know your location. 
