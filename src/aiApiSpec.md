# AI Video Analysis API Specification

## Overview
This API allows you to send athlete video files for AI-based skill assessment (pose estimation, rep counting, scoring, etc.).

---

## Endpoint
**POST** `/api/analyze-video`

### Request
- **Headers:**
  - `Content-Type: multipart/form-data`
  - `Authorization: Bearer <token>` (if required)
- **Body:**
  - `video`: (file) The video file to analyze
  - `athleteId`: (string) Athlete identifier
  - `testType`: (string) Skill test type (e.g., `situps`, `verticaljump`, `shuttlerun`)

#### Example (curl)
```
curl -X POST https://yourdomain.com/api/analyze-video \
  -H "Authorization: Bearer <token>" \
  -F "video=@/path/to/video.mp4" \
  -F "athleteId=12345" \
  -F "testType=situps"
```

---

### Response
- **Success:**
  - `200 OK`
  - JSON body:
    ```json
    {
      "status": "success",
      "result": {
        "testType": "situps",
        "repCount": 23,
        "score": 85,
        "analysis": "Good form, consistent reps."
      }
    }
    ```
- **Error:**
  - `400 Bad Request` or `500 Internal Server Error`
  - JSON body:
    ```json
    {
      "status": "error",
      "message": "Invalid video format."
    }
    ```

---

## Notes
- The backend should process the video and return analysis results.
- Authentication may be required for production use.
- Extend the response for additional skill tests or analytics as needed.

---

## Next Steps
- Share this spec with your backend/AI team.
- Implement the endpoint in your backend (Python, Node.js, etc.).
- Integrate with your React frontend using `fetch` or `axios`.
