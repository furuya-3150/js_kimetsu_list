export class Fetch {
  constructor() {
  }

  list_by(url) {
    return fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(new Error(`responseStatus${response.status}
            responseText${response.statusTest}`));
        }
    });
  }
}