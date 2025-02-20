# Azure image service example

This is an example of using azurite as storage for uploaded images. These images are then served to the frontend.

## Setup
1. In the root directory of the project run `docker compose up`
2. When this completes, you should be able to access the page at <a href="http://localhost:5173">localhost:5173</a>

If you encounter any problems, check the following:
- Ensure the backend builds correctly
- Check that port 5173 is available. This is the port that the frontend uses.
- Check that port 5500 and 5501 are available, these are the api ports.
- Check that ports 11000, 11001 and 11002 are available, these are the azurite ports.
- Ports can be change in [backend/docker-compose.yml](\backend\docker-compose.yml) and [backend/docker-compose.override.yml](\backend\docker-compose.override.yml) for the backend. Checkout [docker-compose.yml](\docker-compose.yml) and [Dockerfile](\frontend\Dockerfile) for the frontend.
  - When changing the backend ports, you will also need to change the ApiUrl in [const.js](frontend\src\const.js)
- After making any changes to a dockerfile I would recommend doing `docker compose down` and `docker compose up --build`.
