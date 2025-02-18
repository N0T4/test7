import { Avatars, Query } from 'appwrite';
import { ID, Client, Account, Databases } from 'react-native-appwrite';

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

// Sign in an existing user
export async function signIn(email, password) {
    try {
        // Ensure any previous sessions are cleared before signing in
        await account.deleteSessions().catch(() => {}); 

        // Attempt to sign in the user
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.error("Sign-in error:", error);
        throw new Error(error.message || "Failed to sign in");
    }
}

// Fetch the currently logged-in user
export const getCurrentUser = async () => {
    try {
        // Get the authenticated Appwrite account
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error("No authenticated user found");

        // Fetch user data from the database
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || currentUser.documents.length === 0) return null; 

        return currentUser.documents[0];
    } catch (error) {
        console.warn("No user found, creating guest session...");
        return await createGuestSession(); // Automatically create a guest session
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

// Sign out the user
export const signOut = async () => {
    try {
        await account.deleteSessions();
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out:", error);
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