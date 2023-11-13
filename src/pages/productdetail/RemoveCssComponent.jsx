import React from 'react'

export default function RemoveCssComponent({csstext}) {
  return (
    <div dangerouslySetInnerHTML={{ __html: csstext }} />
  )
}
