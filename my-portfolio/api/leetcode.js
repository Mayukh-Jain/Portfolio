// Vercel Serverless API route to proxy LeetCode GraphQL requests (avoids CORS)
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    // Cache for 1 hour
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=7200");
    return res.status(200).json(data);
  } catch (error) {
    console.error("LeetCode proxy error:", error);
    return res.status(500).json({ error: "Failed to fetch from LeetCode" });
  }
}
