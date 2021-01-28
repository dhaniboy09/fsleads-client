## Getting Started

### Running the app

- Ensure the [fsleads](https://github.com/dhaniboy09/fsleads) service is up and running
-  `cd` into the project directory, 
- Copy the env vars below and run `pbpaste > .env`. Alternatively, run `touch .env` and manually paste the env vars below in the newly created `.env` file
    ```bash
    LEADS_API_KEY=M6ol0RI47FDANo8wAnBxYw6ZVBbi61whq6wYOKpi
    ```
- Next, run `nvm use`
- Run `npm install`
- Start the container with `docker-compose up`. 
    - If you get this error: `Cannot find module 'sharp'`, please re-build the container with `docker-compose up --build --no-cache`. 
    The download for that package sometimes times out.
- The app should now be accessible on `http://localhost:3000`
 
