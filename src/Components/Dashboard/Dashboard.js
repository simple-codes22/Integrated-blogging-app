import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { useState } from "react";
import { Box, makeStyles, Avatar, Button, IconButton, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

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
        width: "800px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '5px',
    },
    prevPost: {
        margin: "20px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
}));

const Dashboard = () => {
    /* What the dashboard should contain for authenticated users (bloggers):
        Link to Create Posts.
        Lists for posts the user has created (with CRUD functions available for the users).
    */
   const useStyle = dashStyle();
    return (
        <Box className={useStyle.root}>
            <Box component='section' style={{borderBottom: '1px solid #00000026'}} className={useStyle.newSection}>
                <Box className={useStyle.newPostEditor}>
                    <Typography variant='h3' style={{borderBottom: '1px solid #00000026', margin: '30px', padding: '10px'}}>Create a new Post</Typography>
                    <CKEditor
                        editor={ ClassicEditor }
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log(data);
                        } }
                    />
                </Box>
                <Button style={{margin: '20px'}} endIcon={<SendIcon />} variant='contained' color='primary'>Post Article</Button>
            </Box>
            <Box component='section' className={useStyle.prevPost}>
                <Typography variant='h4' style={{justifySelf: 'flex-start'}}>Your Recent Articles Posted</Typography>
            </Box>
        </Box>
    );
}

export default Dashboard

