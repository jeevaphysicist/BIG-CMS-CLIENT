'use client'

import {NextUIProvider} from '@nextui-org/react'

export function NextUISProviders({children}) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}