# Project Torchbearer's Server/Client

This README purpose is to help developers their local developement environment up and running with this app's server/client.

Prerequisites
--



Initialize & Run Commands
--

``` bash
# navigate to server folder
cd path/to/server

# install dependencies
npm install

# serve with node at localhost:3000
npm start

# serve with nodemon at localhost:3000
npm run dev

```

Add environment variable 
--

- Duplicate `.env.template` and rename it to `.env`
  - Replace values to the right of the equals
  - For TOKEN_SECRET, I recommend mashing your keyboard for a couple of seconds. Alternatively, you can let your cat play on your keybaord for a bit.
  - Use `3000` for PORT

Testing 
--

1. Start up the server (see run commands above)
2. Start up live-server extension 
3. Try Signing up and then logging in. Check console in browser for logs. 
    - Shortcut: `Ctrl + Shift + J` or `Ctrl Option J` on Mac.

