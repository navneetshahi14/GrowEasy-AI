import React from 'react'
import DropZone from './DropZone'

const UploadCard = () => {
  return (
    <div className="mt-10 w-full max-w-3xl rounded-xl border bg-white p-8 shadow-sm">

        <h2 className="mb-2 text-2xl font-semibold">
            Upload CSV
        </h2>

        <p className="mb-6 text-sm text-gray-500">
            Upload any CSV file to intelligently extract CRM fields.
        </p>

        <DropZone />
    </div>
  )
}

export default UploadCard