/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import conf from "../conf/config";

export class AuthService {
  firebaseConfig = {
    apiKey: conf.apiKey,
		authDomain: conf.authDomain,
    databaseURL: conf.databaseURL,
		projectId: conf.projectId,
		storageBucket: conf.storageBucket,
		messagingSenderId: conf.messagingSenderId,
		appId: conf.appId,
		measurementId: conf.measurementId,
  };
  analytics;
  auth;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(app);
    this.auth = getAuth(app);
  }

  async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
      if(userCredential.user){
        const user = await this.login(email, password)
         return user
      }
    } catch (error) {
      throw error
    }
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
      const user = userCredential.user
      return user
    } catch (error) {
      throw error
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.auth.currentUser
      return user
    } catch (error) {
      throw error
    }
  }

  async onAuthStateChanged(callback) {
    try {
      return this.auth.onAuthStateChanged(callback);
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      await this.auth.signOut()
      return true
    } catch (error) {
      throw error
    }
  }
}

const authService = new AuthService()

export default authService;
