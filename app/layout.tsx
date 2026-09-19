import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lengthé 接发美学｜门店预约',
  description: '专业接发门店在线预约模板，选择项目、发型师与到店时间。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
