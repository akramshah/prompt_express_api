curl "http://localhost:4741/prompts/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"