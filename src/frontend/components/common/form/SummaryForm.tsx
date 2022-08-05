import React, { useState, useEffect, FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Textarea, Select } from '../..';
import {
  update as updateSummary,
  create as createSummary,
  Summary,
  publishingSettings,
} from 'src/frontend/module/summary';
import useAlertState from '../../../hooks/useAlertState';
import { RichEditor, ReadOnlyEditor } from '../../../../utils/richtext';
import { GlobalContext } from '../../../hooks/context/Global';
import { getId } from 'src/config/objectId';
import { categories } from 'src/config/data/category';
import { subCategories } from 'src/config/data/subCategory';
type Props = {
  isEdit?: boolean;
  summary?: Summary;
};

const SummaryForm: FC<Props> = (props) => {
  const { isEdit, summary } = props;
  const [values, setValues] = useState<Partial<Summary>>({});
  const [selectSubCategories, setSelectSubCategories] =
    useState<any>(subCategories);
  const [isSelectCategory, setIsSelectCategory] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [errorTexts, setErrorTexts] = useState<Partial<Summary>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const { currentUser } = useContext(GlobalContext);
  const history = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    event.persist();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const handleSelectCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    event.persist();
    const value = event.target.value;
    setValues({ ...values, category: value });
    setIsSelectCategory(true);
    subCategorySelect(value);
  };

  const handleEditorChange = (value: any) => {
    setValues({ ...values, content: value });
  };

  const subCategorySelect = async (categoryId?: string) => {
    try {
      const filterdSubCategories = subCategories.filter(
        (subCategory) => subCategory.category === categoryId,
      );
      setSelectSubCategories([...filterdSubCategories]);
    } catch (e) {
      console.error({ e });
      await throwAlert('danger', 'エラーが発生しました。');
    }
  };

  const onTogglePreview = (event: React.MouseEvent) => {
    event.persist();
    event.preventDefault();
    setIsPreview(!isPreview);
  };

  const validationCheck = async (): Promise<boolean> => {
    let isError = false;
    const errorText: Partial<Summary> = {};
    const {
      title,
      content,
      category,
      discription,
      bookName,
      publishingStatus,
    } = values;
    if (!title || !title.match(/\S/g)) {
      isError = true;
      errorText.title = '記事のタイトルを入力してください。';
    }

    if (!bookName || !bookName.match(/\S/g)) {
      isError = true;
      errorText.bookName = '本のタイトルを入力してください。';
    }

    if (!discription || !discription.match(/\S/g)) {
      isError = true;
      errorText.discription = 'リード文を入力してください。';
    } else if (discription.length < 20) {
      errorText.discription = '20文字以上で入力してください。';
    }
    if (!content || !content.match(/\S/g)) {
      isError = true;
      errorText.content = '本の内容を入力してください。';
    } else if (content) {
      let count = 0;
      const blocks = JSON.parse(content).blocks;
      blocks.forEach((block: any) => {
        if (!block.text) return;
        count += block.text.length;
      });
      if (count < 50) {
        errorText.content = '50文字以上で入力してください。';
      }
    }
    if (!category) {
      isError = true;
      errorText.category = '本のカテゴリーを設定してください。';
    }
    if (!publishingStatus) {
      isError = true;
      errorText.publishingStatus = 'この記事の公開設定をしてください。';
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
    if (await validationCheck()) return;
    if (
      window.confirm(isEdit ? '修正分を反映しますか？' : '記事を作成しますか？')
    ) {
      try {
        if (isEdit) {
          await updateSummary(getId(summary), values);
          history(`/summary/${getId(summary)}`);
        } else {
          const createdSummary = await createSummary(values);
          history(`/summary/${getId(createdSummary)}`);
        }
        await throwAlert(
          'success',
          isEdit ? '記事が編集されました。' : '記事が作成されました。',
        );
      } catch (error) {
        await throwAlert('danger', error.message);
      } finally {
        setValues({});
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (isEdit && Object.keys(summary).length > 0) {
          subCategorySelect(summary.category);
          setIsSelectCategory(true);
          subCategorySelect(summary.category?.id || summary.category);
          setValues({
            ...summary,
            user: getId(currentUser),
          });
        } else {
          setValues({
            ...values,
            user: getId(currentUser),
          });
        }
        setLoading(true);
      } catch (e) {
        console.error({ e });
      }
    };

    loadData();
  }, [isEdit, summary]);

  return (
    <>
      {loading && (
        <>
          {isPreview && (
            <>
              <h2 className="main-title blue-main-title blue-back">
                プレビュー画面
              </h2>
              {values.content && (
                <ReadOnlyEditor editorState={values.content} />
              )}
            </>
          )}
          <form className="form-table">
            {!isPreview && (
              <>
                <h2 className="main-title blue-main-title blue-back">
                  記事編集画面
                </h2>
                <Input
                  title="記事のタイトル"
                  name="title"
                  value={values && values.title ? values.title : ''}
                  placeholder="仲間を増やすコツ"
                  required={true}
                  onChange={handleInputChange}
                  errorMessage={errorTexts.title ? errorTexts.title : ''}
                />
                <Input
                  title="本のタイトル"
                  name="bookName"
                  value={values && values.bookName ? values.bookName : ''}
                  placeholder="人を動かす"
                  required={true}
                  onChange={handleInputChange}
                  errorMessage={errorTexts.bookName ? errorTexts.bookName : ''}
                />
                <Textarea
                  title="リード文"
                  name="discription"
                  value={values && values.discription ? values.discription : ''}
                  placeholder="一覧表示時に表示される文章になります。"
                  required={true}
                  onChange={handleTextareaChange}
                  errorMessage={
                    errorTexts.discription ? errorTexts.discription : ''
                  }
                />
                <RichEditor
                  title="本の内容"
                  required={true}
                  handleEditorChange={handleEditorChange}
                  value={values && values.content ? values.content : ''}
                  errorMessage={errorTexts.content ? errorTexts.content : ''}
                />
                <Select
                  title="本のカテゴリー"
                  name="category"
                  required={true}
                  dataList={categories}
                  onChange={handleSelectCategoryChange}
                  value={values?.category?.id || values?.category}
                  errorMessage={errorTexts.category ? errorTexts.category : ''}
                />
                {isSelectCategory && (
                  <Select
                    title="本のサブカテゴリー"
                    name="subCategory"
                    value={values?.subCategory?.id || values?.subCategory}
                    onChange={handleSelectChange}
                    dataList={selectSubCategories}
                  />
                )}
                <Select
                  title="公開設定"
                  name="publishingStatus"
                  value={values?.publishingStatus}
                  required={true}
                  dataList={publishingSettings}
                  onChange={handleSelectChange}
                  errorMessage={
                    errorTexts.publishingStatus
                      ? errorTexts.publishingStatus
                      : ''
                  }
                />
              </>
            )}
            <div className="_btns">
              {!isPreview && (
                <>
                  <button
                    className="_btn _sm-btn"
                    type="submit"
                    onClick={onSubmit}
                  >
                    {isEdit ? '編集する' : '作成する'}
                  </button>
                </>
              )}
              <button
                className="_btn _sm-btn _sub-btn"
                type="button"
                onClick={onTogglePreview}
              >
                {isPreview ? '編集する' : 'プレビュー'}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default SummaryForm;
