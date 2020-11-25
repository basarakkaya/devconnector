# devconnector

Udemy "MERN Stack Front to End" Course Project. Uses MongoDB as database, makes communication between client and DB using `express` & `mongoose`. Client-side is developed with ReactJS.

## Environment variables to be provided

App won't start if these are not provided. While working on your local machine, create `.env` file in the project root folder and provide the environment variables there.

- `MONGO_URI`: MongoDB URI for connection
- `JWT_SECRET`: A secret to sign & decode JWTs
- `GITHUB_CLIENT_ID`: Your client ID to access GitHub API
- `GITHUB_SECRET`: Your secret to access GitHub API

_To create GitHub API Credentials, visit [GitHub Developer Settings > OAuth Apps](https://github.com/settings/developers) and create a new app there._

## Feature Set

- Register & Login using JWT
- Create a user profile; including education, work experience and github repository information and gravatar
- See other users' profiles
- Create posts, see others'
- Comment & like posts

## Future Work

- [x] Make DB credentials to be taken from environment variables _(completed - Nov 25, 2020)_
- [ ] Use a UI Component Library to facelift the app
- [ ] Add `ReCaptcha` to login & register
- [ ] Send welcome mail
- [ ] Verify user with mail
- [ ] Forgot password - Reset password functionality
- [ ] Write tests
- [ ] Add server logs
