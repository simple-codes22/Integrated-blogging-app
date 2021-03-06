import { Box, makeStyles, Typography } from '@material-ui/core';
import { GitHub, Facebook, Twitter, LinkedIn } from '@material-ui/icons';
// import { BrowserRouter, Link } from 'react-router-dom';

const footerStyle = makeStyles(theme => ({
    root: {
        position: 'relative',
        bottom: '0',
        left:'0',
        right: '0',
        height: '150px',
        background: '#080808f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        flexDirection: 'column'
    },
    current: {
        fontSize: '.83rem',
        color: '#ffffff92',
        cursor: 'default',
    },
    iconNavs: {
        '& svg': {
            fill: '#ffffff61',
            margin: '10px',
            cursor: 'pointer',
        },
        '& svg:hover': {
            fill: '#ffffffd5'
        }
    }
}))

const Footer = () => {
    /* Footer component for all paged */
    const useStyle = footerStyle(); // Declaration of the footer styles.
    return (
        <Box container component='footer'  className={`footer ${useStyle.root}`}>
            <Box container component='div' className={useStyle.iconNavs}>
                <a href="https://github.com/simple-codes22"><GitHub /></a>
                <a href="https://facebook.com/"><Facebook /></a>
                <a href="https://twitter.com/simple-codes22"><Twitter /></a>
                <a href="https://linkedin.com/in/simple-codes22"><LinkedIn /></a>
            </Box>
            <Box component='div' title='Production Made In 2021' className={useStyle.current}>@2021</Box>
        </Box>
    )
}

export default Footer
