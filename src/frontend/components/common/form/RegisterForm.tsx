import React, { useState, useEffect, FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Input } from '../..';
import { RegisterUser } from '../../../../types';
import useAlertState from '../../../hooks/useAlertState';
import { update as updateUser, signup, User } from 'src/frontend/module/user';
import { GlobalContext } from '../../../hooks/context/Global';
import { getId } from '../../../../config/objectId';

type Props = {
  isEdit?: boolean;
  userData?: User;
};

const RegisterForm: FC<Props> = (props) => {
  const { isEdit, userData } = props;
  const [values, setValues] = useState<RegisterUser>({});
  const [errorTexts, setErrorTexts] = useState<RegisterUser>({});
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const { setCurrentUser, currentUser } = useContext(GlobalContext);
  const history = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const formatButton = () => {
    if (isEdit) {
      return (
        <button className="_btn submit" type="submit" onClick={onSubmit}>
          更新する
        </button>
      );
    } else {
      return (
        <div className="_btns">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            登録する
          </button>
          <Link to="/sign_in" className="_btn _sub-btn">
            ログインページへ
          </Link>
        </div>
      );
    }
  };

  const validationCheck = async (): Promise<boolean> => {
    let isError = false;
    const errorText: RegisterUser = {};
    const { displayName, email, password } = values;
    if (!displayName || !displayName.match(/\S/g)) {
      isError = true;
      errorText.displayName = '名前を入力してください。';
    }
    if (!isEdit) {
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
    const { displayName, email, password } = values;
    if (await validationCheck()) return;
    if (
      window.confirm(isEdit ? '会員情報を編集しますか？' : '会員登録しますか？')
    ) {
      if (isEdit) {
        try {
          const user = await updateUser(getId(currentUser), {
            email,
            password,
            displayName,
          });
          setCurrentUser(user);
          await throwAlert('success', '会員情報を更新しました。');
          history(`/`, { replace: true });
        } catch (error) {
          throwAlert('danger', '会員情報の更新に失敗しました。');
          return;
        }
      } else {
        try {
          console.log({ displayName, email, password });
          const user = await signup({
            email,
            password,
            displayName,
            // photoURL: values.photoURL,
          });
          setCurrentUser(user);
          await throwAlert('success', '会員情報に成功しました。');
          history(`/`, { replace: true });
        } catch (error) {
          if (error.message === 'user already exists') {
            throwAlert('danger', 'すでに登録されているメールアドレスです。');
          } else {
            throwAlert('danger', 'エラーが発生しました。');
          }
          return;
        }
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (isEdit) {
          const { displayName, photoURL } = userData;
          setValues({ displayName, photoURL });
        }
      } catch (e) {}
    };

    loadData();
  }, []);

  return (
    <>
      <form className="form-table">
        <Input
          title="名前"
          name="displayName"
          value={values && values.displayName ? values.displayName : ''}
          placeholder="要約太郎"
          required={true}
          onChange={handleInputChange}
          errorMessage={errorTexts.displayName ? errorTexts.displayName : ''}
        />
        {!isEdit && (
          <Input
            title="メールアドレス"
            name="email"
            value={values && values.email ? values.email : ''}
            placeholder="example@gmail.com"
            required={true}
            onChange={handleInputChange}
            errorMessage={errorTexts.email ? errorTexts.email : ''}
          />
        )}
        {!isEdit && (
          <>
            <Input
              title="パスワード"
              name="password"
              type="password"
              placeholder="六文字以上の全角半角の英数字"
              required={true}
              onChange={handleInputChange}
              errorMessage={errorTexts.password ? errorTexts.password : ''}
            />
          </>
        )}
        <div className="btn-area mgt-2 inline">{formatButton()}</div>
      </form>
    </>
  );
};

export default RegisterForm;
