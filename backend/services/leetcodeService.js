import axios from "axios";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

const getCached = async (key, fetcher, forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.createdAt < CACHE_TTL) {
      return cached.value;
    }
  }
  const value = await fetcher();
  cache.set(key, { value, createdAt: Date.now() });
  return value;
};

/**
 * Comprehensive LeetCode GraphQL Query Service
 */
export const getLeetcodeProfile = async (username, forceRefresh = false) => {
  const query = `
    query getLeetcodeFullAnalytics($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
          userAvatar
          realName
          aboutMe
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        badges {
          id
          name
          displayName
          icon
          hoverText
          creationDate
        }
        userCalendar {
          submissionCalendar
          streak
          totalActiveDays
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
      }
      userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        contest {
          title
          startTime
        }
      }
      recentAcSubmissionList(username: $username, limit: 10) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  return getCached(
    `leetcode:${username}`,
    async () => {
      const response = await axios.post(
        "https://leetcode.com/graphql",
        {
          query,
          variables: { username },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Referer": "https://leetcode.com",
          },
          timeout: 12000,
        }
      );

      if (response.data.errors) {
        console.warn("LeetCode GraphQL warnings:", response.data.errors);
      }

      return response.data.data;
    },
    forceRefresh
  );
};