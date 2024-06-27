// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { PlaceData } from "@googlemaps/google-maps-services-js";
import { Client } from "@googlemaps/google-maps-services-js";

// Initialize the Google Maps Client
const client = new Client({});

// Ensure you have set your API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<PlaceData>[] | { error: string }>
) {
  if (req.method === "POST") {
    // Check for the API key
    if (!GOOGLE_MAPS_API_KEY) {
      res.status(500).json({ error: "Google Maps API key is missing" });
      return;
    }
    const { query } = req.body;
    
    if (!query || query.trim().length == 0) {
      return;
    }
    try {
      // Fetch Google Maps Text Search Results
      const response = await client.textSearch({
        params: {
          query: query,
          key: GOOGLE_MAPS_API_KEY,
          region: "sg",
        },
        timeout: 1000,
      });

      // Check if the response status is OK
      if (response.status !== 200) {
        res
          .status(response.status)
          .json({ error: "Failed to fetch places data" });
        return;
      }

      // Send back the results
      res.status(200).json(response.data.results);
    } catch (error) {
      // Handle Errors
      console.error("Error fetching Google Maps data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching places data" });
    }
  }
}
