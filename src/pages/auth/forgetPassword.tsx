import React, { useState, ChangeEvent, FormEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetState, SendEmail } from '../../redux/reducers/auth';
import { AppDispatch, RootState } from '../../redux/store';

interface ForgetPasswordObject {
  email: string;
}

type CSSProperties = React.CSSProperties;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      boxShadow:
        '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
      paddingLeft: 20,
      paddingRight: 31,
      paddingTop: 61,
      paddingBottom: 21.61,
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
);

const styles: { [key: string]: CSSProperties } = {
  grid: {
    height: '100vh'
  },
  pt67: {
    marginTop: '64.59',
    marginBottom: '67px',
    color: '#000000',
    fontSize: '36px',
    textAlign: 'center',
    display: 'block'
  },
  resetPassword: {
    marginBottom: '23px',
    color: '#201F1E',
    fontSize: '14px',
    textAlign: 'center',
    display: 'block'
  },
  mt30: {
    marginBottom: '30px'
  },
  button: {
    background: '#3f51b5',
    marginTop: '26px'
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
  }
};

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [forgetPasswordObject, setForgetPasswordObject] = useState<ForgetPasswordObject>({ email: '' });
  const classes = useStyles();
  const { err, emailSent, message, loading } = useSelector((state: RootState ) => state.auth);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForgetPasswordObject({
      ...forgetPasswordObject,
      [name]: value
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (forgetPasswordObject.email) {
      dispatch(SendEmail(forgetPasswordObject.email));

    } else {
      dispatch(SetState({ field: 'err', value: 'please enter email' }));
    }
  };

  return (
    <Grid container direction='row' justify='center' alignItems='center' style={styles.grid}>
      <Grid item md={4}>
        <Box textAlign='center'>
          {/* <img src={logo} style={styles.pt128} /> */}
        </Box>
        <Paper className={classes.paper}>
          <small style={styles.pt67}>Reset your password</small>
          <small style={styles.resetPassword}>
            Enter your email below to reset your password.
          </small>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSubmit(e);
              }}
              value={forgetPasswordObject.email}
              style={styles.mt30}
              name='email'
              type='text'
              fullWidth={true}
              label='Email Address'
              variant='outlined'
              onChange={handleInputChange}
            />
            {err || emailSent ? (
              <small style={err ? styles.textDanger : styles.textGreen}>
                {err || message}
              </small>
            ) : (
              ''
            )}
            <Button
              disabled={loading}
              fullWidth={true}
              style={styles.button}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
            >
              Send
            </Button>
          </form>
          <small style={styles.createAccount}>
            Go back to{' '}
            <span style={styles.color} onClick={() => navigate('/auth/signin')}>
              Sign in{' '}
            </span>
          </small>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
