import {Client} from '@hubspot/api-client'
// import {type PublicSearchResults} from '@hubspot/api-client/lib/codegen/cms/site_search'

const TABLE_NAME = 'ggggg'

export const GET = async () => {
  try {
    const hubspotClient = new Client({accessToken: process.env.HUBSPOT_API_KEY})
    // console.log('process.env.HUBSPOT_API_KEY', process.env.HUBSPOT_API_KEY)

    // const tables = await hubspotClient.cms.hubdb.tablesApi.getAllTables()
    // console.log('tables', tables)

    // const data = (await hubspotClient.cms.hubdb.rowsApi.getTableRows(TABLE_NAME)) as CollectionResponseWithTotalHubDbTableRowV3ForwardPaging

    // const q = 'x'
    // const limit = undefined
    // const offset = undefined
    // const language = undefined
    // const matchPrefix = undefined
    // const autocomplete = undefined
    // const popularityBoost = undefined
    // const boostLimit = undefined
    // const boostRecent = undefined
    // const tableId = undefined
    // const hubdbQuery = undefined
    // const domain = undefined
    // const type = ['LANDING_PAGE' as const]
    // const pathPrefix = undefined
    // const property = undefined
    // const length = undefined
    // const groupId = undefined

    // const data = (await hubspotClient.cms.siteSearch.publicApi.search(
    //   q,
    //   limit,
    //   offset,
    //   language,
    //   matchPrefix,
    //   autocomplete,
    //   popularityBoost,
    //   boostLimit,
    //   boostRecent,
    //   tableId,
    //   hubdbQuery,
    //   domain,
    //   type,
    //   pathPrefix,
    //   property,
    //   length,
    //   groupId
    // )) as PublicSearchResults

    const sort = ['column1__gt=5', 'sort=-column1']
    const after = undefined
    const limit = undefined
    const properties = undefined
    const options = undefined

    const data = await hubspotClient.cms.hubdb.rowsApi.getTableRows(TABLE_NAME, sort, after, limit, properties, options)

    console.log(
      'data',
      data.total,
      data.results.map(r => r.values)
      // data
    )

    return Response.json(data)
  } catch (error) {
    console.log('error', error)
    return Response.json(error)
  }
}

export const POST = async () => {
  console.log(' called')

  try {
    const hubspotClient = new Client({accessToken: process.env.HUBSPOT_API_KEY})

    const data = await hubspotClient.cms.hubdb.rowsApi.createTableRow(TABLE_NAME, {
      values: {
        name: 'Added by code'
      }
    })

    await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(TABLE_NAME)

    return Response.json(data)
  } catch (error) {
    console.log('error', error)
    return Response.json(error)
  }
}
