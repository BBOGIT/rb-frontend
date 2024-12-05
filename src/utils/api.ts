const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1888';
const CLIENT_ORIGIN = import.meta.env.VITE_CLIENT_ORIGIN || 'http://localhost:1889';

export async function recognizeFromUrl(url: string, prompt: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/screenshot-price`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': CLIENT_ORIGIN
    },
    body: JSON.stringify({ url, prompt })
  });

  if (!response.ok) {
    throw new Error('Failed to recognize from URL');
  }

  return response.json();
}

export async function recognizeFromFile(file: File, prompt: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prompt', prompt);

  const response = await fetch(`${API_BASE_URL}/api/v1/file-price`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Origin': CLIENT_ORIGIN
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to recognize from file');
  }

  return response.json();
}