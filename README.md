# Interview for Brackets

Github: TODO
Live demo: TODO
Run locally: `npm run dev`

## Requirements

- Use APIs to load all characters and show them in listing with pagination
  - API for people https://swapi.py4e.com/
  - API for avatars https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${personId}.jpg
- Implement search and some filtering
- Use a11y to make UI fully functional with keyboard
- Make it fancy
- Preferred tech stack
  - Nextjs with SSR
  - Tailwind (up to interviewee)
  - Shadcn (up to interviewee)

## Solution

### Proposed plan (Before I get to coding)

- use nextjs for FE
- use MUI for UI
  - mostly "battery included"
  - I expect only slight UI changes, so I will not start with tailwind
  - I would prefer to go with AntD as that is the most recent stack I used, but It is not fully compatible with nextjs 15 yet
- I can spend on this up to 4 hours
- I will not create separate branches for features and merge them to main (not best practice, but this is a interview demo app, so I will cut corners on some things :D ... I will try to write them down in the readme so its clear)

### Dev notes

- I would like to end up with "home" page where you have a list of people and the filtering, and when you click on a person, you will got to `/person/${personId}` where you see the details
  - **Home screen**
    - top part is search and filtering
    - filtering info in URL
    - rest is list with pagination
      - data from paginated API endpoint
    - when you click on a person you are redirected to the person page
  - **Person page**
    - top has back button
    - rest is table with information about the person
- I will start with some page skeleton and ssr parts for data

### Submitted solution (After I am done with coding)
