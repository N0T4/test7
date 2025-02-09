import {ID,Account,Client } from 'react-native-appwrite';
export const config ={
    endpoint: 'https//cloud.appwrite.io/v1',
    platform: 'com.329.aora',
    projectId: '67a6251d002a75a579a7',
    databaseId: '67a62783001aeb0f5cef',
    userCollectionId: '67a627ca0007a47cd18c',
    videoCollectionId: '67a6282c003d5bd213f2',
    storageId: '67a62a11001eb61b83b8'
}

const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);

export const createUser =()=>{
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}


