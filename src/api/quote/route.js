
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const res = await fetch(
    `https://polygon.api.0x.org/swap/v1/quote?${searchParams}`,
    {
      headers: {
        "0x-api-key": process.env.NEXT_PUBLIC_ZEROEX_API_KEY,
      },
    }
  );
  const data = await res.json();

  return Response.json(data);
}
