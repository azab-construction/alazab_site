import React, { useState, useMemo } from 'react';
import { Search, Filter, Package, TrendingUp, ArrowUpDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { materialCategories, getAllItems, getTotalItemsCount, MaterialItem } from '@/data/materialPricesData';

const MaterialPricesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'priceFrom' | 'priceTo'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredItems = useMemo(() => {
    let items: MaterialItem[] = selectedCategory === 'all' 
      ? getAllItems() 
      : materialCategories.find(c => c.id === selectedCategory)?.items || [];

    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    items.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name, 'ar');
      } else if (sortBy === 'priceFrom') {
        comparison = a.priceFrom - b.priceFrom;
      } else {
        comparison = a.priceTo - b.priceTo;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return items;
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  const getCategoryInfo = (categoryId: string) => {
    return materialCategories.find(c => c.id === categoryId);
  };

  const toggleSort = (field: 'name' | 'priceFrom' | 'priceTo') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              دليل الأسعار المحدث
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              أسعار الخامات المعمارية
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              قائمة شاملة بأسعار قطع الغيار والخامات المعمارية لجميع التخصصات
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {materialCategories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <span className="text-3xl mb-2 block">{category.icon}</span>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.items.length} منتج</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
                    <p className="text-2xl font-bold text-foreground">{getTotalItemsCount()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الفئات</p>
                    <p className="text-2xl font-bold text-foreground">{materialCategories.length}</p>
                  </div>
                </div>
                <Button 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                >
                  عرض الكل
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Filter className="h-4 w-4 ml-2" />
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    {materialCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              عدد النتائج: <span className="font-semibold text-foreground">{filteredItems.length}</span>
            </p>
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="text-sm">
                {getCategoryInfo(selectedCategory)?.icon} {getCategoryInfo(selectedCategory)?.name}
              </Badge>
            )}
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right w-12">#</TableHead>
                      <TableHead 
                        className="text-right cursor-pointer hover:bg-muted/80 transition-colors"
                        onClick={() => toggleSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          اسم المنتج
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">الفئة</TableHead>
                      <TableHead 
                        className="text-center cursor-pointer hover:bg-muted/80 transition-colors"
                        onClick={() => toggleSort('priceFrom')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          السعر من
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-center cursor-pointer hover:bg-muted/80 transition-colors"
                        onClick={() => toggleSort('priceTo')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          السعر إلى
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item, index) => {
                      const category = getCategoryInfo(item.category);
                      return (
                        <TableRow key={item.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {item.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {category?.icon} {category?.name}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-semibold text-green-600">
                              {item.priceFrom.toLocaleString('ar-EG')} ج.م
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-semibold text-primary">
                              {item.priceTo.toLocaleString('ar-EG')} ج.م
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد نتائج مطابقة للبحث</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mt-8 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                ⚠️ الأسعار المعروضة استرشادية وقد تختلف حسب الكمية والمورد وظروف السوق
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MaterialPricesPage;
