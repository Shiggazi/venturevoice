import { createClient, type SanityClient } from "next-sanity";
import { projectId, dataset, apiVersion, isSanityConfigured } from "./env";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}

/**
 * Fetch from Sanity, falling back to local content when the CMS
 * is unconfigured, unreachable, or returns nothing. The site always renders.
 */
export async function safeFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {}
): Promise<T> {
  const client = getClient();
  if (!client) return fallback;
  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    if (data === null || data === undefined) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}
