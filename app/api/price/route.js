

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const res = await fetch(
      `https://polygon.api.0x.org/swap/v1/price?${searchParams}`,
      {
        headers: {
          "0x-api-key": process.env.NEXT_PUBLIC_ZEROEX_API_KEY,
        },
      }
    );
    const data = await res.json();

    console.log("price data", data);

    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}
