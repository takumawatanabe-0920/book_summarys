import React, { FC, useState, useEffect } from 'react';
import clsx from 'clsx';
// import Hammer from 'react-hammerjs';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
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
import { Summary } from 'src/frontend/module/summary';
import * as dayjs from 'dayjs';
type Props = {
  data: Summary;
  setting?: any;
  elType?: string;
};

const MediaCard: FC<Props> = (props) => {
  const { data, setting, elType } = props;
  const {
    title,
    category,
    bookName,
    discription,
    user,
    updatedAt = new Date(),
  } = data;
  //const { isHiddenContent } = setting
  const [summaryThumbnail, setSummaryThumbnail] = useState<string>('');
  // const history = useNavigate();
  const favoriteCount = data.favorites?.length || 0;
  const formatTag = () => {
    const diffTime = dayjs().diff(dayjs(updatedAt), 'second');
    if (favoriteCount > 0) {
      return <span className="main-tag recommned-tag">人気！</span>;
    } else if (diffTime > 3600) {
      return <span className="main-tag new-tag">新着！</span>;
    }
  };

  // const onTapAndMove = () => {
  //   history(`/summary/${id}`);
  // };

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
              {bookName ? bookName : '題材なし'}
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
              <p className="user-name">@{user?.dispalyName || '名無し'}</p>
              <div className="favorite-area">
                <FavoriteIcon className="favorite-button isClick" />
                <p className="favoriteNum">{favoriteCount || 0}</p>
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
