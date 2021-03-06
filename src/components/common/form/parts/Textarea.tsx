import React, { FC } from 'react';

type Props = {
  title?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea: FC<Props> = (props) => {
  const { title, required, value, placeholder, name, onChange, errorMessage } =
    props;
  return (
    <>
      <dl className="form-group">
        <dt>
          <label>
            {title}
            {required && <span className="req">必須</span>}
            {errorMessage && <p className="_error-message">{errorMessage}</p>}
          </label>
        </dt>
        <dd>
          <textarea
            value={value}
            name={name}
            className="form-control textarea"
            onChange={onChange}
          />
          {placeholder && <p className="_example-form">例）{placeholder}</p>}
        </dd>
      </dl>
    </>
  );
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
