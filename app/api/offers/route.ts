import {Client} from '@hubspot/api-client'
import {type CollectionResponseWithTotalHubDbTableRowV3ForwardPaging} from '@hubspot/api-client/lib/codegen/cms/hubdb'

const TABLE_NAME = 'ggggg'

export const GET = async () => {
  console.log(' called')

  try {
    const hubspotClient = new Client({accessToken: process.env.HUBSPOT_API_KEY})
    // console.log('process.env.HUBSPOT_API_KEY', process.env.HUBSPOT_API_KEY)

    // const tables = await hubspotClient.cms.hubdb.tablesApi.getAllTables()
    // console.log('tables', tables)

    const data = (await hubspotClient.cms.hubdb.rowsApi.getTableRows(TABLE_NAME)) as CollectionResponseWithTotalHubDbTableRowV3ForwardPaging
    console.log(
      'data',
      data.total,
      data.results.map(result => result.values)
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
