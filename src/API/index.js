import axios from './axios';

class API {
  static async getArticles(params = {}) {
    try {
      const result = await axios('get', '/v1/articles', params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getArchive(params = {}) {
    try {
      const result = await axios('get', '/v1/archive', params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getArticlesByArchive(params = {}) {
    try {
      const result = await axios('get', `/v1/archive/${params.parameter.split('/')[0]}/${params.parameter.split('/')[1]}/articles`, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getTypes(params = {}) {
    try {
      const result = await axios('get', '/v1/types', params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getArticlesByTypes(params = {}) {
    try {
      const result = await axios('get', `/v1/types/${params.parameter}/articles`, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getTags(params = {}) {
    try {
      const result = await axios('get', '/v1/tags', params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getArticlesByTags(params = {}) {
    try {
      const result = await axios('get', `/v1/tags/${params.parameter}/articles`, params);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default API;
