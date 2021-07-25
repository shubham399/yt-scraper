
# YT Scraper 

An Project which ingest/scrap data from YT and provide APIs to fetch and query data from those dump.


## Installation


Connect to Database and add a Youtube API Key.


```bash
curl --location --request POST 'http://localhost:3000/api/v1/cred' \
--header 'Content-Type: application/json' \
--data-raw '{
    "key": "AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXG03E" 
}'
```
Insert an Valid Youtube API Key to fetch data.


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

- [ ]  Release API to make the key active again.

- [x]  Make a Docker image for the project.

- [ ]  Github Action to build an image on push

- [x]  Deploy with Heroku

- [ ]  create a `CNAME` record as `https://yt.shubhkumar.in`

- [ ]  Create an publish a Postman Collection


## Reference

- To fetch the latest videos you need to specify these: type=video, order=date, publishedAfter=<SOME_DATE_TIME>
- Without publishedAfter, it will give you cached results which will be too old
