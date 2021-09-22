import { makeStyles, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, Avatar, Button, CircularProgress, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import supabase from '../Backend/supaBaseClient';


const HomeStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: 'center',
        // flexDirection: 'column',
        position: "relative",
        minHeight: '100vh',
        // flexDirection: 'column'
        // alignItems: 'center',
    },
    Posts: {
        width: '600px',
        [theme.breakpoints.down("620")]: {
            width: '70vw',
        }
    },
    cards: {
        margin: "10px",
        cursor: "auto",
        [theme.breakpoints.down('620')]: {
            width: '70vw',
            margin: '13px',
        }
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
        overflow: 'hidden',

    },
    avatar: {
        backgroundColor: '#ec7676',
    },
    progressive: {
        display: "flex",
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        '& button': {
            margin: '10px',
            border: '1.8px solid #00000024'
        }
    }
}))

const Home = (props) => {
    /* HomePage Component */
    const [posts, updatePosts] = useState([]) // Posts Hook
    const useStyle = HomeStyles();
    // console.log('Home: ', supabase.auth.user());
    useEffect(() => {
        document.title = 'Blogging App | Home';
        getPosts();
    }, [props.id]);

    const getPosts = async () => {
        /* This functions fetches all the posts from the supabase backend */
        try {
            const response = await supabase.from('posts').select('*, blogger_profiles(username, avatar_url)').range(0, 8); // Queries the posts and the author (foreign key)
            return updatePosts(response.data);
        } catch (err) {
            return updatePosts({'state': 'failed'});
        }
    };

    const ProgressiveLoad = () => {
        return (
            <Box container component='div' className={useStyle.progressive}>
                <CircularProgress />
                <Typography variant='p' component='p'>Loading Articles</Typography>
            </Box>
        )
    }

    const ShowMain = () => {
        console.log(supabase.auth.user());
        if (posts.length !== 0) {
            if (posts.state === 'failed') {
                return (
                    <Box container component="div" className={useStyle.progressive}>
                        <Typography>Failed to load articles</Typography>
                        <Button onClick={getPosts} variant='outlined'>Retry</Button>
                    </Box>
                )
            } else {
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
                                <CardContent className={useStyle.cardContent}>{elem.post_content.slice(0, 150)}<span style={{color: '#9e9d9d'}}>......</span></CardContent>
                                <CardActionArea><Link to={`/article/${elem.id}`} className={useStyle.cardAction}><CardActions>View Post</CardActions></Link></CardActionArea>
                            </Card>
                        )
                })}
                </Box>
                )
            }
        }
        else {
            return (
                <ProgressiveLoad />
            )
        }
            // {/* <Button>Click to load older posts</Button> */}
    };

    return (
        <Box component='div' className={useStyle.root}>
            <ShowMain />
        </Box>
    )
}

export default Home
