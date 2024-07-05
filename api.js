import axios from 'axios';

class api {

    static async getUser(username, include_repos = false) {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        let data = response.data
        if (include_repos) {
            const repos = await axios.get(`https://api.github.com/users/${username}/repos`)
            data.repos = repos.data
        }
        return data;
    }

    static async getRepos({username, sort = 'full_name', direction = 'asc'}) {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            params: {
                sort: sort,
                direction: direction
            },});

        return response.data;
    }

    static async getRepoInfo(username, repo) {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}`);

        return response.data;
    }
}

export default api;