import { getAccessToken } from "../lib/actions";
import useLoginModal from "../components/hooks/useLoginModal";

async function parseResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    // not JSON—fallback to raw text
    return text;
  }
}

function handleUnauthorized(res: Response) {
  if (res.status === 401 || res.status === 403) {
    useLoginModal.getState().open();
  }
}

const apiService = {
  get: async function (url: string): Promise<any> {
    console.log('GET', url);
    const token = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });

    const payload = await parseResponse(res);
    console.log('Response:', payload);

    if (!res.ok) {
      handleUnauthorized(res);
      throw new Error(`GET ${url} failed (${res.status}): ${JSON.stringify(payload)}`);
    }
    return payload;
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log('POST (no token)', url, data);

    const isFormData = data instanceof FormData;
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const body = isFormData ? data : JSON.stringify(data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'POST',
      headers,
      body,
    });

    const payload = await parseResponse(res);
    console.log('Response:', payload);

    if (!res.ok) {
      throw new Error(`POST ${url} failed (${res.status}): ${JSON.stringify(payload)}`);
    }
    return payload;
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log('POST', url, data);
    const token = await getAccessToken();

    const isFormData = data instanceof FormData;
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const body = isFormData ? data : JSON.stringify(data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'POST',
      headers,
      body,
    });

    const payload = await parseResponse(res);
    console.log('Response:', payload);

    if (!res.ok) {
      handleUnauthorized(res);
      throw new Error(`POST ${url} failed (${res.status}): ${JSON.stringify(payload)}`);
    }
    return payload;
  },

  deleteWithoutToken: async function (url: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    const payload = await parseResponse(res);

    if (!res.ok) {
      throw new Error(`DELETE ${url} failed (${res.status}): ${JSON.stringify(payload)}`);
    }
    return payload;
  },
};

export default apiService;
