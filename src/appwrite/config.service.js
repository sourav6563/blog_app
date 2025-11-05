import { Client, Databases, Storage, Query, ID } from "appwrite";
import { config } from "../config/config.js";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // ✅ Correct order: endpoint first
      .setProject(config.appwriteProjectId); // ✅ Then project ID
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.databases.createDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteTableName,
        documentId: slug, // can also use ID.unique()
        data: {
          title,
          content,
          featuredImage,
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
      const updatedPost = await this.databases.updateDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteTableName,
        documentId: slug,
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
      await this.databases.deleteDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteTableName,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.error(`Appwrite service deletePost error: ${error.message}`);
      return false;
    }
  }
}

const service = new Service();

export default service;
