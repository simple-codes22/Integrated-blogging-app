import { makeStyles, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import supabase from '../Backend/supaBaseClient';

const HomeStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    Posts: {
        width: '600px',
    },
    cards: {
        margin: "10px",
        cursor: "auto"
    },
    cardTitle: {},
    cardAction:{
        '&:link, &:visited, &:active': {
            textDecoration: 'none',
            color: '#4d12d8a4',
            fontWeight: '600',
            fontSize: '.8rem',
        }
    },
    cardContent: {
        color: '#000000b2',
        fontSize: '14px',
        overflow: 'hidden'
    },
    avatar: {
        backgroundColor: '#ec7676',
    }
}))

const Home = (props) => {
    /* HomePage Component */
    const [posts, updatePosts] = useState([]) // Posts Hook
    const useStyle = HomeStyles();
    
    useEffect(() => {
        document.title = 'Blogging App | Home'
        getPosts();
    }, [props.id]);

    const getPosts = async () => {
        /* This functions fetches all the posts from the supabase backend */
        const response = await supabase.from('posts').select('*, blogger_profiles(username, avatar_url)'); // Queries the posts and the author (foreign key)
        return updatePosts(response.data);
    };
    console.log(posts);
    const ShowMain = () => {
        return (
            <Box component='section' className={useStyle.Posts}>
            {posts.map(elem => {
                return (
                    <Card key={elem.id} className={useStyle.cards}>
                        <CardHeader 
                            title={elem.title} 
                            subheader={`By ${elem.blogger_profiles.username}`}
                            avatar={elem.blogger_profiles.avatar_url ? <Avatar src={elem.blogger_profiles.avatar_url} alt={elem.blogger_profiles.username.capitalize()} /> : <Avatar className={useStyle.avatar}>{elem.blogger_profiles.username.split('')[0].toUpperCase()}</Avatar>}
                            // Please ignore this statement 👆👆
                         />  {/* You can also put the avatar props, actions, subheader */}
                        <CardContent className={useStyle.cardContent}>{elem.post_content.slice(0, 150)}</CardContent>
                        <CardActionArea><Link to='/' className={useStyle.cardAction}><CardActions>View Post</CardActions></Link></CardActionArea>
                    </Card>
                )
            })}
            </Box>
        )
    };

    return (
        <Box component='div' className={useStyle.root}>
            <ShowMain />
        </Box>
    )
}

export default Home
