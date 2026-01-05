export async function GET() {
    try {
        const res = await fetch("https://www.dbooks.org/api/recent");

        if (!res.ok) {
            return Response.json(
                { error: "External API failed" },
                { status: 500 }
            );
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: "Fetch failed" },
            { status: 500 }
        );
    }
}
