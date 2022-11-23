import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { selectIsAuth, logout } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <img className={styles.logo__img} src='/logo.svg' alt="Логотип" />
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained"
                    startIcon={<ArticleOutlinedIcon className={styles.button__icon} />} >
                    <span className={styles.button__text}>
                      Написать статью
                    </span>
                  </Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" startIcon={<ExitToAppOutlinedIcon className={styles.button__icon} />} color="error">
                  <span className={styles.button__text}>
                    Выйти
                  </span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" startIcon={<InputOutlinedIcon className={styles.button__icon} />}>
                    <span className={styles.button__text}>
                      Войти
                    </span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon className={styles.button__icon} />}>
                    <span className={styles.button__text}>
                      Создать аккаунт
                    </span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
