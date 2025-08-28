import React, { useCallback, useEffect, useState } from 'react'
import RTE from './RTE'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import userdatabase from '../appwriteservices/databaseConfig'
import Input from './Input'
import Button from './Button'

function PostForm({post}) {
    const userData=useSelector((state)=>state.userData);

 
  const   navigate=useNavigate()


    const {register,handleSubmit,watch,setValue,getValues,control,reset}=useForm(
        {
            defaultValues:{
                 title:post?.title || "",
                 slug:post?.$id||"",
                 status: post?.status||"active",
                  content: post?.content||""
    }})
     const imageFile=watch('image'); 
    async function submit(data){
      
        if(post)
            {
                
                console.log('h1',post.Picture,data);
            const file = data.image[0]?await userdatabase.UploadFile(data.image[0]):await userdatabase.UploadFile(post.Picture);
            if (file){
                console.log('h2',file)
             await userdatabase.DeleteFile(post.Picture)
            
            const dbPost=await userdatabase.updatePost(post.$id,{
                ...data,
                Picture: file?file.$id :null
            
            })
              if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }            
         }
         else{
          
            const file=await userdatabase.UploadFile(data.image[0])

            if(file){
                    
                const fileId=file.$id
                data.Picture=fileId
                const dbPost=await userdatabase.CreatePost({...data,
                    userId: userData.$id })
            
            if(dbPost){
                    
                navigate(`/post/${dbPost.$id}`)
            }
        }  
         }
         
    } 
    const slugTranformation=useCallback((value)=>{
        if(value && typeof value==="string"){
            return  value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return ""
    },[])

   
useEffect(() => {
  if (post) {
    const slugTitle=slugTranformation(post.title);
    reset({
      title: post.title || "",
      slug: slugTitle || "",
      status: post.status || "active",
      content: post.content || "",
    });
  }
}, [post?post.$id:null]);


useEffect(() => {
  const subscription = watch((value, { name }) => {
    if (name === "title") {
      setValue("slug", slugTranformation(value.title), { shouldValidate: true });
    }
  },[]);

  return () => subscription.unsubscribe();
}, [watch, slugTranformation, setValue]);


    return (
    <>
    <div className='w-full min-h-full'> 
           <form onSubmit={handleSubmit(submit)}
           className='flex flex-wrap h-[90%]'>
            <div className='w-[60%] px-2'>

            <div> 
            <Input 
            label='tittle'
            type='text'
            placeholder='Tittle'
            className='mb-4 rounded-lg'
            {...register('title',{
                required:true
            })}/>
</div>
<div> 
            <Input
            label='slug'
            type='text'
            placeholder='Slug'
            className='mb-4 rounded-lg'
            {...register('slug',{
                required:true
            })}
            onInput={(e)=>{
                setValue('slug',slugTranformation(e.currentTarget.value),{shouldValidate:true})
            }}
            />
            </div>
            

            </div>
            

             <div className="w-[40%] px-2 h-full">
            { post &&<p className='text-red-500 sm:text-sm text-xs'>You have to enter picture again</p>}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 rounded-lg"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4 ml-4">
                        <img
                            src={userdatabase.getFilePreview(post.Picture? post.Picture:null)}
                            alt={post.title}
                            className="rounded-lg sm:w-[25%]"
                        />
                    </div>
                )
            
                }
                
                <div className='sm:w-[20%]  ' > 
                <Button type={imageFile && imageFile.length>0?"submit":'button'} bgColor={imageFile && imageFile.length>0?'bg-green-500':'bg-gray-500'} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
                
                </div>
            </div>
            <div className='w-[80%] sm:w-[60%]'> 
            <RTE control={control} label="Content: " name='content'  />
            </div>
            </form>   
            </div> 
    </>
  )
}

export default PostForm