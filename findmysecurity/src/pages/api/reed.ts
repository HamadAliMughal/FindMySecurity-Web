import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch'; // Optional if you're on Node 18+

// Helper function to convert postcode to human-readable location
interface PostcodeApiResponse {
  result?: {
    admin_district?: string;
  };
}

const getReadableLocation = async (postcode: string) => {
  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
    if (!res.ok) return postcode;
    const data = await res.json() as PostcodeApiResponse;
    return data.result?.admin_district || postcode; // e.g., "City of London"
  } catch {
    return postcode;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword = '', location = '', minSalary = '' } = req.query;

  const reedApiKey = process.env.REED_API_KEY;
  const endpoint = `https://www.reed.co.uk/api/1.0/search?keywords=${keyword}&locationName=${location}&minimumSalary=${minSalary}&resultsToTake=20`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${reedApiKey}:`).toString('base64'),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const json = await response.json() as { results: any[] };

    // Map and enhance the job data
    const simplifiedJobs = await Promise.all(
      json.results.map(async (job: any) => {
        const readableLocation = await getReadableLocation(job.locationName || '');
        return {
          title: job.jobTitle || '',
          type: '', // Not directly available in Reed API
          category: job.jobTitle?.split(' ')[0] || '',
          url: job.jobUrl,
          location: readableLocation,
          region: '', // Could use data.result.region from postcodes.io if needed
          postcode: job.locationName || '',
          payRate: job.minimumSalary ? job.minimumSalary.toString() : '',
          payType: job.salaryType || 'Annual',
          description: job.jobDescription || '',
          experience: '',         // Not available
          certifications: '',     // Not available
          shift: '',              // Not available
          deadline: job.expirationDate || '',
          source: 'reed',
        };
      })
    );

    res.status(200).json({ results: simplifiedJobs });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
