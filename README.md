# m3u4me

This is an AWS Serverless project to convert xtream codes playlists to m3u.

Preprequisites:
* AWS account with an IAM user that has permissions to run ```sam deploy```.

To deploy:

```bash
sam build
sam deploy --guided
```

You will be prompted to enter your service details when running ```sam deploy --guided```.

This was built as a proof of concept, but it works well enough to use with IPTVnator.

To do:
* Remove parameters (uri, username, password) from code - DONE
* Integrate EPG (add 'url-tvg' tag)
* Add custom hostname support
* Add custom filter/transform/order/groups