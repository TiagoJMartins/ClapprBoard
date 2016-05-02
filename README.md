# ClapprBoard

TV Show tracking application.

## TODO

- Set up global error alerts
- Create footer.
- Minify CSS and JS. Concat all JS into a single file. Create .maps (Maybe add to watch task?)
- create ng filter for truncating show.overview nicely
- validate signup form (confirm passwords) handle errors from server (wrong email, wrong password, etc)
- when user is forbidden and asked to login, create redirection to continue flow
- create calendar for next episodes on subscribed shows
- update show information as necessary automatically
- implement caching of data (and time until it goes bad and requires update (redis?))
- implement notifications
- email validation (maybe?)
- watchlist checkboxes need to update automatically, without the need for the submit button
- don't show checkbox if episode hasn't aired yet
- style episode with no info
- "my shows" page needs to be made a lot better, with useful information but not messy
- search bar on home page should be detached from the panel
- add more info to every page, make it all a bit more busy, it helps make the user feel like they have a lot more available to them

## SUGAR

- optimize red routes
- **ERRORS** **ERRORS** SHOW ERRORS TO USER!
- main page should have a second panel for subscribed shows' latest episodes or upcoming or trending or top shows
- quick actions on show thumbnails?

## LOGIN

- oauth login (facebook, g+, twitter)
- big background picture on login/signup page
- password confirmation needs to start working!