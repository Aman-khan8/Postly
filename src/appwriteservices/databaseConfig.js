import config from "../config/config";
import { Client,ID,Databases, Query, Storage} from "appwrite";

class DataBaseConfig{
    client=new Client();
    database;
    storage;

    constructor(){
        this.client.setEndpoint(config.AppwriteUrl)
        .setProject(config.ProjectId)
        this.database=new Databases(this.client)
    this.storage=new Storage(this.client)
    }

    async CreatePost({title,content,status,userId,Picture}){
        try {
            return await this.database.createDocument(
                config.DataBaseId,
                config.CollectionId,
                ID.unique(),
                {
                    title,
                    Picture,
                    content,
                    status,
                    userId,
                }
            )

        } catch (error) {
            console.log("Appwrite Error :: CreatePost ",error )
            return false;
        }
    }

   async searchPost (searchedTitle){
          try {
            const result=await this.database.listDocuments(
                config.DataBaseId,
                config.CollectionId,
                [
                    Query.search("title",searchedTitle),
                    Query.equal('status','Active'),
                ]
            );
            return result;
          } catch (error) {
              console.log("Appwrite Error :: SearchPost ",error )
            return false;
          }
    }

      async getPost(ID){
          try {
            const result=await this.database.getDocument(
                config.DataBaseId,
                config.CollectionId,
                ID,
                []
            );
            return result;
          } catch (error) {
              console.log("Appwrite Error :: getpost ",error )
            return false;
          }

    }        
    
    async getPosts (){
          try {
            const result=await this.database.listDocuments(
                config.DataBaseId,
                config.CollectionId,
                []
            );
            return result;
          } catch (error) {
              console.log("Appwrite Error :: GetPosts ",error )
            return false;
          }

    }

    async updatePost(postId,{title,content,status,Picture}){ 
      try {
        return await this.database.updateDocument(
             config.DataBaseId,
             config.CollectionId,
                postId,
                {
                    title,
                    content,
                    Picture,
                    status,
                }

        )
      } catch (error) {
           console.log("Appwrite Error :: UpdatePost ",error )
            return false;
      }

    }



    async DeletePost(postID){

        try{
                return await this.database.deleteDocument(
                    config.DataBaseId,
                    config.CollectionId,
                    postID
                )
        }
        catch (error) {
           console.log("Appwrite Error :: DeletePost ",error )
            return false;
      }
    }


    // managing files

     async UploadFile(file){
        try {
            return await this.storage.createFile(
                config.BucketId,
                ID.unique(),
                file
            )
        } catch (error) {
              console.log("Appwrite Error :: UploadFile ",error)
return false;
        }
     }


         async DeleteFile(fileId){
               try {
                    return await this.storage.deleteFile(
                        config.BucketId,
                        fileId
                    )
                
               } catch (error) {
                   console.log("Appwrite Error :: DeleteFile ",error)
return false;                
               }



         }
       getFilePreview(fileId){
        return this.storage.getFileView(
            config.BucketId, // bucket ID
            fileId           // file ID
        );
    }

}

const userdatabase=new DataBaseConfig();
export default userdatabase;