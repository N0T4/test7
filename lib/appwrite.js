import { Avatars } from 'appwrite';
import { ID, Client, Account, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.329.aora',
    projectId: '67a6251d002a75a579a7',
    databaseId: '67a62783001aeb0f5cef',
    userCollectionId: '67a627ca0007a47cd18c',
    videoCollectionId: '67a6282c003d5bd213f2',
    storageId: '67a62a11001eb61b83b8'
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error("Failed to create account");

        const avatarUrl = avatars.getInitials(username) || ''; // Ensure it's a valid string

        await signIn(email, password);

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
        // Check if a session is already active
        const sessionList = await account.listSessions();
        if (sessionList.sessions.length > 0) {
            console.log("User is already signed in.");
            return sessionList.sessions[0]; // Return the existing session
        }

        // No active session, proceed with sign-in
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error("Sign-in error:", error);
        throw new Error(error.message || "Failed to sign in");
    }
}
