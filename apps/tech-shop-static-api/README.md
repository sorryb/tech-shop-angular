# Tech Shop static JSON API

This folder is a read-only, static version of the Tech Shop API for Azure Static Web Apps (SWA). Its source data is `apps/tech-shop-static-api/db.json`. The generator writes JSON resources under `data/` and creates `staticwebapp.config.json`, which maps API routes to those files.

## Requirements: Node.js 22

Use Node.js 22 to run the SWA CLI. The CLI's dependency chain currently uses the removed `SlowBuffer` API under newer Node versions and can fail at startup with an error mentioning `buffer-equal-constant-time` or `SlowBuffer.prototype`.

With nvm-windows, install/select Node 22 (for example, `nvm install 22.23.3` and `nvm use 22.23.3`). If `node --version` still reports Node 26, another Node installation may be taking precedence in `C:\Program Files\nodejs`. In the current PowerShell session, put nvm's Node 22 directory first on `PATH` and verify the version:

```powershell
$env:Path = "$env:NVM_HOME\v22.23.3;$env:Path"
node --version
```

It should print `v22.23.3`. This PATH change lasts only for the current PowerShell session. Then run `npx` as a shell command. Do not pass `npx.cmd` to `node`; it is a Windows batch file, not JavaScript.

## Run the SWA CLI locally

From the repository root, first generate or refresh the static resources, then start the SWA CLI against this folder:

```powershell
node apps/tech-shop-static-api/generate-static-data.mjs
npx @azure/static-web-apps-cli start apps/tech-shop-static-api
```

The local site is normally available at `http://localhost:4280`. Check the CLI output for the actual local URL and port. Try the API routes in a browser, for example `http://localhost:4280/api/config` and `http://localhost:4280/api/product`.

The static API supports these GET routes:

- `/api/config`
- `/api/product`
- `/api/categories`
- `/api/order`
- `/api/order/{id}` for order IDs present in the source data

The full source document is also served at `/db.json`. This API is read-only: it cannot create orders or update order statuses. It does not provide JSON Server pagination headers, so clients should load the order list and paginate it in the frontend.

## Connect an Angular frontend

The `food-shop` app configures the API base URL through `environment.apiUrl`, which is passed to `API_BASE_URL` in `apps/food-shop/src/app/app.module.ts`. Its local environment currently uses `/api`, and `proxy.conf.json` forwards that to JSON Server on `http://localhost:3000`. To use the SWA emulator instead, set the local `apiUrl` in `apps/food-shop/src/environments/environment.ts` to:

```ts
apiUrl: 'http://localhost:4280/api',
```

Then run the Angular app as usual (for example, `npx nx serve food-shop`) while the SWA CLI is running. Restore `apiUrl: '/api'` to use the existing JSON Server proxy again. For a deployed frontend, set `apiUrl` in `apps/food-shop/src/environments/environment.prod.ts` to the deployed SWA origin plus `/api`, for example `https://<your-app>.azurestaticapps.net/api`.

Other apps that use `ApiServiceModule` or the shared API services should configure their API base URL through the same `API_BASE_URL` provider or app environment configuration. Point it at the SWA `/api` URL when using this static API.

## API data and backend behavior

Edit `apps/tech-shop-static-api/db.json` to change the static API's source data, then regenerate the files with `node apps/tech-shop-static-api/generate-static-data.mjs`. The generated `data/` files and `staticwebapp.config.json` are what SWA serves; the CLI does not run a database or writable backend for this folder.

The repository's separate JSON Server backend is based on the root `db.json` and is started with `npm run serve-json` on port 3000. The Angular development proxy in `proxy.conf.json` targets that server. It is a different, mutable local backend; changing its data does not update this static API. For the static API, maintain `apps/tech-shop-static-api/db.json` and regenerate its output. If a frontend or other API client is configured to use this static API, its base URL must point directly to the SWA local/deployed host followed by `/api`.

## Deploy to Azure Static Web Apps

Create an Azure Static Web App and add its deployment token to the GitHub repository as the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret. The workflow at `.github/workflows/azure-static-web-apps.yml` regenerates the endpoint files and publishes `apps/tech-shop-static-api` as the app, with no Functions API or build step.
