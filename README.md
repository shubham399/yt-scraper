
# YT Scraper 

An Project which ingest/scrap data from YT and provide APIs to fetch and query data from those dump.


## Installation


Connect to Database and add a Youtube API Key.


```sql
INSERT INTO "Creds" values (1,'<Valid API Key Here>',true,now(),now());
```


## API Reference

#### Get video information

```http
  GET /api/v1/video?limit=10
```


| Parameter | Type     | Description                        |
| :-------- | :------- | :-------------------------------- |
| `limit`      | `number` | **Optional** Limit on number of rows to be fetched |
| `offset`      | `number` | **Optional** Offset from which data has to be fetched |
| `search`      | `string` | **Optional** Search Query  to search data from |

> **Note:** Search will work on title and description of the video

#### Ingest Videos

```http
  POST /api/v1/ingest/:query?publishedAfter=<timestamp> 
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required** Search Query for Ingest |
| `publishedAfter`      | `string` | **Optional** Published After TimeStamp |




## Features


- [ ]  Inject API 

- [ ]  Fetch Video API

- [ ]  Support more than one API Key for Ingest (In this case we will need release API to release an API Key for use.)


## Reference

- To fetch the latest videos you need to specify these: type=video, order=date, publishedAfter=<SOME_DATE_TIME>
- Without publishedAfter, it will give you cached results which will be too old
