import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Equipment Agent',
  description: '스마트공장 설비 에이전트 화면 컨셉',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
