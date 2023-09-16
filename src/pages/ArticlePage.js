// localhost:3000/articles/learn-node
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";
import CommentsList from '../components/CommentsList';

const ArticlePage = () => {
    // const params = useParams();
    // const articleId  = params.articleId;
    // const articleId  = params;
    const [articlesInfo, setArticleInfo ] = useState( {upvotes: 0, comments: []});
    const { articleId } = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo( newArticleInfo );
        }
        loadArticleInfo();
    }, []);

    const article = articles.find(article => article.name === articleId);

    if(!article) {
        return <NotFoundPage />
    } 
    
    return (
        <>
            <h1>{article.title}</h1>
            <p>This article had {articlesInfo.upvotes} upvote(s).</p>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <CommentsList comments={ articlesInfo.comments }></CommentsList>
        </>
    );
}

export default ArticlePage;