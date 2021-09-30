import React, {useEffect, useState, useContext } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import supabase from  '../Backend/supaBaseClient';
import { Box, makeStyles, Avatar, Button, IconButton, Typography, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { AuthContext } from '../Contexts/authContext';

/* 
    What's remaining?
        - Make the Post Article Button active.
        - Get recent Posts.
*/  
const dashStyle = makeStyles(themes => ({
    root: {
        position: 'relative',
        minHeight: "100vh",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    newPostEditor: {
        width: '100%',
    },
    newSection: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '5px',
    },
    prevPost: {
        margin: "20px",
        width: '80%',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
    },
    recentTitle: {
        justifySelf: 'flex-start',
        fontSize: '1.74rem',
    },
    textField: {
        width: '600px',
        margin: '10px',
    },
    textDiv: {
        display: 'flex',
        alignItems: 'center',
        margin: '25px',
    }
}));

const Dashboard = (props) => {
    /* What the dashboard should contain for authenticated users (bloggers):
        Link to Create Posts.
        Lists for posts the user has created (with CRUD functions available for the users).
    */
    useEffect(() => {
        document.title = 'Blogging App | DashBoard';
        // getPosts();
    }, [props.id]);

    const [user, setUser] = useContext(AuthContext); // Gets the authenticated user information globally
    const [userArticles, updateArticles] = useState([]); // Shows the list of articles posted by user
    const [postingData, changeData] = useState({
        title: '',
        content: ""
    }); // The current article user wants to post. This will be updated based on change from the user's Article editor
    const [infoState, changeState] = useState('Undecided'); // Shows the state if the user's article was posted successfully or not

    const useStyle = dashStyle();
    
    // const getPosts = async () => {
    //     if (user.id !== null) {
    //         try {
    //             const response = await supabase.from('posts')
    //                 .select('*')
    //                 .is('posted_by', user.id)
    //                 .range(0, 8); // Queries the posts and the author (foreign key)
    //             return updateArticles(response.data);
    //         } catch (err) {
    //             return updateArticles({'state': 'failed'});
    //         }
    //     } else {
    //         return
    //     }
    // }

    const sendPosts = async () => {
        if (user !== null) {
            try {
                await supabase.from('posts')
                .insert([
                    { title: postingData.title, post_content: postingData.content, posted_by: user.id },
                ]);
                console.log('Sent');
                return changeState('Success');
            }
            catch(err) {
                console.log('Failed to send due to network error');
                return changeState('Failed');
            }
        } else {
            return console.log('Could not send due to not being authenticated');
        }
    }

    // const ArticleShow = () => {      // Another project coming soon
    //     return (
    //         <>
    //         </>
    //     )
    // }

    return (
        <Box className={useStyle.root}>
            <Box component='section' className={useStyle.newSection}>
                <Box className={useStyle.newPostEditor}>
                    <Typography variant='h4' style={{borderBottom: '1px solid #00000026', margin: '30px', padding: '10px', width:'80%'}}>Create a new Post</Typography>
                    <Box container component='div' className={useStyle.textDiv}>
                        <Typography component='label'style={{
                            margin: '10px',
                            fontSize: '1.4rem',
                        }}>Title: </Typography>
                        <TextField variant='outlined' required className={useStyle.textField} label='Required' onChange={(elem)=>{
                            changeData({title: elem.target.value, content: postingData.content});
                        }}/>
                    </Box>
                    <Box container component='div' className={useStyle.textDiv} style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography component='label' style={{
                            margin: '10px',
                            fontSize: '1.4rem',
                        }}>Content: </Typography>
                        <Box container component='section' style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Box item component='div' style={{width: "90%"}}>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    onChange={ ( event, editor ) => {
                                        changeData({
                                            title: postingData.title, 
                                            content: editor.getData()
                                        });
                                    } }
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                    <Button style={{margin: '20px'}} endIcon={<SendIcon />} variant='contained' color='primary'
                        onClick={()=> {
                            console.log(`Post Title: ${postingData.title}, Post content:${postingData.content}`);
                            // if (postingData.title === '' || postingData.content === "") {
                            // }
                            sendPosts();
                        }}
                    >Post Article</Button>
            </Box>
            {/* <Box component='section' className={useStyle.prevPost}>
                <Typography variant='h4' className={useStyle.recentTitle} style={{borderBottom: '1px solid #00000026', margin: '30px', padding: '10px', width:'80%'}}>Your Recent Articles Posted</Typography>
                <ArticleShow />
            </Box> */}
        </Box>
    );
}

export default Dashboard

