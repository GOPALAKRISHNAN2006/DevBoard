import axios from "axios";

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

const getCached = async (key, fetcher) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.createdAt < CACHE_TTL) return cached.value;
    const value = await fetcher();
    cache.set(key, { value, createdAt: Date.now() });
    return value;
};

export const getLeetcodeProfile = async (username)=>{
    const query = `
    query getUserProfile($username: String!){
       matchedUser(username:$username){
       username
       profile{
          ranking
          reputation
          userAvatar
          realName
          aboutMe
       },
       submitStats{
          acSubmissionNum{
             difficulty
             count
          }
        }
       }
    }`;
    
    return getCached(`leetcode:${username}`, async () => {
        const response = await axios.post(
            "https://leetcode.com/graphql",
            {
                query,
                variables:{
                    username
                }
            },
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        );
        return response.data.data.matchedUser;
    });
}