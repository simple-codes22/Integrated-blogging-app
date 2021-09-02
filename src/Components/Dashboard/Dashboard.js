import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { useState } from "react";
import { Box, makeStyles } from '@material-ui/core';

const dashStyle = makeStyles(themes => ({
    root: {
        position: 'relative',
        minHeight: "100vh",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    newPostEditor: {
        width: ''
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
            <Box className={useStyle.newPostEditor}>
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Write your posts here</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </Box>
        </Box>
    );
}

export default Dashboard

