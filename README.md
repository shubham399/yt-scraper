
# YT Scraper 

An Project which ingest/scrap data from YT and provide APIs to fetch and query data from those dump.

## Badge

![](https://github.com/shubham399/yt-scraper/actions/workflows/docker-publish.yml/badge.svg)


## Installation

### Pre Requisite 

1. A Working Postgres DataBase
2. Valid API Key to scrape youtube


## To Run Locally.

```
docker run --rm  -e YT_QUERY="how to" -e ENABLE_SCRAPER=false -e DATABASE_URL=postgres://yt@yt:172.0.0.1/yt -e NODE_ENV=production -p 8081:3000 ghcr.io/shubham399/yt-scraper:main
```

> **NOTE**: Example DB Connection URL: postgres://yt@yt:172.0.0.1/yt

| Parameter | Type     | Description                        |
| :-------- | :------- | :-------------------------------- |
| `YT_QUERY` | `string` | Query with which we need to scrape youtube |
| `ENABLE_SCRAPER` | `boolean` | To Enable Auto Scraping with interval of 10 sec |
| `DATABASE_URL` | `string` | Database URL |


Add the Youtube API Key with 

```bash
curl --location --request POST 'http://localhost:3000/api/v1/cred' \
--header 'Content-Type: application/json' \
--data-raw '{
    "key": "AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXG03E" 
}'
```

and your application is ready. If `ENABLE_SCRAPER` is on it will start fetching data from youtube every 10 sec. otherwise we can use `/api/v1/ingest/` API to fetch the data.


### A version of this application is already running on `Heroku` with the Host Endpoint as `https://yt.shubhkumar.in`

## API Reference

#### Get video information

```http
  GET /api/v1/video?search=hello&limit=10&offset
```


| Parameter | Type     | Description                        |
| :-------- | :------- | :-------------------------------- |
| `limit`      | `number` | **Optional** Limit on number of rows to be fetched default:10 |
| `offset`      | `number` | **Optional** Offset from which data has to be fetched default:0 |
| `search`      | `string` | **Optional** Search Query  to search data from |

> **Note:** Search will work on title and description of the video

#### Ingest Videos

```http
  POST /api/v1/ingest/
```
```json
{
  "query" : "how to",
  "publishedAfter": "2021-02-20"
}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required** Search Query for Ingest |
| `publishedAfter`      | `string` | **Optional** Published After TimeStamp |




## Features with TODOs


- [x]  Inject API 

- [x]  Fetch Video API

- [x]  Support more than one API Key for Ingest 

- [x]  Release API to make the key active again.

- [x]  Make a Docker image for the project.

- [x]  Github Action to test and build an image on push

- [x]  Deploy with Heroku

- [x]  create a `CNAME` record as `https://yt.shubhkumar.in`

- [ ]  Create an publish a Postman Collection


## Reference

- To fetch the latest videos you need to specify these: type=video, order=date, publishedAfter=<SOME_DATE_TIME>
- Without publishedAfter, it will give you cached results which will be too old
