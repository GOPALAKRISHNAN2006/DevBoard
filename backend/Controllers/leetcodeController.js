import User from "../models/User.js";
import { getLeetcodeProfile } from "../services/leetcodeService.js";

/**
 * Fetch raw LeetCode profile
 */
export const fetchLeetcodeProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.leetcodeUsername) {
      return res.status(400).json({
        message: "LeetCode username not configured in Profile Settings",
      });
    }

    const forceRefresh = req.query.forceRefresh === "true";
    const data = await getLeetcodeProfile(user.leetcodeUsername, forceRefresh);
    if (!data || !data.matchedUser) {
      return res.status(404).json({
        message: `LeetCode user '@${user.leetcodeUsername}' not found`,
      });
    }

    res.status(200).json(data.matchedUser);
  } catch (error) {
    console.error("fetchLeetcodeProfile error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Fetch Normalized LeetCode Analytics Stats
 */
export const fetchLeetcodeStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.leetcodeUsername) {
      return res.status(400).json({
        message: "LeetCode username not configured in Profile Settings",
      });
    }

    const forceRefresh = req.query.forceRefresh === "true";
    const rawData = await getLeetcodeProfile(user.leetcodeUsername, forceRefresh);

    if (!rawData || !rawData.matchedUser) {
      return res.status(404).json({
        message: `LeetCode user '@${user.leetcodeUsername}' not found`,
      });
    }

    const { matchedUser, userContestRanking, userContestRankingHistory, recentAcSubmissionList } = rawData;
    const profileObj = matchedUser.profile || {};
    const submitStats = matchedUser.submitStats || {};
    const acList = submitStats.acSubmissionNum || [];
    const totalList = submitStats.totalSubmissionNum || [];

    // Solved Breakdown
    const totalSolved = acList.find((item) => item.difficulty === "All")?.count || 0;
    const easySolved = acList.find((item) => item.difficulty === "Easy")?.count || 0;
    const mediumSolved = acList.find((item) => item.difficulty === "Medium")?.count || 0;
    const hardSolved = acList.find((item) => item.difficulty === "Hard")?.count || 0;

    // Submissions Total & Acceptance Rate
    const totalSubmissions = totalList.find((item) => item.difficulty === "All")?.submissions || 0;
    const acSubmissions = acList.find((item) => item.difficulty === "All")?.submissions || totalSolved;
    const acceptanceRate = totalSubmissions > 0
      ? `${((acSubmissions / totalSubmissions) * 100).toFixed(1)}%`
      : "N/A";

    // Activity & Calendar
    const userCalendar = matchedUser.userCalendar || {};
    let parsedCalendar = {};
    try {
      if (userCalendar.submissionCalendar) {
        parsedCalendar = typeof userCalendar.submissionCalendar === "string"
          ? JSON.parse(userCalendar.submissionCalendar)
          : userCalendar.submissionCalendar;
      }
    } catch (e) {
      parsedCalendar = {};
    }

    const activeDays = userCalendar.totalActiveDays || Object.keys(parsedCalendar).length || 0;

    // Languages
    const languages = (matchedUser.languageProblemCount || []).map((lang) => ({
      languageName: lang.languageName,
      problemsSolved: lang.problemsSolved,
    }));

    // Badges
    const badges = (matchedUser.badges || []).map((b) => ({
      id: b.id,
      name: b.displayName || b.name,
      icon: b.icon?.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`,
      hoverText: b.hoverText || "",
      creationDate: b.creationDate || null,
    }));

    // Contest Performance
    const contest = userContestRanking
      ? {
          rating: Math.round(userContestRanking.rating || 0),
          ranking: userContestRanking.globalRanking || 0,
          attended: userContestRanking.attendedContestsCount || 0,
          topPercentage: userContestRanking.topPercentage
            ? `${userContestRanking.topPercentage}%`
            : "N/A",
          history: (userContestRankingHistory || [])
            .filter((h) => h.attended)
            .map((h) => ({
              title: h.contest?.title || "Contest",
              rating: Math.round(h.rating || 0),
              ranking: h.ranking || 0,
              date: h.contest?.startTime
                ? new Date(h.contest.startTime * 1000).toISOString().split("T")[0]
                : "",
            })),
        }
      : null;

    // Recent Accepted Problems
    const recentProblems = (recentAcSubmissionList || []).map((p) => ({
      id: p.id,
      title: p.title,
      titleSlug: p.titleSlug,
      timestamp: p.timestamp
        ? new Date(parseInt(p.timestamp, 10) * 1000).toLocaleDateString()
        : "Recent",
      url: `https://leetcode.com/problems/${p.titleSlug}/`,
    }));

    // Response Normalized Payload
    res.status(200).json({
      profile: {
        username: matchedUser.username,
        realName: profileObj.realName || matchedUser.username,
        avatar: profileObj.userAvatar || "",
        ranking: profileObj.ranking || 0,
        reputation: profileObj.reputation || 0,
        aboutMe: profileObj.aboutMe || "",
      },
      solved: {
        total: totalSolved,
        easy: easySolved,
        medium: mediumSolved,
        hard: hardSolved,
      },
      submissions: {
        total: totalSubmissions,
        accepted: acSubmissions,
        acceptanceRate,
      },
      activity: {
        currentStreak: userCalendar.streak || 0,
        activeDays,
        calendar: parsedCalendar,
      },
      languages,
      badges,
      contest,
      recentProblems,
    });
  } catch (error) {
    console.error("fetchLeetcodeStats error:", error.message);
    res.status(500).json({ message: error.message });
  }
};