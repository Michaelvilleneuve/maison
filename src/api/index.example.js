import config from 'config';

export const API = {
  url: `${config.protocol}${config.url}`,

  async headers(additionals = {}) {
    const headers = {
      ...await API.generateAuthToken(),
      'content-type': 'application/json',
    };
    return new Headers({ ...additionals, ...headers });
  },

  getUrl(url) {
    if (url.substring(0, 4) === 'http') {
      return url;
    }
    const parsedUrl = (url.charAt(0) === '/') ? url.substring(1) : url;
    return `${this.url}/${parsedUrl}`;
  },

  async get(url, options = {}) {
    return fetch(this.getUrl(url), Object.assign({
      headers: await API.headers(),
    }, options)).then(response => API.checkStatus(response));
  },

  async delete(url) {
    return fetch(this.getUrl(url), {
      headers: await API.headers(),
      method: 'DELETE',
    }).then(response => API.checkStatus(response));
  },

  async post(url, data, headers = {}) {
    return fetch(this.getUrl(url), {
      headers: await API.headers(headers),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(response => API.checkStatus(response));
  },

  async put(url, data, headers = {}) {
    return fetch(this.getUrl(url), {
      headers: await API.headers(headers),
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(response => API.checkStatus(response));
  },

  checkStatus(response) {
    return response.json().then(json => ({
      data: json,
      status: response.status,
      headers: response.headers,
    }));
  },

  async generateAuthToken() {
    return {
      Authorization: 'BLABLA',
    };
  },
};
