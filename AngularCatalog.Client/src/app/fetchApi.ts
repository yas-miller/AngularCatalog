export default function fetchApi(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body: any | null | undefined = null): Promise<Response> {
    return fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    });
}
