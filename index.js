import express from 'express';
import api from './api.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.get('/api/github/user/:username/repos', async (req, res) => {

    const sort = req.query.sort;
    const direction = req.query.direction;
    if (sort && sort !== 'created' && sort !== 'updated' && sort !== 'pushed' && sort !== 'full_name') {
        res.send('Error de parametros: sort tiene que ser uno de los siguientes valores:  `created`, `updated`, `pushed`, `full_name`')
        return
    }

    if (direction && direction !== 'asc' && direction !== 'desc') {
        res.send('Error de parametros: direction tiene que ser uno de los siguientes valores:  `asc`, `desc`')
        return
    }
    
    const params_api = {
        username: req.params.username,
        sort: req.query.sort,
        direction: req.query.direction
    }

    res.send(await api.getRepos({...params_api}));

})

app.get('/api/github/user/:username', async (req, res) => {
    const include_repos = req.query.include_repos;
    if (include_repos && include_repos !== 'false' && include_repos !== 'true' ) {
        res.send('Error de parametros: include_repos tiene que ser un booleano (true) o (false)')
        return
    }

    const data = await api.getUser(req.params.username, include_repos)

    res.send(data)
})



app.get('/api/github/user/:username/repos/:repo', async (req, res) => {
    res.send(await api.getRepoInfo(req.params.username, req.params.repo));

})

app.listen(port, () => {
    console.log("Escuchando en el puerto", port)
})
