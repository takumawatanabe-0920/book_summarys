import React, { useState, useEffect, FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Textarea, Select } from '../..';
import // uploadImage,
// responseUploadImage,
'../../../../firebase/functions';
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
import {
  loadAll as loadAllCategory,
  Category,
} from 'src/frontend/module/category';
import {
  loadAll as loadAllSubCategory,
  SubCategory,
} from 'src/frontend/module/subCategory';

type Props = {
  isEdit?: boolean;
  summary?: Summary;
};

const SummaryForm: FC<Props> = (props) => {
  const { isEdit, summary } = props;
  const [values, setValues] = useState<Partial<Summary>>({});
  const [categories, setCategories] = useState<Partial<Category[]>>([]);
  const [subCategories, setSubCategories] = useState<Partial<SubCategory[]>>(
    [],
  );
  const [isSelectCategory, setIsSelectCategory] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  // const [image, setImage] = useState<File>();
  // const [imageUrl, setImageUrl] = useState<string | void>('');
  const [errorTexts, setErrorTexts] = useState<Partial<Summary>>({});
  // const [thumnail, setThumnail] = useState<string>('');
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
      const _subCategories = await loadAllSubCategory({
        params: {
          categoryId,
        },
      });
      setSubCategories(_subCategories);
    } catch (e) {
      console.error({ e });
      await throwAlert('danger', 'エラーが発生しました。');
    }
  };

  // const handleChangeThumbnail = (_fileImg: File): string | void => {
  //   if (validateImageUploads(_fileImg)) return;
  //   if (_fileImg.type.startsWith('image/')) {
  //     const imgUrl = window.URL.createObjectURL(_fileImg);
  //     return imgUrl;
  //   }
  // };

  // const validateImageUploads = (_file: File): string | void => {
  //   if (!_file) return;
  //   if (_file.size > 1000000) {
  //     setImageUrl(null);
  //     setImage(undefined);
  //     throwAlert('danger', 'ファイルサイズが1MBを超えています');
  //     return 'err';
  //   }
  // };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.persist();
  //   const target = event.target;
  //   const imgFile = target.files[0];
  //   const resImgUrl = handleChangeThumbnail(imgFile);
  //   setImageUrl(resImgUrl);
  //   setImage(imgFile);
  // };

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
      // thumbnail,
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
    // if (!thumbnail && (!image || !imageUrl)) {
    //   isError = true;
    //   errorText.thumbnail = 'サムネイル画像を設定してください。';
    // }
    if (!category || !category.match(/\S/g)) {
      isError = true;
      errorText.category = '本のカテゴリーを設定してください。';
    }
    if (!publishingStatus || !category.match(/\S/g)) {
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
        // if (imageUrl) {
        //   const resUpload: ResultResponse<any> = await uploadImage(
        //     image,
        //     'summary',
        //   );
        //   if (resUpload.status === 200) {
        //     values.thumbnail = resUpload.data;
        //   } else {
        //     return await throwAlert(
        //       'danger',
        //       '画像のアップロードに失敗しました。',
        //     );
        //   }
        // }
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

  const editForm = () => {
    return (
      <>
        <h2 className="main-title blue-main-title blue-back">記事編集画面</h2>
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
        {/* <Input
          title="サムネイル"
          name="thumbnail"
          required={true}
          type="file"
          onChange={handleImageChange}
          errorMessage={errorTexts.thumbnail ? errorTexts.thumbnail : ''}
        /> */}
        {/* <div className="_thumnail-area">
          {thumnail && (
            <dl>
              <dt>登録サムネイル</dt>
              <dd>
                <img src={thumnail} alt="登録サムネイル画像" />
              </dd>
            </dl>
          )}
          {imageUrl && (
            <dl>
              <dt>{isEdit ? '変更後サムネイル' : '登録サムネイル'}</dt>
              <dd>
                <img src={imageUrl} alt="表示画像" />
              </dd>
            </dl>
          )}
        </div> */}
        <Textarea
          title="リード文"
          name="discription"
          value={values && values.discription ? values.discription : ''}
          placeholder="一覧表示時に表示される文章になります。"
          required={true}
          onChange={handleTextareaChange}
          errorMessage={errorTexts.discription ? errorTexts.discription : ''}
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
          value={values && values.category ? values.category : ''}
          errorMessage={errorTexts.category ? errorTexts.category : ''}
        />
        {isSelectCategory && (
          <Select
            title="本のサブカテゴリー"
            name="subCategory"
            value={values && values.subCategory ? values.subCategory : ''}
            onChange={handleSelectChange}
            dataList={subCategories}
          />
        )}
        <Select
          title="公開設定"
          name="publishingStatus"
          value={
            values && values.publishingStatus ? values.publishingStatus : ''
          }
          required={true}
          dataList={publishingSettings}
          onChange={handleSelectChange}
          errorMessage={
            errorTexts.publishingStatus ? errorTexts.publishingStatus : ''
          }
        />
      </>
    );
  };

  const preview = () => {
    return (
      <>
        <h2 className="main-title blue-main-title blue-back">プレビュー画面</h2>
        {values.content && <ReadOnlyEditor editorState={values.content} />}
      </>
    );
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const _categories = await loadAllCategory({
          params: {
            sortKey: 'displayOrder',
          },
        });
        setCategories(_categories);
        if (isEdit && Object.keys(summary).length > 0) {
          // const resThumnail: string = await responseUploadImage(
          //   summary.thumbnail,
          // );
          subCategorySelect(summary.category);
          setIsSelectCategory(true);
          // setThumnail(resThumnail);
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
          {isPreview && preview()}
          <form className="form-table">
            {!isPreview && editForm()}
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
                  {/* <button className="_btn _sm-btn _sub-btn" type="button">
                    保存する(下書き)
                  </button> */}
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
