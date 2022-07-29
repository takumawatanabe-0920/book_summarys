import React, { useState, useEffect, FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '..';
import {
  SummaryComment,
  ResSummaryComment,
  ResSummaryBook,
  ResultResponse,
} from '../../../types';
import { createSummaryComment } from '../../../firebase/functions';
import useAlertState from '../../hooks/useAlertState';
import { GlobalContext } from '../../hooks/context/Global';

type Props = {
  slug?: { id?: string };
  user_id: string;
  summary_book: ResSummaryBook;
};

const SummaryCommentForm: FC<Props> = (props) => {
  const { slug, user_id, summary_book } = props;
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const initialState = {
    user_id,
    user_name: currentUser.displayName ? currentUser.displayName : '',
    summary_id: summary_book.id,
    comment: '',
  };
  const [comments, setComments] = useState<SummaryComment>({
    ...initialState,
  });
  const [errorTexts, setErrorTexts] = useState<SummaryComment>({});
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const history = useNavigate();

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    event.persist();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setComments({ ...comments, [name]: value });
  };

  const validationCheck = async (): Promise<boolean> => {
    let isError = false;
    const errorText: SummaryComment = {};
    const { comment } = comments;
    if (!comment || !comment.match(/\S/g)) {
      isError = true;
      errorText.comment = 'コメントを入力してください。';
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
    const { user_id, summary_id, comment } = comments;
    if (!summary_id || !user_id) {
      return await throwAlert('danger', 'エラーが発生しました。');
    }
    if (await validationCheck()) return;
    if (window.confirm('コメントをしますか？')) {
      const resCommnet: ResultResponse<ResSummaryComment> =
        await createSummaryComment(comments);
      if (resCommnet && resCommnet.status === 200) {
        await throwAlert('success', 'コメントに成功しました。');
        history(`/`, { replace: true });
      } else {
        await throwAlert('danger', 'コメントに失敗しました。');
      }
    }
  };

  return (
    <>
      <div className="comment-form">
        <h3>投稿する</h3>
        <form className="form-table">
          <Textarea
            name="comment"
            onChange={handleTextareaChange}
            placeholder={'とてもわかりやすく要約されてますね。'}
            errorMessage={errorTexts.comment ? errorTexts.comment : ''}
          />
          <div className="btn-area mgt-2 inline">
            <button className="_btn submit" type="submit" onClick={onSubmit}>
              コメントする
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SummaryCommentForm;
