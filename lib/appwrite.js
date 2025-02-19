import { Avatars, Query } from 'appwrite';
import { ID, Client, Account, Databases } from 'react-native-appwrite';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Appwrite Configuration
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.329.aora',
    projectId: '67a6251d002a75a579a7',
    databaseId: '67a62783001aeb0f5cef',
    userCollectionId: '67a627ca0007a47cd18c',
    videoCollectionId: '67a6282c003d5bd213f2',
    storageId: '67a62a11001eb61b83b8'
};

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Create a new user and save it to the database
export const createUser = async (email, password, username) => {
    try {
        // Create a new Appwrite account
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error("Failed to create account");

        // Generate avatar initials
        let avatarUrl = "";
        try {
            avatarUrl = avatars.getInitials(username);
        } catch (avatarError) {
            console.warn("Failed to generate avatar:", avatarError);
        }

        // Sign in the new user
        await signIn(email, password);

        // Save user data in the database
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error(error.message || "Unknown error occurred");
    }
};

export async function signIn(email, password) {
    try {
        await account.deleteSessions().catch(() => {}); 
        const session = await account.createEmailPasswordSession(email, password);
        
        // ✅ Зберігаємо користувача в AsyncStorage
        const user = await getCurrentUser();
        if (user) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        }

        return session;
    } catch (error) {
        console.error("Sign-in error:", error);
        throw new Error(error.message || "Failed to sign in");
    }
}

export const getCurrentUser = async () => {
    try {

        const savedUser = await AsyncStorage.getItem('user');
        
        if (savedUser) {

            return JSON.parse(savedUser);
        }

        const currentAccount = await account.get();
        if (!currentAccount) throw new Error("No authenticated user found");

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || currentUser.documents.length === 0) return null; 

        // ✅ Зберігаємо користувача для наступного запуску
        await AsyncStorage.setItem('user', JSON.stringify(currentUser.documents[0]));
        console.log("🟢 Отриманий користувач:", currentUser.documents[0]);

        return currentUser.documents[0];
    } catch (error) {
        console.warn("❌ No user found, returning null...");
        return null;
    }
};

// Create an anonymous guest session
export const createGuestSession = async () => {
    try {
        const session = await account.createAnonymousSession();
        return session;
    } catch (error) {
        console.error("Error creating guest session:", error);
        return null;
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}