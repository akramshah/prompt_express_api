curl "http://localhost:4741/prompts/${ID}" \
--include \
--request PATCH \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "prompt": {
    "title": "'"${TITLE}"'",
    "description": "'"${DESCRIPTION}"'"
  }
}'