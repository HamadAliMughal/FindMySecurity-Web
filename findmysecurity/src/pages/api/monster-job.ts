// pages/api/monster-job.ts
export default async function handler(req, res) {
    const { keyword = "Security Guard", location = "London" } = req.query;
  
    const appKey = process.env.MONSTER_APP_KEY;
    const appSecret = process.env.MONSTER_APP_SECRET;
  
    if (!appKey || !appSecret) {
      return res.status(500).json({ error: "Missing Monster API credentials" });
    }
  
    try {
      const auth = Buffer.from(`${appKey}:${appSecret}`).toString("base64");
  
      const monsterResponse = await fetch(
        `https://api.monster.com/jobs/search?q=${keyword}&where=${location}`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await monsterResponse.json();
  
      const jobs = data.jobs?.map((job: any) => ({
        title: job.title,
        type: job.jobType || "N/A",
        category: job.category || "N/A",
        location: job.location?.city || location,
        region: job.location?.state || "N/A",
        postcode: job.location?.postalCode || "N/A",
        payRate: job.salary?.min || 0,
        payType: "Annual",
        experience: job.experienceLevel || "N/A",
        shift: job.shift || "N/A",
        certifications: "N/A",
        description: job.description || "",
        deadline: job.expirationDate || "N/A",
        url: job.url,
      })) || [];
  
      return res.status(200).json(jobs);
    } catch (error) {
      console.error("Monster API error:", error);
      return res.status(500).json({ error: "Failed to fetch jobs from Monster" });
    }
  }
  