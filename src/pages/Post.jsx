import React, { useEffect, useState } from 'react'
import userdatabase from '../appwriteservices/databaseConfig'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import parse from "html-react-parser";
import Button from '../components/Button';
import Loader from '../components/Spinner';

function PostPage() {
  const [post, setPost] = useState(null)
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData)
  const isAuthor = post ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      userdatabase.getPost(slug).then((p) => {
        if (p) setPost(p);
        else navigate("/");
      })
    } else {
      navigate('/');
    }
  }, [slug])

  const url = post ? userdatabase.getFilePreview(post.Picture) : null;

  return post ? (
    <div className="py-6 flex justify-center px-4 sm:px-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <div className="w-full max-w-md mb-4 relative border rounded-xl p-2">
            <img
              src={url}
              alt={post.title}
              className="rounded-xl w-full h-[250px] sm:h-[350px] md:h-[400px] "
            />
          </div>

          {isAuthor && (
            <div className="flex gap-3 w-full max-w-md px-2">
              <Link
                to={`/editpost/${post.$id}`}
                className="flex-1 py-3 px-5 bg-emerald-500 text-white text-center rounded-2xl"
              >
                Edit
              </Link>

              <Button
                bgColor="bg-red-500"
                textColor="text-white"
                className="flex-1"
                onClick={() => {
                  userdatabase.DeletePost(post.$id)
                  navigate('/');
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="md:w-1/2 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h1>
          <div className="prose max-w-none">
            {parse(post.content ? post.content : '')}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='w-full h-[60vh] bg-white flex justify-center items-center'>
      <Loader />
    </div>
  )
}

export default PostPage
