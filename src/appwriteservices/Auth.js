import { retry } from "@reduxjs/toolkit/query";
import config from "../config/config";
import { Client,Account,ID, Query } from "appwrite";
class Authentication{
     client=new Client();
     account;
     
     constructor(){
        this.client.setEndpoint(config.AppwriteUrl)
        
        this.client.setProject(config.ProjectId)
     
        this.account=new Account(this.client)


   
     }

     async Login({email,password}){
        try {
          return  await this.account.createEmailPasswordSession(email,password)

        } catch (error) {
            
            console.log("Apprwrite error :: login ",error)
throw error;
        }
     }

     async SignUp({email,password,name}){
        try {
        const user= await this.account.create(ID.unique(),email,password,name)
            
          const session= await this.Login({email,password});
          return {user,session};
        } catch (error) {
             console.log("Apprwrite error :: SignUp ",error)
             throw error;
        }

     }

async ForgotPassword({email,pathUrl}){
try {
   return await this.account.createRecovery(email,pathUrl)
} catch (error) {
    console.log("Apprwrite error :: ForgotPassword ",error)
}

}

async UpdatingPassword({userId,secert,password}){
    
    try {
        return await this.account.updateRecovery(userId,secert,password)
    } catch (error) {
        console.log("Apprwrite error :: UpdatingPassword ",error)
    }
}


           async Logout(){
            try {
                return await this.account.deleteSession('current')
            } catch (error) {
                 console.log("Apprwrite error :: Logout ",error)
            }
           }

             async LogoutAll(){
            try {
                return await this.account.deleteSessions()
            } catch (error) {
                 console.log("Apprwrite error :: LogoutAll ",error)
            }
           }

        async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

  


}

const userAuthenication=new Authentication();
export default userAuthenication