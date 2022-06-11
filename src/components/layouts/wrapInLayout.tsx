import { ReactElement } from "react"
import { Box } from "@mui/material"
import { Header } from "./Header"

type PageType = 'top' | 'user'

export const wrapInLayout = (
  pageType: PageType,
  WrappedComponent: ReactElement
): ReactElement => {
  let pageWithLayout: ReactElement
  switch (pageType) {
    case 'top':
      pageWithLayout = (
        <Box sx={{ bgcolor: 'background.paper' }}>
          {WrappedComponent}
        </Box>
      )
      break
    case 'user':
      pageWithLayout = (
        <Box sx={{ bgcolor: 'background.paper' }}>
          <Header />
          {WrappedComponent}
        </Box>
      )
      break
  }

  return pageWithLayout
}
