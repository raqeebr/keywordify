export default async function fetcher<TResponse>(url: string, options?: RequestInit): Promise<TResponse> {
    try {
        const res = await fetch(url, options);
        return res.json() as TResponse;
    } catch (error) {
        console.log(error);
        throw error;
    }
}