import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../..';
import { login, User } from 'src/frontend/module/user';
import useAlertState from '../../../hooks/useAlertState';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../hooks/context/Global';

const LoginForm = () => {
  const [loginValues, setLogin] = useState<Partial<User>>({});
  const [errorTexts, setErrorTexts] = useState<Partial<User>>({});
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const history = useNavigate();
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setLogin({ ...loginValues, [name]: value });
  };

  const validationCheck = async (): Promise<boolean> => {
    let isError = false;
    const errorText: Partial<User> = {};
    const { email, password } = loginValues;
    if (!email || !email.match(/\S/g)) {
      isError = true;
      errorText.email = 'メールアドレスを入力してください。';
    } else if (
      !email.match(
        /^[\w!#$%&'*+/=?^_` + "`" + `{|}~-]+(?:\.[\w!#$%&'*+/=?^_` + "`" + `{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[a-zA-Z0-9](?:[\w-]*[\w])?$/,
      )
    ) {
      isError = true;
      errorText.email = '形式が正しくありません。';
    }

    if (!password || !password.match(/\S/g)) {
      isError = true;
      errorText.password = 'パスワードを入力してください。';
    } else if (password.length < 6) {
      errorText.password = '6文字以上で入力してください。';
    } else if (!password.match(/^[0-9a-zA-Z]*$/)) {
      errorText.password = '半角英数字で入力してください。';
    }

    setErrorTexts(errorText);

    if (isError) {
      await throwAlert('danger', '入力に不備があります。');
      return isError;
    } else {
      isError = false;
      return isError;
    }
  };

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist();
    event.preventDefault();
    const { email, password } = loginValues;
    if (await validationCheck()) return;
    try {
      if (window.confirm('ログインしますか？')) {
        const user = await login({ email, password });
        if (user) {
          setCurrentUser(user);
          await throwAlert('success', 'ログインしました。');
          history(`/`, { replace: true });
        } else {
          throw new Error('ログインに失敗しました。');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        await throwAlert(
          'danger',
          'メールアドレスまたはパスワードが間違っています。',
        );
      } else if (error.status === 404) {
        await throwAlert('danger', 'ユーザーが存在しません。');
      } else {
        await throwAlert('danger', 'エラーが発生しました。');
      }
    }
  };

  return (
    <>
      <form className="form-table">
        <Input
          title="メールアドレス"
          name="email"
          placeholder="example@gmail.com"
          required={true}
          onChange={handleInputChange}
          errorMessage={errorTexts.email ? errorTexts.email : ''}
        />
        <Input
          title="パスワード"
          name="password"
          type="password"
          required={true}
          onChange={handleInputChange}
        />
        <div className="_btns">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            ログインする
          </button>
          <Link to="/sign_up" className="_btn _sub-btn">
            会員登録ページへ
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
