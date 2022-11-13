#!/bin/sh

echo '
====================================================================================
S3のセットアップを初めています。
===================================================================================='
echo "S3 setup start!"

# https://qiita.com/Shoma0210/items/258e8422d5341160624b
aws s3 ls --endpoint-url=http://localhost:4566 --profile localstack
cmdstatus=$?
if [ cmdstatus -ne 0 ]
then
echo -e "S3の接続に失敗しました。aws configureのlocalstackの設定を確認してください。https://qiita.com/Shoma0210/items/258e8422d5341160624b"
exit cmdstatus
fi

TEXT=''
for v in `cat .env.sample | grep -e '.*_bucket'`;
do
  var=`echo $v | sed -e 's/_/-/g' -e 's/=//g'`
  aws --endpoint-url=http://localhost:4566 s3 mb s3://$var/ --profile localstack
  if [ $? -ne 0 ] 
  then
    echo -e "バケットは既に作成されています。"
  else
    echo -e "$varバケットが作成されました。"
  fi
  echo $v$var
  TEXT+="$v$var \n"
done

echo '
====================================================================================
バケットが作成されました。local環境のenvファイルに以下の環境変数を追加してください。
===================================================================================='
echo $TEXT


echo '
====================================================================================
S3のセットアップが完了しました。
===================================================================================='

# 出力結果が吐き出されない...