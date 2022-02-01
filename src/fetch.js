export class Fetch {
  async get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const datax = await response.json(data);
    return datax;
  }

  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const datax = await response.json(data);
    return datax;
  }

  async delete(url) {
    await fetch(url, {
      method: "DELETE",
    });
    return "user deleted";
  }
}
