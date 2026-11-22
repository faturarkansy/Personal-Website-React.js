const DEFAULT_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "faturarkansy";

export async function getGithubActivity(customUsername) {
  const username = (customUsername || DEFAULT_USERNAME).trim();
  const endpoint = `/api/github-activity?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.error || `Gagal mengambil data GitHub (${response.status}).`,
    );
  }

  return data;
}
