class Post {
  constructor({ title, text, description, imgName, date, owner }) {
    this._data = {
      title,
      text,
      imgName,
      date,
      description,
      owner,
    };
  }

  getData() {
    return Object.assign({}, this._data);
  }

  setId(id) {
    this._data.id = id;
  }

  setOwnerData(name) {
    this._data.owner = { id: this._data.owner, name };
  }

  getDataForStorage() {
    const dataCopy = Object.assign({}, this._data);
    delete dataCopy.imgName;
    delete dataCopy.date;
    dataCopy.image_url = this._data.imgName;
    dataCopy.entry_date = this._data.date;
    return dataCopy;
  }
}

module.exports = Post;
