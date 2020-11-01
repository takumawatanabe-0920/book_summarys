import React, { useState, useEffect } from "react"
import Input from "./parts/Input"
import { User } from "../../../types/user"
import functions from "../../../utils/functions"
const { register } = functions

const RegisterForm = () => {
  const [values, setValues] = useState<User>({})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    const { displayName, email, password, photoURL } = values
    if (!displayName || !email || !password) {
      console.log("名前とパスワードとメールを入力してください")
      return
    }
    if (window.confirm("会員登録しますか？")) {
      register(email, password, displayName, photoURL)
    }
  }

  return (
    <>
      <form className="form-table">
        <Input
          title="名前"
          name="displayName"
          placeholder="要約太郎"
          required={true}
          onChange={handleInputChange}
        />
        <Input
          title="ユーザーアイコン"
          name="photoURL"
          onChange={handleInputChange}
        />
        <Input
          title="メールアドレス"
          name="email"
          placeholder="example@gmail.com"
          required={true}
          onChange={handleInputChange}
        />
        <Input
          title="パスワード"
          name="password"
          type="password"
          required={true}
          onChange={handleInputChange}
        />
        <div className="btn-area mgt-2 inline">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            登録する
          </button>
        </div>
      </form>
    </>
  )
}

export default RegisterForm