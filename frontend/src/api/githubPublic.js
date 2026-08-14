const normalizeUsername = (value = "") => value
  .trim()
  .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
  .replace(/^@/, "")
  .replace(/\/.*/, "");

const request = async (path) => {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    if (response.status === 403) {
      throw new Error("GitHub is temporarily busy. Please try again in a few minutes.");
    }
    if (response.status === 404) {
      throw new Error("GitHub user not found. Check the username in Profile Settings.");
    }
    throw new Error(payload.message || "Unable to load GitHub data.");
  }
  return response.json();
};

export const getPublicGithubProfile = (username) => {
  const name = normalizeUsername(username);
  if (!name) return Promise.reject(new Error("A valid GitHub username is required."));
  return request(`/users/${encodeURIComponent(name)}`);
};

export const getPublicGithubRepos = (username) => {
  const name = normalizeUsername(username);
  if (!name) return Promise.reject(new Error("A valid GitHub username is required."));
  return request(`/users/${encodeURIComponent(name)}/repos?per_page=100&sort=updated`);
};
