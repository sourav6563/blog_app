import {
  Client,
  TablesDB,
  Storage,
  Query,
  ID,
  Permission,
  Role,
} from "appwrite";
import { config } from "../config/config.js";

class Service {
  client = new Client();
  tabledb;
  storage;

  constructor() {
    this.client
      .setProject(config.appwriteProjectId)
      .setEndpoint(config.appwriteUrl);
    this.tabledb = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.tabledb.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableName,
        rowId: slug, // can also use ID.unique()
        data: {
          title,
          content,
          featuredImage: featuredImage || "",
          status,
          userId,
        },
      });
      return post;
    } catch (error) {
      console.error(`Appwrite service createPost error: ${error.message}`);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updatedPost = await this.tabledb.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableName,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
      return updatedPost;
    } catch (error) {
      console.error(`Appwrite service updatePost error: ${error.message}`);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tabledb.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableName,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.error(`Appwrite service deletePost error: ${error.message}`);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.tabledb.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableName,
        rowId: slug,
      });
    } catch (error) {
      console.log(`Appwrite service getPost error: ${error}`);
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tabledb.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableName,
        queries,
      });
    } catch (error) {
      console.log(`Appwrite service getAllPosts error: ${error}`);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file,
        permissions: [Permission.read(Role.any())],
      });
    } catch (error) {
      console.log(`Appwrite service uploadFile error: ${error}`);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log(`Appwrite service deleteFile error: ${error}`);
      return false;
    }
  }

  getFileView(fileId) {
    return this.storage.getFileView({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;
