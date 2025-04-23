import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword = '', location = '', minSalary='' } = req.query;

  const app_id = process.env.ADZUNA_APP_ID;
  const app_key = process.env.ADZUNA_APP_KEY;

  const endpoint = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=20&what=Security ${keyword}&where=${location}&salary_max=${minSalary}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const json = await response.json();

    // Map only the required fields
    const simplifiedJobs = json.results.map((job: any) => ({
      title: job.title || '',
      type: job.contract_time || '',
      category: job.category?.label || '',
      url: job.redirect_url,
      location: job.location?.display_name || '',
      region: job.location?.area?.[1] || '', // second element is usually region
      postcode: job.location?.postcode || '',
      payRate: job.salary_min ? job.salary_min.toString() : '',
      payType: job.salary_is_predicted === "1" ? "Predicted" : "Actual",
      description: job.description || '',
      experience: '',          // Not directly available
      certifications: '',      // Not available
      shift: '',               // Not directly available
      deadline: job.created || '', // Using creation date if deadline is not available
    }));

    res.status(200).json(simplifiedJobs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
