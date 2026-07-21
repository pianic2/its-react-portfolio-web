import { PageContainer, type PageContainerProps } from '../../components/layout/PageContainer'

type MethodPageContainerProps = Omit<PageContainerProps, 'sx'>

export function MethodPageContainer(props: MethodPageContainerProps) {
  return <PageContainer {...props} sx={{ maxInlineSize: { xl: 1280 } }} />
}
