import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, makeStyles, Typography, Backdrop, CircularProgress, Avatar } from '@material-ui/core';
import supabase from "../Backend/supaBaseClient";


const viewPostStyle = makeStyles(themes => ({
    root: {
        position: 'relative',
        minHeight: '100vh',
        margin: '10px',
    },
    articleRoot: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    articleMain: {
        width: '850px',
    },
    articleContent: {
        textAlign: 'justify',
    },
    articleHeader: {
        margin: '10px 0px',
        borderBottom: '.8px solid #00000034',
        paddingBottom: '10px',
        display: 'flex',
        alignItems: 'center'
        
    },
    articleTitle: {
        fontSize: '1.56rem',
        [themes.breakpoints.down('315')]: {
            fontSize: '1.2rem'
        }
    },
    avatar: {
        width: '65px',
        height: '65px',
        marginRight: '20px',
    }
}))

const getDate = (date) => { // Date format example: 2021-08-26T15:39:26+00:00
    let tempDate = date.slice(0, date.indexOf('T')).split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${tempDate[2]} ${months[parseInt(tempDate[1])-1]} ${tempDate[0]}`;
}

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
                <Box container component='article' className={`loaded ${useStyle.articleMain}`}>
                    <Box container component='div' className={useStyle.articleHeader}>
                        <Avatar className={useStyle.avatar}>S</Avatar>
                        <Box container component='div'>
                            <Box component='div'><Typography variant='h3' className={useStyle.articleTitle}>{currentArticle[0].title}</Typography></Box>
                            <Box component='div'><Typography variant='subtitle1'> By {currentArticle[0].blogger_profiles.username}</Typography></Box>
                            <Box component='div'><Typography variant='caption'>{getDate(currentArticle[0].inserted_at)}</Typography></Box>
                        </Box>
                    </Box>
                    <Box container component='div' className={useStyle.articleContent}>
                        {currentArticle[0].post_content}
                    </Box>
                </Box>
            )
        } else {
            console.log('Article not Loaded');
            return (
                <>
                        <Backdrop style={{color: '#0000006f', display:'flex', flexDirection: 'column', zIndex:'100'}} open >
                            <CircularProgress />
                            <Typography style={{color: 'white'}} className='loading'>Loading</Typography>
                        </Backdrop>
                </>
            )
        }
    }

    console.log(currentArticle);
    return (
        <Box component='section' className={useStyle.root}>
            <Box component='div' className={useStyle.articleRoot}>
                <CheckLoad />
            </Box>

        </Box>
    )
}

export default ViewPost
