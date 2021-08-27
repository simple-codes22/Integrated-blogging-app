import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, makeStyles, Typography } from '@material-ui/core';
import supabase from "../Backend/supaBaseClient";


const viewPostStyle = makeStyles(themes => ({
    root: {
        position: 'relative',
        minHeight: '100vh',
    }
}))

const ViewPost = (props) => {
    const useStyle = viewPostStyle();

    let { id } = useParams();

    const [currentArticle, newArticle] = useState([]);
    
    useEffect(() => {
        getArticle();
    }, [props.id])
    
    useEffect(() => {
        if (currentArticle.length !== 0) {
            document.title = currentArticle[0].title;
        } else {
            document.title = 'Blogging App | Article';
        }
    }, [currentArticle]);
    
    const getArticle = async () => { // Gets the article clicked on
        const data = await supabase.from('posts').select("*, blogger_profiles(username)").eq('id', id);
        return newArticle(data.data);
    }
    
    const CheckLoad = () => {
        if (currentArticle.length !== 0) {
            console.log('Article Loaded');
            return (
                <Box container component='article'>
                    <Box container component='div'>
                        <Box component='div'><Typography variant='h3'>{currentArticle[0].title}</Typography></Box>
                        <Box component='div'><Typography variant='subtitle1'> By {currentArticle[0].blogger_profiles.username}</Typography></Box>
                        <Box component='div'><Typography variant='caption'>Posted at {currentArticle[0].inserted_at}</Typography></Box>
                    </Box>
                    <Box container component='div'>
                        {currentArticle[0].post_content}
                    </Box>
                </Box>
            )
        } else {
            console.log('Article not Loaded');
            return (
                <>
                </>
            )
        }
    }

    console.log(currentArticle);
    return (
        <Box component='section' className={useStyle.root}>
            <Box component='div'>
                <CheckLoad />
            </Box>
        </Box>
    )
}

export default ViewPost
