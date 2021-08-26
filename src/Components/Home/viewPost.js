import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, makeStyles } from '@material-ui/core';
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
    const getArticle = async () => { // Gets the article clicked on
        let data = await supabase.from('posts').select("*").eq('id', id);
        return newArticle(data.data);
    }

    useEffect(() => {
        console.log(id);
        getArticle();
        console.log(currentArticle);
    }, [props.id])
    return (
        <Box component='div' className={useStyle.root}>

        </Box>
    )
}

export default ViewPost
