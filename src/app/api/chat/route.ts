import { headers } from "next/headers";
import { getChatResponse } from "../chatApi";
/*
curl -H "Authorization: Bearer 1234"  \
  -X POST "http://localhost:3000/api/chat" \
  -H 'Content-Type: application/json' \
  -d '{
  "messages": [
      {
          "role": "user",
          "content": "tell me a joke"
      }
  ]
}'
*/
export async function POST(
  req: Request,
) {
  const useHeader = headers(req);
  const authToken = (useHeader.get("authorization") || "").split("Bearer ")[1];

  if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    try {
      const body = await req.json();
      const { messages } = body;
      const result = await getChatResponse(messages);

      return Response.json({ result });
    } catch (error) {
      console.error("Error creating model data:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  return Response.json({ error: "Invalid Auth Token" }, { status: 401 });
}
