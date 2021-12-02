import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React, { useEffect } from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

import styled from 'styled-components';

const StyledAuthPage = styled.div`
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'start'};
  row-gap: ${({ rowGap }) => rowGap || '0' };
  column-gap: ${({ colGap }) => colGap || '0'};
`;

const StyledContainer = styled.div`
  max-width: 1108px;
  margin: 0 auto;
  padding-top: 48px;
`;

const StyledLoginForm = styled.div`
  max-width: 540px;
  margin: 0 auto;
`;

const StyledTitle = styled.h1`
  text-align: center;
`;

const StyledRegister = styled.p`
  text-align: center;
  color: #0000FF;
  text-decoration: underline;
`;

const StyledLink = styled(Link)`
  color: #0000FF;
`;

const StyledInputLine = styled.fieldset`
  margin-bottom: 0;
  position: relative;

  ${({ after }) => after && 
  `&::after{
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: center no-repeat url(${after});
    position: absolute;
    right: 17px;
    bottom: 8px;
  }`}
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 8px;
  color: #62626A;
  background-color: #F4F4F6;
  border: none;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,.08), inset 0 0 1px 0 rgba(0,0,0,.12);

  &::placeholder {
    color: #62626A;
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
  padding-left: 16px;
`;

const StyledButton = styled.button`
  font-size: 16px;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 8px 36.5px;
  background-color: #0000FF;
  align-self: end;
  margin-top: 28px;
`;

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

const Login = (props) => {
  const changeEmail = ev => props.onChangeEmail(ev.target.value);
  const changePassword = ev => props.onChangePassword(ev.target.value);
  const submitForm = (email, password) => ev => {
    ev.preventDefault();
    props.onSubmit(email, password);
  };

  useEffect(() => {
    return () => {
      props.onUnload();
    }
  }, []);

  const email = props.email;
  const password = props.password;

  return (
    <StyledAuthPage>
      <StyledContainer>
          <StyledLoginForm>
            <StyledTitle>Войти</StyledTitle>
            <StyledRegister>
              <StyledLink to="/register">
                Хотите создать аккаунт?
              </StyledLink>
            </StyledRegister>

            <ListErrors errors={props.errors} />

            <form onSubmit={submitForm(email, password)}>
              <fieldset>
                <StyledFlex direction={'column'} rowGap={'12px'}>
                  <StyledInputLine>
                    <StyledLabel htmlFor="email">E-mail</StyledLabel>
                    <StyledInput
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      id="email"
                      onChange={changeEmail}/>
                  </StyledInputLine>

                  <StyledInputLine after={'../images/red.png'}>
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <StyledInput
                      type="password"
                      placeholder="Password"
                      value={password}
                      id="password"
                      onChange={changePassword} />
                  </StyledInputLine>
                  <StyledButton
                    type="submit"
                    disabled={props.inProgress}>
                    Войти
                  </StyledButton>
                </StyledFlex>
              </fieldset>
            </form>
          </StyledLoginForm>
      </StyledContainer>
    </StyledAuthPage>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
