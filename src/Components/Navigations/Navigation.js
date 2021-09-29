import { makeStyles, Button, Toolbar, AppBar, Avatar, Box } from "@material-ui/core"; // File Components from Material UI core
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/authContext";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Register from '../Register/Register';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import Footer from "./Footer";
import ViewPost from "../Home/viewPost";
import supabase from "../Backend/supaBaseClient";


const navStyle = makeStyles(theme => ({ // Total navigation Styling
    root: {
        outline: "0",
        border: '0',
        position: 'relative',
        display: 'flex'
    },
    linkBar: {
        
    },
    blogLogo: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '1.3rem',
        '&:visited': {
            textDecoration: 'none',
            color: 'black'
        }
    },
    blogList: {
        position: "absolute",
        right: '10%'
    },
    mainLinks: {
        textDecoration: 'none',
        margin: '5px',
        color: "black",
        '&:hover': {
            color: '#3f3f3f',
        }
    },
    AuthLinks: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))


const Navigation = (props) => {
    /* Main Navigation component which will be updated if user is authenticated or not */
    const useStyle = navStyle();
    
    /* useEffect hook 👇👇 to change auth-nav-bar based on the auth query */
    useEffect(() => {
        if (supabase.auth.user() !== null) {
            setAuth(supabase.auth.user());
            console.log(checkAuth);
            IfAuthenticated();
        } else {
            setDetails('Error');
            console.log('Not still authenticated');
            IfAuthenticated();
        }

    }, [props.id])

    const [checkAuth, setAuth] = useContext(AuthContext); // Gets the user info from the Auth Context
    const [userDetails, setDetails] = useState([]);

    const NotAuthBar = () => {
        /* This is what the component should render if the user is not yet authenticated */
        return (
            <>
                <Link to='/register' className={useStyle.mainLinks}><Button variant='text'>Sign-Up</Button></Link>
                <Link to='/login' className={useStyle.mainLinks}><Button variant='text'>Login</Button></Link>
            </>
        )
    }
    
    const AuthBar = () => {
        // This is rendered when the user is authenticated
        return (
            <Box className={useStyle.AuthLinks}>
                {/* <Link to='/dashboard'><Avatar children={userDetails['username'].split('')[0]} /></Link> */}
                <Link to='/dashboard' className={useStyle.mainLinks}><Avatar>S</Avatar></Link>
                <a href='/' onClick={async () => {
                    await supabase.auth.signOut();
                    return console.log('Logged Out');
                }} className={useStyle.mainLinks}><Button variant='text'>Log-Out</Button></a>
            </Box>
        )
    }

    const IfAuthenticated = () => {
        if (userDetails === 'Error') {
            return (
                <>
                    <NotAuthBar />
                </>
            )
        } else {
            return (
                <>
                    <AuthBar />
                </>
            )
        }
    }


    return (
        <Router>
            <AppBar position='static' className={useStyle.root} variant='outlined'>
                <Toolbar className={useStyle.linkBar}>
                    <Link to='/' className={useStyle.blogLogo}>Blog</Link>
                    <Box component='div' className={useStyle.blogList}>
                        {/* {checkAuth !== null ? <AuthBar />: <NotAuthBar />} */}
                        <IfAuthenticated />
                    </Box>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path='/' exact>
                    <Home /><Footer />
                </Route>
                <Route path='/login'><Login /><Footer /></Route>
                <Route path='/register'><Register /><Footer /></Route>
                <Route path='/dashboard'><Dashboard /><Footer /></Route>
                <Route path='/article/:id' container="true"><ViewPost /><Footer /></Route>
            </Switch>
        </Router>
    )
}

export default Navigation
