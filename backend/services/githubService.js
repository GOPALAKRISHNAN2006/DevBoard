import axios from "axios";

export const getGithubProfile = async(username)=>{
    const response = await axios.get(
        `https://api.github.com/users/${username}`
    );
    return response.data;
}

export const getGithubRepos = async (username) => {
    const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
    );

    return response.data;
};