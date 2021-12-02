import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React, { useEffect } from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
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
  margin-bottom: 40px;
`;

const StyledRegister = styled.p`
  text-align: center;
  color: #0000FF;
  text-decoration: underline;
  margin-bottom: 16px;
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
  padding: 8px 16px;
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
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

const Register = (props) => {
    
  const changeEmail = ev => props.onChangeEmail(ev.target.value);
  const changePassword = ev => props.onChangePassword(ev.target.value);
  const changeUsername = ev => props.onChangeUsername(ev.target.value);
  const submitForm = (username, email, password) => ev => {
    ev.preventDefault();
    props.onSubmit(username, email, password);
  }

  useEffect(() => {
    return () => {
      props.onUnload();
    }
  }, []);

  const email = props.email;
  const password = props.password;
  const username = props.username;

  return (
    <StyledAuthPage>
      <StyledContainer>
          <StyledLoginForm>
          <StyledTitle>Sign Up</StyledTitle>
            <StyledRegister>
              <StyledLink to="/login">
                Уже есть аккаунт?
              </StyledLink>
            </StyledRegister>

            <ListErrors errors={props.errors} />

            <form onSubmit={submitForm(username, email, password)}>
              <fieldset>
                <StyledFlex direction={'column'} rowGap={'12px'}>
                  <StyledInputLine>
                    <StyledLabel htmlFor="text">Имя пользователя</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Username"
                      value={props.username}
                      id="text"
                      onChange={changeUsername} />
                  </StyledInputLine>

                  <StyledInputLine>
                    <StyledLabel htmlFor="email">E-mail</StyledLabel>
                    <StyledInput
                      type="email"
                      placeholder="Email"
                      value={props.email}
                      id="email"
                      onChange={changeEmail} />
                  </StyledInputLine>

                  <StyledInputLine>
                    <StyledLabel htmlFor="password">Пароль</StyledLabel>
                    <StyledInput
                      type="password"
                      placeholder="Password"
                      value={props.password}
                      id="password"
                      onChange={changePassword} />
                  </StyledInputLine>

                  <StyledButton
                    type="submit"
                    disabled={props.inProgress}>
                    Зарегистрироваться
                  </StyledButton>
                </StyledFlex>
              </fieldset>
            </form>
          </StyledLoginForm>
      </StyledContainer>
    </StyledAuthPage>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
