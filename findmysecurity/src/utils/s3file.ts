import { API_URL } from "./path";

export async function uploadToS3({
    file,
    token,
    endpoint = 'file/upload', 
  }: {
    file: File;
    token: string;
    endpoint?: string;
  }): Promise<string> {
    // Step 1: Get pre-signed URL
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    });
  
    if (!res.ok) {
      throw new Error('Failed to get signed URL');
    }
  
    const { uploadUrl, fileUrl } = await res.json();
  
    // Step 2: Upload file directly to S3
    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
  
    if (!uploadRes.ok) {
      throw new Error('Failed to upload file to S3');
    }
  
    // Step 3: Return final file URL
    return fileUrl;
  }
  