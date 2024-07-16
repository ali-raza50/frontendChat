import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, Typography, Paper, Grid, TextField, Button, Box } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetState, resetPassword } from '../../redux/reducers/auth';
import { AppDispatch, RootState } from '../../redux/store';

type CSSProperties = React.CSSProperties;

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      boxShadow:
        '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
      paddingLeft: 30,
      paddingRight: 31,
      paddingTop: 61,
      paddingBottom: 21.61,
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    MuiTextFieldRoot: {
      width: '100%'
    },
    MuiFormControlRoot: {
      width: '100%'
    }
  })
);

const styles: { [key: string]: CSSProperties }  = {
  grid: {
    height: '100vh',
    maxWidth: '100%',
    flexBasis: '35%'
  },
  pt128: {
    paddingBottom: '128px',
    justifyContent: 'center '
  },
  mt30: {
    marginBottom: '30px'
    // borderColor: '#3f51b5'
  },
  mt16: {
    marginBottom: '16px'
  },
  button: {
    background: '#3f51b5',
    marginTop: '36px'
  },
  pt67: {
    marginTop: '64.59',
    marginBottom: '67px',
    color: '#000000',
    fontSize: '30px',
    textAlign: 'center',
    display: 'block'
  },
  textRight: {
    marginTop: '16px',
    display: 'block',
    color: '#201F1E',
    textAlign: 'right',
    fontSize: 14
  },
  createAccount: {
    marginTop: '26px',
    color: '#201F1E',
    textAlign: 'center',
    fontSize: 14,
    display: 'block'
  },
  color: {
    color: '#3f51b5',
    cursor: 'pointer'
  },
  textDanger: {
    color: '#ff0000'
  },
  textGreen: {
    color: '#008000'
  },
  alreadyMember: {
    marginTop: '26px',
    color: '#201F1E',
    textAlign: 'center',
    fontSize: 14,
    display: 'block'
  }
};

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [resetPasswordObject, setResetPasswordObject] = useState<{ password?: string; confirmPassword?: string }>({});
  const { err, loading, message } = useSelector((state: RootState) => state.auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResetPasswordObject(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    const newParam = new URLSearchParams(location.search);
    const token = newParam.get('token');
    if (!token) {
      dispatch(SetState({ field: 'err', value: 'Token not provided' }));
      return;
    }
  
    if (
      resetPasswordObject.password &&
      resetPasswordObject.confirmPassword &&
      resetPasswordObject.password === resetPasswordObject.confirmPassword
    ) {
      dispatch(resetPassword({ token, password: resetPasswordObject.password }));
    } else {
      dispatch(SetState({ field: 'err', value: 'Passwords do not match' }));
    }
  };

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={styles.grid}
    >
      <Grid item md={4}>
        <Box textAlign='center'>
          {/* <img src={logo} style={styles.pt128} /> */}
        </Box>  
        <Paper className={classes.paper} style={{ height: 'calc(100% - 90px)' }}>
          <Typography style={styles.pt67}>Reset Password</Typography>
          <form noValidate autoComplete='off' onSubmit={(e) => e.preventDefault()}>
            <TextField
              onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              value={resetPasswordObject.password || ''}
              name='password'
              style={styles.mt30}
              type='password'
              fullWidth={true}
              label='Password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              value={resetPasswordObject.confirmPassword || ''}
              name='confirmPassword'
              style={styles.mt30}
              type='password'
              fullWidth={true}
              label='Confirm Password'
              variant='outlined'
              onChange={handleInputChange}
            />
            {err || message ? (
              <Typography style={err ? styles.textDanger : styles.textGreen}>
                {err || message}
              </Typography>
            ) : null}
            <Button
              disabled={loading}
              fullWidth={true}
              style={styles.button}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
            >
              Reset
            </Button>
          </form>
          <Typography style={styles.alreadyMember}>
            Already a member{' '}
            <span style={styles.color} onClick={() => navigate('/auth/signin')}>
              Sign In
            </span>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
