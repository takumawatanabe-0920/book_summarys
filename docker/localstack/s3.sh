#!/bin/sh

echo "S3 setup start!"
echo "Creating S3 bucket..."

# https://qiita.com/Shoma0210/items/258e8422d5341160624b
aws s3 ls --endpoint-url=http://localhost:4566 --profile localstack | awk '{print $3}' > /tmp/s3buckets.txt

if [ $? -ne 0 ]
then
echo -e "date : Error occurs while connecting aws s3.. "
fi

echo -e "date : S3 bucket list is created.."
cat /tmp/s3buckets.txt
cat .env.sample | grep -e '.*_bucket' | sed -e 's/_/-/g' -e 's/=//g' > /tmp/s3bucketNames.txt
# cat /tmp/s3bucketNames.txt
cat /tmp/s3bucketNames.txt | xargs -I BACKET_NAME echo BACKET_NAME
# cat /tmp/s3bucketNames.txt | xargs -I BACKET_NAME aws --endpoint-url=http://localhost:4566 s3 mb s3://BACKET_NAME/ --profile localstack



if [ $? -ne 0 ]
then
echo -e "bucket exists! your-bucket-name"
fi

echo "S3 setup Done!"

# 出力結果が吐き出されない...