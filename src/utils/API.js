import axios from 'axios';

const path = 'https://rbvc.herokuapp.com/api/';
//const path = 'localhost:8080/api/'

export default class API {

  static get = async (request, query) => await axios
    .get(`${path}${request}${query ? `?filter=${JSON.stringify(query)}` : ''}`)
    .then(({ data }) => data);

  static post = async (request, values) => await axios
    .post(`${path}${request}`, values)
    .then(({ data }) => data);
  
  static patch = async (request, values) => await axios
    .patch(`${path}${request}`, values)
    .then(({ data }) => data);
  
  static delete = async request => await axios
    .delete(`${path}${request}`)
    .then(({ data }) => data);
}