const ws_url = 'ws://0.0.0.0:8000/ws/train_updates/';
//const ws_url = 'ws://104.248.23.5:8000/ws/train_updates/';

const useStyles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%'
        },
        display: "flex",
        flexDirection: 'column',
        width: '360px',
        alignItems: 'center',

    },
    forgotPassword: {
        display: 'block',
        marginTop: '25px',
        textDecoration: 'none',
        color: 'black'
    },
    loginContainer: {"marginTop":"15%", "padding-left": "15%"},
    header: {
        textAlign: 'center',
    },
    button: {
        '&:hover': {backgroundColor: '#4267b2'},
        marginTop: '40px',
        "fontSize": "20px",
        "fontWeight": "bold",
        "backgroundColor": "#4267b2",
        "padding": "5px 40px"
    },
    notchedOutline: {
        borderColor: "#4267b2 !important"
    }
});

export {ws_url, useStyles};