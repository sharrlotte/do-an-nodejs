'use client';
import useNovels from '@/hook/use-novels';
import { useQueryState, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NovelCard } from '@/app/novel';
import { useCategories } from '@/hook/use-category';
import { Badge } from '@/components/ui/badge';
import Loading from '@/app/loading';
import Header from '@/app/Header';

export default function Page() {
  const [name, setName] = useQueryState('q', { defaultValue: '' });
  const [category, setCategory] = useQueryState('category', parseAsArrayOf(parseAsString).withDefault([]));
  const [order, setOrder] = useQueryState('order', parseAsStringEnum(['asc', 'desc']).withDefault('desc'));
  const [orderBy, setOrderBy] = useQueryState('orderBy', parseAsStringEnum(['chapterCount', 'createdAt', 'followCount']).withDefault('createdAt'));

  const { data, isLoading } = useNovels(name, category ?? [], orderBy, order);
  const { categories } = useCategories();

  const handleCategorySelect = (categoryName: string) => {
    if (category?.includes(categoryName)) {
      setCategory(category.filter((c) => c !== categoryName));
    } else {
      setCategory([...(category ?? []), categoryName]);
    }
  };

  const orderByOptions = [
    { value: 'createdAt', label: 'Mới nhất' },
    { value: 'chapterCount', label: 'Số chương' },
    { value: 'followCount', label: 'Lượt theo dõi' },
  ];

  return (
    <div className="container mx-auto py-6 h-full overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row mt-2 bg-card divide-x rounded-lg overflow-hidden h-full">
        <div className="lg:w-1/4 space-y-6 p-4 rounded-md">
          <Input placeholder="Tìm kiếm truyện..." value={name} onChange={(e) => setName(e.target.value)} />
          <div className="flex flex-col gap-2">
            Sắp xếp theo:
            <Select value={orderBy} onValueChange={(value) => setOrderBy(value as typeof orderBy)}>
              <SelectTrigger>
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                {orderByOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={order} onValueChange={(value) => setOrder(value as typeof order)}>
              <SelectTrigger>
                <SelectValue placeholder="Thứ tự" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Giảm dần</SelectItem>
                <SelectItem value="asc">Tăng dần</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <div>Thể loại:</div>
            <div className="flex flex-wrap gap-2">
              {categories?.map((c) => (
                <Badge key={c.id} variant={category?.includes(c.name) ? 'default' : 'outline'} className="cursor-pointer" onClick={() => handleCategorySelect(c.name)}>
                  {c.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-3/4 p-4 h-full overflow-hidden flex flex-col">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="space-y-2 overflow-hidden h-full flex flex-col">
              <span>Đã tìm thấy {data?.length ?? 0} tác phẩm</span>
              <div className="grid grid-cols-1 md:grid-cols-2 pr-2 xl:grid-cols-3 gap-4 overflow-y-auto">
                {data?.map((novel) => (
                  <NovelCard key={novel.id} novel={novel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
