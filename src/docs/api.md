# Diagnostic API

This document defines the backend contract for the Workflow Diagnostic system.
All endpoints operate on a Diagnostic Run, identified by a stable `runId`.

---

## Create Run

Creates a new diagnostic run.

### Endpoint

`POST /api/diagnostic/run`

### Request Body

```json
{
  "scope": "lead_response"
}

```

### Response

```json
{
  "runId": "uuid",
  "status": "created"
}
```

---

## Upload Evidence

Uploads one or more evidence files associated with a diagnostic run.

### Endpoint

`POST /api/diagnostic/evidence`

### Content-Type

`multipart/form-data`

### Fields

* `runId` (string, required)
* `file` (one or more files)

### Response

```json
{
  "ok": true
}
```

---

## Start Processing

Transitions the run into processing state and begins backend orchestration.

### Endpoint

`POST /api/diagnostic/process`

### Request Body

```json
{
  "runId": "uuid"
}
```

### Response

```json
{
  "status": "processing_started"
}
```

---

## Get Run Status

Fetches the current state of a diagnostic run.

### Endpoint

`GET /api/diagnostic/status?runId=uuid`

### Response

```json
{
  "id": "uuid",
  "status": "processing",
  "scope": "lead_response",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```