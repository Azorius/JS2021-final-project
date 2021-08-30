const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const { Post } = require('../models');
const DbStorage = require('../storages/DbStorage');

class PostsRepository {
  constructor() {
    this._storage = new DbStorage('posts');
    this.generatePostDataToReturn = (post) => {
      const postModel = new Post({
        title: post.title,
        text: post.text,
        imgName: post.image_url,
        description: post.description,
        date: post.entry_date,
        owner: post.owner,
      });
      postModel.setId(post.id_posts);
      postModel.setOwnerData(post.name);
      const data = postModel.getData();
      data.imgPath = '/pictures/' + data.imgName;
      return data;
    }
  }

  async getAll(filter) {
    try {
      const posts = filter ? await this._storage.getFiltered(filter) : await this._storage.getAll();
      return posts.map((post) => {
        return this.generatePostDataToReturn(post);
      });
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async getById(id) {
    try {
      const post = await this._storage.getById(id);
      if (!post) return null;

      return this.generatePostDataToReturn(post);
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async create({ title, text, description, date, pathFile, owner }) {
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

      const postModel = new Post({ title, text, description, date, imgName, owner });
      const dataToStore = postModel.getDataForStorage();

      const { id_posts } = await this._storage.create(dataToStore);
      postModel.setId(id_posts);
      const data = postModel.getData();
      data.imgPath = '/pictures/' + data.imgName;
      return data;
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }
}

module.exports = new PostsRepository();
