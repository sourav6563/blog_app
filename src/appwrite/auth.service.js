import { Client, Account, ID } from "appwrite";
import { config } from "../config/config.js";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteProjectId)
      .setProject(config.appwriteUrl);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(`Appwrite service create account error: ${error}`);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.log(`Appwrite service login error: ${error}`);
    }
  }

  async getUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log(`Appwrite service getUser error: ${error}`);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log(`Appwrite service logOut error: ${error}`);
      return false;
    }
  }
}
const authService = new AuthService();

export default authService;
