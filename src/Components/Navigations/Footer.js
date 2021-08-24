import { Box, makeStyles, } from '@material-ui/core';
import { GitHub, Facebook, Twitter, Telegram } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const footerStyle = makeStyles(theme => ({
    root: {
        position: 'absolute',
        bottom: '0',
        left:'0',
        right: '0',
        height: '80px',
    },
    navigationBox: {

    }
}))

const Footer = () => {
    /* Footer component for all paged */
    const useStyle = footerStyle(); // Declaration of the footer styles.
    return (
        <Box container component='footer' className={useStyle.root}>
            <Box container component='div' className={useStyle.navigationBox}>
                Helloworld
            </Box>
        </Box>
    )
}

export default Footer
