import React from 'react';
import { MyButton } from '../UI/MyButton';
import { MyInput } from '../UI/MyInput';

export function Login() {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1>Страница для логина</h1>
      <form>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
}
