import axios from "axios";

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

const normalizeUsername = (value = "") => value
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/.*/, "");

const githubHeaders = () => {
    const token = process.env.GITHUB_TOKEN;
    return {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const getCached = async (key, fetcher) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.createdAt < CACHE_TTL) return cached.value;
    const value = await fetcher();
    cache.set(key, { value, createdAt: Date.now() });
    return value;
};

export const getGithubProfile = async(username)=>{
    const normalizedUsername = normalizeUsername(username);
    if (!normalizedUsername) throw new Error("A valid GitHub username is required");
    return getCached(`profile:${normalizedUsername}`, async () => {
        const response = await axios.get(
            `https://api.github.com/users/${encodeURIComponent(normalizedUsername)}`,
            { headers: githubHeaders(), timeout: 10000 }
        );
        return response.data;
    });
}

export const getGithubRepos = async (username) => {
    const normalizedUsername = normalizeUsername(username);
    if (!normalizedUsername) throw new Error("A valid GitHub username is required");
    return getCached(`repos:${normalizedUsername}`, async () => {
        const response = await axios.get(
            `https://api.github.com/users/${encodeURIComponent(normalizedUsername)}/repos`,
            { headers: githubHeaders(), params: { per_page: 100, sort: "updated" }, timeout: 10000 }
        );
        return response.data;
    });
};
