import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ArrowLeft, Eye, Download, Map } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '../components/ui/use-toast';

interface RequestDetails {
  id: string;
  title: string;
  service_type: string;
  description: string;
  priority: string;
  status: string;
  scheduled_date: string;
  created_at: string;
  requester_name: string;
  requester_phone: string;
  requester_email: string;
  location: string;
}

const MaintenanceRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRequestDetails(data);
    } catch (error) {
      console.error('Error fetching request details:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب تفاصيل الطلب",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: "default" | "secondary" | "destructive" | "outline" } } = {
      'pending': { label: 'في انتظار الموافقة', variant: 'secondary' },
      'in_progress': { label: 'قيد التنفيذ', variant: 'default' },
      'completed': { label: 'مكتمل', variant: 'outline' },
      'cancelled': { label: 'ملغي', variant: 'destructive' }
    };
    
    const statusInfo = statusMap[status] || { label: status, variant: 'secondary' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap: { [key: string]: { label: string; variant: "default" | "secondary" | "destructive" | "outline" } } = {
      'low': { label: 'منخفضة', variant: 'outline' },
      'medium': { label: 'متوسطة', variant: 'secondary' },
      'high': { label: 'عالية', variant: 'default' },
      'urgent': { label: 'عاجلة', variant: 'destructive' }
    };
    
    const priorityInfo = priorityMap[priority] || { label: priority, variant: 'secondary' as const };
    return <Badge variant={priorityInfo.variant}>{priorityInfo.label}</Badge>;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!requestDetails) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">لم يتم العثور على تفاصيل الطلب</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 ml-2" />
            الرجوع إلى القائمة
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold">نظام إدارة طلبات الصيانة</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Request Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">معلومات الطلب</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">رقم الطلب:</label>
                    <p className="font-semibold">{requestDetails.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">الخدمة:</label>
                    <p className="font-semibold">{requestDetails.service_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">التصنيف:</label>
                    <p className="font-semibold">صيانة</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">مرسل الطلب:</label>
                    <p className="font-semibold">{requestDetails.requester_name || 'غير محدد'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">نوع التعميم:</label>
                    <p className="font-semibold">مورد داخلي</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">الأولوية:</label>
                    <div>{getPriorityBadge(requestDetails.priority)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">جهة التواصل المفضلة:</label>
                    <p className="font-semibold">{requestDetails.requester_phone || 'غير محدد'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">الحالة:</label>
                    <div>{getStatusBadge(requestDetails.status)}</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Property Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">بيانات العقار</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">اسم العقار:</label>
                    <p className="font-semibold">{requestDetails.location || 'غير محدد'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">المدينة:</label>
                    <p className="font-semibold">الرياض</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">الدولة:</label>
                    <p className="font-semibold">المملكة العربية السعودية</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">الموقع الجغرافي:</label>
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      <span className="text-blue-600 cursor-pointer">عرض على الخريطة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Invoice Summary */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">ملخص الفاتورة</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">رسوم المعاينة:</p>
                  <p className="font-bold text-lg">EGP 0.00</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">سعر الخدمة:</p>
                  <p className="font-bold text-lg">EGP 329.00</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">الخصم:</p>
                  <p className="font-bold text-lg">EGP 0.00</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">الضريبة (15%):</p>
                  <p className="font-bold text-lg">EGP 46.06</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">إجمالي قطع الغيار:</p>
                  <p className="font-bold text-lg text-green-600">EGP 0.00</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">الإجمالي النهائي:</p>
                  <p className="font-bold text-lg text-blue-600">EGP 375.06</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">المبلغ بعد الاستلام:</p>
                  <p className="font-bold text-lg text-red-600">EGP 0.00</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600 whitespace-nowrap">موافقة على السعر:</p>
                  <Badge variant="destructive" className="mt-1">غير موافق X</Badge>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><span className="font-medium">الرجوع بعد الاستلام:</span> EGP 0.00</div>
                  <div><span className="font-medium">الضمان:</span> EGP 0.00</div>
                  <div><span className="font-medium">المبلغ:</span> EGP 375.06</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Status Log */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">سجل الحالات</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>تاريخ التسجيل</TableHead>
                      <TableHead>بواسطة</TableHead>
                      <TableHead>المنطقة</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-green-50">
                      <TableCell>04:45 2025-08-03</TableCell>
                      <TableCell>Mohamed Azab</TableCell>
                      <TableCell>test requste</TableCell>
                      <TableCell>تم التعيين</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>04:45 2025-08-03</TableCell>
                      <TableCell>Mohamed Azab</TableCell>
                      <TableCell>test requste</TableCell>
                      <TableCell>في انتظار الموافقة</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <Separator />

            {/* Financial Transactions */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">سجل المعاملات المالية</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>تاريخ المعاملة</TableHead>
                      <TableHead>بواسطة</TableHead>
                      <TableHead>الملاحظة</TableHead>
                      <TableHead>العملة</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>القيمة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>04:45 2025-08-03</TableCell>
                      <TableCell>Mohamed Azab</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>EGP</TableCell>
                      <TableCell>329.00</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>04:45 2025-08-03</TableCell>
                      <TableCell>Mohamed Azab</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>EGP</TableCell>
                      <TableCell>46.06</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <Separator />

            {/* Materials */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">المواد</h2>
              <div className="text-center py-8 text-gray-500">
                <p>لم يتم إضافة مواد بعد</p>
              </div>
            </div>

            <Separator />

            {/* Attachments */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">المرفقات</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الإجراءات</TableHead>
                      <TableHead>بواسطة</TableHead>
                      <TableHead>تاريخ الرفع</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>المحتوى</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>إسم الملف</TableHead>
                      <TableHead>المعاينة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>Mohamed Azab</TableCell>
                      <TableCell>04:45 2025-08-03</TableCell>
                      <TableCell>KB 311.3</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          طلب الصيانة
                        </Badge>
                      </TableCell>
                      <TableCell>image/png</TableCell>
                      <TableCell>Group 818</TableCell>
                      <TableCell>
                        <div className="w-10 h-10 bg-orange-100 rounded border flex items-center justify-center">
                          📄
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MaintenanceRequestDetails;