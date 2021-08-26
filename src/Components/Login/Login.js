import { useEffect, useState } from "react";
import supabase from '../Backend/supaBaseClient';
import { FormControl, FormGroup, Button, TextField, Box, makeStyles, IconButton, FormHelperText } from "@material-ui/core";
import { GitHub, Facebook } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { formStyle } from '../Register/Register';

const Form = () => {
    const useTheme = formStyle();
    const [LogDetails, updateLog] = useState({eMail: ''});
    async function signIn() {
        const { content } = await supabase.auth.signUp({
            email: LogDetails.eMail,
        });
        return console.log(content);
    };
    return (
        <Box className={useTheme.formBase}>
            <FormGroup className={useTheme.formMain}>
                <Box className={useTheme.legend}>Sign-In</Box>
                <FormControl>
                    <TextField className={useTheme.textField} variant='standard' type="e-mail" label="E-mail" onChange={(content) => {
                        updateLog({eMail: content.target.value,}) // To update the e-mail state anytime a button is pressed
                    }} />
                </FormControl>
                <Button variant='contained' color='primary' className={useTheme.button} onClick={() => {
                    signIn();
                }}>Sign-In</Button>
                <Box component='div'>Or</Box>
                <Box component='div' className={useTheme.TPButtons}>
                    <Button className={useTheme.iconsButton} disabled endIcon={<GitHub />}>Sign In with GitHub</Button>
                    <Button className={useTheme.iconsButton} disabled endIcon={<Facebook />}>Sign In with Facebook</Button>
                    <Button className={useTheme.iconsButton} endIcon={<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>} onClick={() => {
                        supabase.auth.signIn({
                            provider: 'google'
                        });
                    }}>Sign In with Google</Button>
                </Box>
                    <Box className={useTheme.anchor} component='div'>Not Registered? <Link to='/register'>Sign-Up Here</Link></Box>
            </FormGroup>
        </Box>
    )
}

const Login = () => {
    const useStyle = formStyle();
    useEffect(() => {
        document.title = 'Blogging App | Login';
    });
    return (
        <Box component='section' className={useStyle.main}>
            <Form />
        </Box>
    )
}

export default Login
