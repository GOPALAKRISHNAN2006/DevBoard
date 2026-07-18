import axios from "axios";
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
}