# Foodys Driver App

The frontend for the Driver side of the Foodys application. Design intended for iPhone 13/14 Pro Max.

## Installation

Requires Node and XCode and a Google Maps API Key. The app will not function correctly without the key.

Navigate to folder containing the repository.

```bash
npm install
```

Then, navigate to screens/OrderScreen.js. Go to line 122 and replace 'API_KEY' with a Google Maps API Key.

```javascript
apikey={'API_KEY'}
```

After the packages have been downloaded, run

```bash
expo start
```

If you have not used an iPhone simulator before it will ask that you install XCode. After following the steps it provides, the app will launch when running the command again.

Once the command starts the app. Enter
```bash
shift+i
```
and select either the iPhone 13 or 14 Pro Max model. The app will work on all iPhones, but some parts may be cut off.