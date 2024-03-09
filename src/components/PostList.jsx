import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import Spinner from './Spinner';

import { API_URL } from '../config';

const PostList = () => {

    const { token } = useSelector(state => state.auth);
    // console.log(token);

    const postsApi = axios.create({
        baseURL: API_URL, 
        headers: {
            'Content-Type': 'application/json',
        },
    });

    postsApi.interceptors.request.use(config => {
        
        const accessToken = token;

        // Add the access token to the Authorization header
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
    });
    const [posts, setPosts] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);


    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await postsApi.get('/posts');
            console.log(response.data.posts);
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    useEffect(() => {

        fetchPosts();
    }, []);


    const fetchMoreData = async() => {
        try {
            const response = await postsApi.get('/posts');
            console.log(response.data.posts);
            setPosts(posts.concat(response.data.posts));
            setTotalResults(response.data.posts.length)
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return ( 
        <div className=" my-3 mt-16">
            <InfiniteScroll
                dataLength={posts?.length}
                next={fetchMoreData}
                hasMore={posts.length !== totalResults}
                loader={<Spinner/>}
            >
                {  
                    (posts?.map((post) => (
                        <div className='w-11/12 max-w-2xl mx-auto bg-green-300 p-3 m-1 rounded-md' key={post.id}>
                            <p className='font-bold text-lg'>{post.title}</p>
                            <p className='text-sm my-1'>
                                By <span className='italic'>{post.author}</span>
                            </p>
                            <p className='text-sm'>Posted On <span>{post.createdAt}</span></p>
                            <p className='mt-4 mb-2 text-lg '>{post.content}</p>
                        </div>
                    )))
                }
            </InfiniteScroll>
        </div>
    );
}

export default PostList;
