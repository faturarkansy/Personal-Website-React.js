const GITHUB_API = "https://api.github.com";
const GITHUB_GQL = "https://api.github.com/graphql";

const DEFAULT_USERNAME = process.env.GITHUB_USERNAME || "faturarkansy";
const TOKEN = process.env.GITHUB_TOKEN || "";

function buildHeaders(isGraphql = false) {
  const headers = {
    Accept: isGraphql ? "application/json" : "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (isGraphql) {
    headers["Content-Type"] = "application/json";
  }
  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }
  return headers;
}

async function githubFetch(path) {
  const url = path.startsWith("http") ? path : `${GITHUB_API}${path}`;
  const response = await fetch(url, { headers: buildHeaders(false) });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `GitHub ${response.status}: ${body.slice(0, 200) || response.statusText}`,
    );
  }
  return response.json();
}

function getLast12MonthsRange() {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(from.getFullYear() - 1);
  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

async function countRepos(publicRepos) {
  if (!TOKEN) return publicRepos;

  try {
    const response = await fetch(
      `${GITHUB_API}/user/repos?per_page=1&affiliation=owner,collaborator,organization_member`,
      { headers: buildHeaders(false) },
    );
    if (!response.ok) return publicRepos;

    const link = response.headers.get("link");
    if (link) {
      const last = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
      if (last?.[1]) return Number(last[1]);
    }

    let page = 1;
    let count = 0;
    while (page <= 20) {
      const pageData = await githubFetch(
        `/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member`,
      );
      count += pageData.length;
      if (pageData.length < 100) break;
      page += 1;
    }
    return count || publicRepos;
  } catch {
    return publicRepos;
  }
}

async function fetchLast12MonthsActivity(username) {
  if (!TOKEN) return null;

  const { from, to } = getLast12MonthsRange();

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GQL, {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify({
      query,
      variables: { login: username, from, to },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `GitHub GraphQL ${response.status}: ${body.slice(0, 200) || response.statusText}`,
    );
  }

  const json = await response.json();
  const collection = json?.data?.user?.contributionsCollection;
  const cal = collection?.contributionCalendar;
  if (json?.errors?.length || !collection || !cal) {
    throw new Error(
      json?.errors?.[0]?.message || "Gagal mengambil data kontribusi GitHub.",
    );
  }

  const calendar = {};
  let activeDays12m = 0;

  for (const week of cal.weeks || []) {
    for (const day of week.contributionDays || []) {
      if (day.contributionCount > 0) {
        calendar[day.date] = day.contributionCount;
        activeDays12m += 1;
      }
    }
  }

  return {
    calendar,
    totalContributions: cal.totalContributions ?? 0,
    commitContributions: collection.totalCommitContributions ?? 0,
    activeDays12m,
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!TOKEN) {
    return res.status(500).json({
      error:
        "GITHUB_TOKEN belum dikonfigurasi pada environment variable server.",
    });
  }

  try {
    const queryUsername =
      typeof req.query?.username === "string" && req.query.username.trim()
        ? req.query.username.trim()
        : DEFAULT_USERNAME;

    const user = await githubFetch(
      `/users/${encodeURIComponent(queryUsername)}`,
    );
    const [projects, activity12m] = await Promise.all([
      countRepos(user.public_repos ?? 0),
      fetchLast12MonthsActivity(queryUsername),
    ]);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({
      username: user.login,
      profileUrl: user.html_url,
      projects,
      commits: activity12m.commitContributions,
      pushes: activity12m.activeDays12m,
      totalContributions: activity12m.totalContributions,
      calendar: activity12m.calendar,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(502).json({
      error: err?.message || "Gagal memuat data GitHub Activity.",
    });
  }
}
