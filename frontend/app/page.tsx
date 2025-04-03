import Header from './Header';
import Footer from './Footer';
import NovelPopular from './NovelPopular';
import { NovelList } from '@/app/novel';
export default function Home() {
  return (
    <main className="overflow-y-auto overflow-x-hidden h-full">
      <div className="p-4 min-h-dvh space-y-4">
        <Header />
        <NovelPopular />
        <NovelList text="Mới cập nhật" orderBy="createdAt" />
        <NovelList text="Được yêu thích" orderBy="followCount" />
        <Footer />
      </div>
    </main>
  );
}
