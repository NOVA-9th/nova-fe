import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider, QueryProvider } from './_providers';
import { Toast } from '@/shared/ui';
import { AuthHydration } from '@/shared/utils/authHydration';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nova.snowfrost.kr'),
  title: {
    template: '%s | Nova',
    default: 'Nova | AI 기반 맞춤형 개발자 뉴스 피드 서비스',
  },
  description: 'AI 기반 맞춤형 개발자 뉴스 피드 서비스',
  openGraph: {
    type: 'website',
    siteName: 'Nova',
    title: 'Nova',
    description: 'AI 기반 맞춤형 개발자 뉴스 피드 서비스',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nova',
      },
    ],
  },
  twitter: {
    title: 'Nova',
    description: 'AI 기반 맞춤형 개발자 뉴스 피드 서비스',
    images: {
      url: '/og-image.png',
    },
  },
  icons: {
    icon: '/Logo.svg',
  },
  alternates: {
    canonical: '/',
  },
  applicationName: 'Nova',
  verification: {
    google: '4R5sf6u9A6asZmNrpNS37QFh1CvZn_q9NjB2mXI7IOg',
  },
  other: {
    'naver-site-verification': 'db7ab61ed37ce80655c9baa4eb28219b4dc12f62',
  },
};

const pretendardJP = localFont({
  src: './fonts/PretendardJPVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-interface',
});

const wantedSans = localFont({
  src: './fonts/WantedSansVariable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-hero',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={`${pretendardJP.variable} ${wantedSans.variable} font-sans antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem={false}
            disableTransitionOnChange={true}
          >
            <AuthHydration />
            <Toast />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
