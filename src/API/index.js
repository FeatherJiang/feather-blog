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

  static async getArticle(params = {}) {
    try {
      const result = await axios('get', `/v1/articles/${params.parameter}`, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getComments(params = {}) {
    try {
      const result = await axios('get', `/v1/articles/${params.parameter}/comments`, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async postComment(params = {}) {
    try {
      const result = await axios('post', `/v1/articles/${params.parameter}/comments`, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async putStar(params = {}) {
    try {
      const result = await axios('put', `/v1/articles/${params.parameter}/star`, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delStar(params = {}) {
    try {
      const result = await axios('delete', `/v1/articles/${params.parameter}/star`, params);
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

  static async getUser(params = {}) {
    try {
      const result = await axios('get', '/v1/users/1', params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async postImgs(params = {}) {
    try {
      const result = await axios('post', '/v1/imgs', params);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default API;
