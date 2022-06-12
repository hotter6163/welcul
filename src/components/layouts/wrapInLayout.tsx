import { ReactElement } from "react"
import { Box } from "@mui/material"
import { Header } from "./Header"

type PageType = 'top' | 'user'

export const wrapInLayout = (
  pageType: PageType,
  WrappedPage: ReactElement
): ReactElement => {
  let pageWithLayout: ReactElement
  switch (pageType) {
    case 'top':
      pageWithLayout = WrappedPage
      break
    case 'user':
      pageWithLayout = (
        <>
          <Header />
          <Box component="main" className="mt-20">
            {WrappedPage}
          </Box>
        </>
      )
      break
  }

  return pageWithLayout
}
