# ClapprBoard

TV Show tracking application.

## TODO
- fix invalid auth token after server restart [INFO](https://github.com/strongloop/loopback/issues/1669)
- Set up global error alerts
- Create footer.
- Minify CSS and JS. Concat all JS into a single file. Create .maps (Maybe add to watch task?)
- create ng filter for truncating show.overview nicely
- validate signup form (confirm passwords) handle errors from server (wrong email, wrong password, etc)
- when user is forbidden and asked to login, create redirection to continue flow
- display all dates correctly, aswell as time left with moment.js
- create calendar for next episodes on subscribed shows
- update show information as necessary automatically
- implement caching of data (and time until it goes bad and requires update)
- implement notifications
- email validation (maybe?)
- sugar.js for dates aswell
- watchlist checkboxes need to update automatically, without the need for the submit button
- don't show checkbox if episode hasn't aired yet
- style episode with no info
