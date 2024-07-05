import axios from 'axios';

class api {

    static async getUser(username, include_repos = false) {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            let data = response.data
            if (include_repos) {
                const repos = await axios.get(`https://api.github.com/users/${username}/repos`)
                data.repos = repos.data
            }
            return data;
        }
        catch (e) {
            if (e.response.data.status == 404) {
                return `404 Not found: El nombre de usuario proporcionado no existe`
                }
            if (e.response.data.status == 400) {
                return `400 Bad Request: El parametro username no es valido`
                }
            
            if (e.response.data.status == 500) {
                return `500 Internal Server Error: Error del servidor al procesar la solicitud`
                }
            }
    }

    static async getRepos({username, sort = 'full_name', direction = 'asc'}) {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
                params: {
                    sort: sort,
                    direction: direction
                },});

            return response.data;
        }
        catch (e) {
            if (e.response.data.status == 404) {
                return `404 Not found: El nombre de usuario proporcionado no existe`
                }
            if (e.response.data.status == 400) {
                return `400 Bad Request: El parametro username no es valido`
                }
            
            if (e.response.data.status == 500) {
                return `500 Internal Server Error: Error del servidor al procesar la solicitud`
                }
            }
    }

    static async getRepoInfo(username, repo) {
        try {
            const response = await axios.get(`https://api.github.com/repos/${username}/${repo}`);

            return response.data;
        }
        catch (e) {
            if (e.response.data.status == 404) {
                return `404 Not found: El nombre de usuario o repositorio no existe`
                }
            if (e.response.data.status == 400) {
                return `400 Bad Request: Los parametro username o repo no son validos`
                }
            
            if (e.response.data.status == 500) {
                return `500 Internal Server Error: Error del servidor al procesar la solicitud`
                }
            }
    }
}

export default api;
