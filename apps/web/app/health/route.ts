const healthPayload = Object.freeze({
  service: "web",
  status: "ok",
});

export function GET(): Response {
  return Response.json(healthPayload, {
    headers: {
      "Cache-Control": "no-store",
    },
    status: 200,
  });
}
