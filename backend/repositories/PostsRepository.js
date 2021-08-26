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
          imgUrl: post.image_url,
          description: post.description,
          date: post.entry_date,
        });
        postModel.setId(post.id);
        return postModel.getData();
      });
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async create({ title, text, description, date, pathFile }) {
    const POSTS_IMG_DIR = path.join(process.cwd(), 'public', 'pictures');
    let imgUrl = '';

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
        imgUrl = path.join(POSTS_IMG_DIR, `${uuidv4()}.jpg`);
        console.log(`imgUrl: ${imgUrl}`);
        await fs.rename(pathFile, imgUrl);
      } else {
        imgUrl = path.join(POSTS_IMG_DIR, 'default-img.jpg');
      }

      const postModel = new Post({ title, text, description, date, imgUrl });
      const dataToStore = postModel.getDataForStorage();

      const { id } = await this._storage.create(dataToStore);
      postModel.setId(id);
      return postModel.getData();
    } catch (e) {
      console.log(e);
      throw new Error(`Error with storage: ${e}`);
    }
  }
}

module.exports = new PostsRepository();
