class Post {
  constructor({ title, text, description, imgUrl, date, author }) {
    this._data = {
      title,
      text,
      imgUrl,
      date,
      description,
    };
  }

  getData() {
    return Object.assign({}, this._data);
  }

  setId(id) {
    this._data.id = id;
  }

  getDataForStorage() {
    const dataCopy = Object.assign({}, this._data);
    delete dataCopy.imgUrl;
    delete dataCopy.date;
    dataCopy.image_url = this._data.imgUrl.replace(/\\/g, '\\\\');
    dataCopy.entry_date = this._data.date;
    return dataCopy;
  }
}

module.exports = Post;
