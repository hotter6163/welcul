import { ReactElement } from "react"
import { Container } from "@mui/material"
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
          <Container maxWidth="desktop" component="main" className="mt-24 px-4">
            {WrappedPage}
          </Container>
        </>
      )
      break
  }

  return pageWithLayout
}
