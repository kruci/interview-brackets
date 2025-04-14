# Interview for Brackets

Github: https://github.com/kruci/interview-brackets

Live demo: https://interview-brackets.vercel.app/

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

### Submitted solution (After I am done with coding)

- the `/` route is the table
  - there is a search for at the top. **YOU HAVE TO PRESS THE SEARCH BUTTON (or enter) TO APPLY ANY FILTER CHANGE**
  - there a search field which uses the API search param
  - there is a min height slider to filter for height
    - the API does not support any filtering, so instead of when applying height filter, fetching enough pages to fill one table page with data, I just gray-out rows that do not pass the height filter :D
  - this page is mix of SSR and CSR
  - data about filtering and page are stored in URL
- the `/person/${id}` route is page for single person with more info than I show in table
  - First 40 IDs are SSG, reset are SSR on demand
  - there is also a "zoom" icon right top corner of the image, which opens the modal with full image
    - mostly added so there actually is some interactivity on the page

### Notes:

- for the `/person/${id}`, Better design would be to have the image one the left side of the card, and info on the right. I am not willing to change it for this demo app, but we can talk about it xD
- for the `/`, because the people dataset is so small better approach would be to use ISR with revalidation e.g. each hour, where it would get data all people on server, and then pass them to the page (there is 88 people, if API adds someone, we will have it within hour). This way we do not have to do any request when navigating the table. We can also implement much better search (e.g. fuzzy search with fuse.js - see e.g. https://github.com/kruci/interview-nmd for example) and filtering and Instead of pagination we could use infinite list. I did not want to do it like that as I already did that for different demo app ([see the mentioned lik](https://github.com/kruci/interview-nmd))
- for the current `/` I should add request cacheing, but no time
- I did not use next images for the images to cut corners
- I could have use some swagger to TS generator, but I used only few API endpoints
- page is not very fancy :D ... not time
