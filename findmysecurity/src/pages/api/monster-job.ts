import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword = '', location = '', minSalary = '' } = req.query;
  const app_id = process.env.MONSTER_APP_KEY;
  const app_key = process.env.MONSTER_APP_SECRET;
  try {
    // Step 1: Authenticate with Monster API
    const authRes = await fetch(
      `https://api.jobs.com/auth/token?AppId=${app_id}&AppSecret=${app_key}`,
      { method: 'POST' }
    );

    const authData = await authRes.json();
    const token = authData?.Token;

    if (!token) {
      return res.status(401).json({ error: 'Unable to authenticate with Monster API.' });
    }

    // Step 2: Search jobs
    const searchUrl = `https://api.jobs.com/v3/search/jobs?title=${keyword}&city=${location}&radius=50&country=UK`;

    const jobsRes = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!jobsRes.ok) {
      const error = await jobsRes.text();
      return res.status(jobsRes.status).json({ error });
    }

    const jobs = await jobsRes.json(); // Now jobs is an array, not an object

    // Step 3: Map each job to Adzuna-style structure
    const simplifiedJobs = jobs.map((job: any) => ({
      title: job.title || '',
      type: '', // Not directly available
      category: job?.mesco?.alias || '',
      url: job.url || job.monsterurl || '',
      location: job.location || '',
      region: job.location?.split(',')?.[1]?.trim() || '',
      postcode: job.location?.match(/\b[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}\b/i)?.[0] || '',
      payRate: '', // Not available
      payType: '', // Not available
      description: job.summary || '',
      experience: '', // Not available
      certifications: '', // Not available
      shift: '', // Not available
      deadline: job.datecreated || '',
    }));

    res.status(200).json(simplifiedJobs);
  } catch (err: any) {
    console.error('Monster API error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
