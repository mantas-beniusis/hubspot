'use client'

import {type CollectionResponseWithTotalHubDbTableRowV3ForwardPaging} from '@hubspot/api-client/lib/codegen/cms/hubdb'
import Image from 'next/image'
import {useState} from 'react'

type RowType = {
  image: {
    url: string
    width: number
    height: number
    altText: string
    fieId: number
    type: string
  }
  name: string
  description: string
  email: string
}

export default function Home() {
  const [rows, setRows] = useState<CollectionResponseWithTotalHubDbTableRowV3ForwardPaging>()
  const [hasAdded, setHasAdded] = useState<boolean>(false)

  const onHubSpotAdd = async () => {
    const response = await fetch('/api/offers', {method: 'POST'})
    const data = await response.json()

    if (data) {
      setHasAdded(true)
      setTimeout(() => setHasAdded(false), 3000)
    }

    console.log('returned data', data)
    setRows(data)
  }

  const onHubSpotGet = async () => {
    const response = await fetch('/api/offers')
    const data = await response.json()

    console.log('returned data', data)
    setRows(data)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-20">
      <h1 className="text-9xl font-bold">HubSpot</h1>
      <div className="flex gap-4">
        <button onClick={onHubSpotAdd} className="rounded-lg bg-yellow-200 p-5 text-4xl font-bold">
          Add HubSpot row
        </button>
        <button onClick={onHubSpotGet} className="rounded-lg bg-green-200 p-5 text-4xl font-bold">
          Get HubSpot data
        </button>
      </div>
      {hasAdded && <p className="text-4xl font-bold text-green-600">One row has been added!</p>}
      {!!rows?.total && (
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-center text-2xl">Total rows: {rows.total}</h1>

          {rows.results.map(row => {
            const {name, email, description, image} = row.values as RowType
            return (
              <div key={row.id} className="flex items-center gap-4 bg-gray-100">
                <p>{name}</p>
                <p>{email}</p>
                <div dangerouslySetInnerHTML={{__html: description}} />
                {image && (
                  <div className="w-80">
                    <Image src={image.url} alt={image.altText} width={image.width} height={image.height} className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
