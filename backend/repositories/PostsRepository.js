const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const { Post } = require('../models');
const DbStorage = require('../storages/DbStorage');

class PostsRepository {
  constructor() {
    this._storage = new DbStorage('posts');
  }

  async getAll() {
    try {
      const posts = await this._storage.getAll();
      return posts.map((post) => {
        const postModel = new Post({
          title: post.title,
          text: post.text,
          imgName: post.image_url,
          description: post.description,
          date: post.entry_date,
        });
        postModel.setId(post.id);
        const data = postModel.getData();
        data.imgPath = '/pictures/' + data.imgName;
        return data;
      });
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async getById(id) {
    try {
      const post = await this._storage.getById(id);
      if (!post) return null;

      const postModel = new Post({
        title: post.title,
        text: post.text,
        imgName: post.image_url,
        description: post.description,
        date: post.entry_date,
      });
      postModel.setId(post.id);
      const data = postModel.getData();
      data.imgPath = '/pictures/' + data.imgName;
      return data;
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async create({ title, text, description, date, pathFile }) {
    const POSTS_IMG_DIR = path.join(process.cwd(), 'public', 'pictures');
    let imgName = '';

    try {
      if (pathFile) {
        const img = await Jimp.read(pathFile);
        await img
          .autocrop()
          .cover(
            700,
            700,
            Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
          )
          .writeAsync(pathFile);
        imgName = `${uuidv4()}.jpg`;
        await fs.rename(pathFile, path.join(POSTS_IMG_DIR, imgName));
      } else {
        imgName = 'default-img.jpg';
      }

      const postModel = new Post({ title, text, description, date, imgName });
      const dataToStore = postModel.getDataForStorage();

      const { id } = await this._storage.create(dataToStore);
      postModel.setId(id);
      const data = postModel.getData();
      data.imgPath = '/pictures/' + data.imgName;
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(`Error with storage: ${e}`);
    }
  }
}

module.exports = new PostsRepository();
