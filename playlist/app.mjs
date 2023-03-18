/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

// update these

const uri = process.env.M3U4ME_URI
const username = process.env.M3U4ME_USERNAME
const password = process.env.M3U4ME_PASSWORD
const tzoffset = process.env.M3U4ME_TZOFFSET

const main = async () => {

    const actions = {
        getLiveCategories: 'get_live_categories',
        getLiveStreams: 'get_live_streams',
    }

    const getUriForAction = (action) => {
        return uri + '/player_api.php?' + `username=${username}&password=${password}&action=${action}`
    }

    let liveCategories = await fetch(getUriForAction(actions.getLiveCategories))
    let liveStreams = await fetch(getUriForAction(actions.getLiveStreams))

    let liveCategoriesData = JSON.parse(await liveCategories.text())
    let liveStreamsData = JSON.parse(await liveStreams.text())

    const groupBy = (list, key) => list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})

    let groupedStreams = groupBy(liveStreamsData, 'category_id')

    let m3uAsArray = []
    m3uAsArray.push('#EXTM3U')

    for (const category in groupedStreams) {
        for (const stream of groupedStreams[category]) {
            let thisCategory = liveCategoriesData.find(c => c.category_id == category)
            m3uAsArray.push(`#EXTINF:-1 tvd-id="${stream.epg_channel_id ?? '(no tvg-id)'}" tvg-name="${stream.name}" tvg-logo="${stream.stream_icon}" group-title="${thisCategory.category_name}" tvg-shift="${tzoffset}",${stream.name}`)
            m3uAsArray.push(`${uri}/live/${username}/${password}/${stream.stream_id}.m3u8`)
        }
    }

    const m3uFile = m3uAsArray.join('\r\n')

    return m3uFile

}

export const lambdaHandler = async (event, context) => {
    let m3uFile = await main()
    try {
        return {
            'statusCode': 200,
            headers: { "Content-Type": "text/plain" },
            'body': m3uFile,
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
