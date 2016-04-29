# ClapprBoard

TV Show tracking application.

- Implement TTL on cookie.
- Create Subscribe factory to subscribe and unsubscribe from shows (create respective remote methods aswell)
- Set up global error alerts
- Create footer.
- Add wrapper for show info in show-detail.html
- Minify CSS and JS. Concat all JS into a single file. Create .maps (Maybe add to watch task?)
- Implement some sort of "back button". (is it really necessary?)
- create ng filter for truncating show.overview nicely
- create retries for when calls to the API fail (implement counter to limit retries)
- validate signup form (confirm passwords) handle errors from server (wrong email, wrong password, etc)
- when user is forbidden and asked to login, create redirection to continue flow
- when user tries to access entry points without being authenticated, redirect to login
- begin working on show subscriptions
- begin working on watched episodes
- display all dates correctly, aswell as time left with moment.js
- create calendar for next episodes on subscribed shows
- update show information as necessary automatically
- implement caching of data (and time until it goes bad and requires update)
- implement notifications
- email validation (maybe?)

https://github.com/strongloop/loopback-getting-started-intermediate/
