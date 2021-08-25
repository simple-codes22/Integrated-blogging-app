import { useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";

const loginStyle = makeStyles(themes => ({
    root: {
        position: 'relative',
        minHeight: '100vh',
    }
}))

const Login = () => {
    const useStyle = loginStyle();
    useEffect(() => {
        document.title = 'Blogging App | Login';
    })
    return (
        <Box component="div" className={useStyle.root}>
            
        </Box>
    )
}

export default Login
