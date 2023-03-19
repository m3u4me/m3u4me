# m3u4me

This is an AWS Serverless project to convert xtream codes playlists to m3u.

Preprequisites:
* AWS SAM cli installed
* AWS account with an IAM user that has permissions to run ```sam deploy```
* AWS credentials stored in profile ```m3u4me```

To deploy:

```bash
git clone https://github.com/m3u4me/m3u4me.git
cd m3u4me
sam build
sam deploy --guided --profile m3u4me
```

You will be prompted to enter your service details when running ```sam deploy --guided```, and you will be provided with your playlist URL.

This was built as a proof of concept, but it works well enough to use with IPTVnator.

Your personal URL will be output by ```sam deploy```:

```terminal
CloudFormation outputs from deployed stack
------------------------------------------------------------------------------------
Outputs
------------------------------------------------------------------------------------
Key                 PlaylistUrl
Description         API Gateway endpoint URL for Prod stage for Playlist function
Value               https://myurl.amazonaws.com/Prod/playlist/
------------------------------------------------------------------------------------
```

To do:
* Remove parameters (uri, username, password) from code - DONE
* Integrate EPG (add 'url-tvg' tag)
* Add custom hostname support
* Add custom filter/transform/order/groups
