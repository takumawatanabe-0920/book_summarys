import React, { FC, useState, useEffect } from 'react';
import clsx from 'clsx';
// import Hammer from 'react-hammerjs';
import { useNavigate } from 'react-router-dom';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ResSummaryBook, ResultResponse } from '../../types';
import { getImage } from '../../firebase/functions';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  FavoriteIcon,
} from '.';
import { formatTagColor } from '../../utils/function';

type Props = {
  data: ResSummaryBook;
  setting?: any;
  elType?: string;
};

const MediaCard: FC<Props> = (props) => {
  const { data, setting, elType } = props;
  const {
    id,
    title,
    favorite_count,
    category,
    book_name,
    // sub_category,
    user_name,
    discription,
    thumbnail,
    update_date,
  } = data;
  //const { isHiddenContent } = setting
  const [summaryThumbnail, setSummaryThumbnail] = useState<string>('');
  const history = useNavigate();

  const formatTag = () => {
    const now = new Date();
    const nowTime = Math.floor(now.getTime() / 1000);
    const diffTime = nowTime - update_date.seconds;
    if (favorite_count > 0) {
      return <span className="main-tag recommned-tag">人気！</span>;
    } else if (diffTime > 3600) {
      return <span className="main-tag new-tag">新着！</span>;
    }
  };

  const onTapAndMove = () => {
    history(`/summary/${id}`);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const resThumnail: ResultResponse<string> | void = await getImage(
          thumbnail,
        );
        if (resThumnail && resThumnail.status === 200) {
          setSummaryThumbnail(resThumnail.data);
        }
      } catch (e) {}
    };

    loadData();
  }, []);

  return (
    // <Hammer onTap={onTapAndMove}>
    <div
      //to={`/summary/${id}`}
      className={clsx(
        'summary-data-item',
        elType === 'top-summary-list' ? 'top-summary-list' : '',
      )}
    >
      <Card>
        <CardActionArea
          className={clsx(
            'article-ver',
            setting && setting.topSlider ? 'top-ver' : '',
          )}
        >
          <LazyLoadComponent>
            <CardMedia
              className={clsx(
                setting && setting.topSlider ? 'sliderImg' : 'media',
                elType === 'top-summary-list' ? 'top-summary-img' : '',
              )}
              image={summaryThumbnail}
              title="Contemplative Reptile"
            />
          </LazyLoadComponent>
          <div
            className={clsx(
              'article-body',
              setting && setting.topSlider ? 'top-article-body' : '',
            )}
          >
            <div
              className={clsx(
                setting && setting.topSlider ? '_book-name-top' : '_book-name',
              )}
            >
              {book_name ? book_name : '題材なし'}
            </div>
            <CardContent>
              <div className="categories">
                <span
                  className={clsx(
                    'main-tag',
                    category.name ? formatTagColor(category.name) : '',
                  )}
                >
                  {category && category.name}
                </span>
                {/* {setting
                  ? !setting.isHiddenCategory
                  : true && (
                      <span className="main-tag sub-tag">
                        {sub_category && sub_category.name}
                      </span>
                    )} */}
                {formatTag()}
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className="_summary-ttl"
              >
                {title}
              </Typography>
              {setting
                ? !setting.isHiddenContent
                : true && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className="_summary-txt"
                    >
                      {discription}
                    </Typography>
                  )}
            </CardContent>
            <CardActions className="summary-bottom">
              <p className="user-name">@{user_name ? user_name : '名無し'}</p>
              <div className="favorite-area">
                <FavoriteIcon className="favorite-button isClick" />
                <p className="favoriteNum">
                  {favorite_count ? favorite_count : 0}
                </p>
              </div>
            </CardActions>
          </div>
        </CardActionArea>
      </Card>
    </div>
    // </Hammer>
  );
};

export default MediaCard;
