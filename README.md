# Azure image service example
This is an example of using azurite as storage for uploaded images. These images are then served to the frontend.

## Setup

### Frontend
1. Navigate into the frontend folder and run `npm install`
2. When the install is complete run `npm run dev`

### Backend
1. Navigate into the backend folder. 
2. Run `docker compose up`

When this is complete you should be all good. If you have issues try checking some of these points:
- Ensure the backend builds correctly
- Enusre the ports that the backend use are available, if they are not you can change them in [docker-compose.yml](\backend\docker-compose.yml) and [docker-compose.override.yml](\backend\docker-compose.override.yml)
    - When changing these ports, you will also need to change the ApiUrl in [const.js](frontend\src\const.js)