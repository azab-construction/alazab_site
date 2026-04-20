import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

const RefundPolicyPage: React.FC = () => {
  return (
    <PageLayout title="سياسة الاسترداد والإلغاء">
      <article dir="rtl" className="prose prose-lg max-w-none text-foreground space-y-6 leading-relaxed">
        <p className="text-muted-foreground">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">1. الإلغاء قبل بدء العمل</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>يحق للعميل إلغاء الطلب خلال 24 ساعة من تأكيده مع استرداد كامل المبلغ المدفوع.</li>
            <li>الإلغاء بعد 24 ساعة وقبل بدء التنفيذ يستوجب خصم 10% رسوم إدارية.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">2. الإلغاء بعد بدء العمل</h2>
          <p>
            في حال طلب إيقاف العمل بعد بدء التنفيذ، يتم احتساب قيمة الأعمال المنجزة فعلياً
            بالإضافة إلى تكلفة المواد التي تم توريدها أو طلبها، ويُسترد ما تبقى من الدفعة المقدمة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">3. شكاوى الجودة</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>إذا لم تتطابق الأعمال مع المواصفات المتفق عليها، يلتزم العميل بإبلاغ الشركة خلال 7 أيام من التسليم.</li>
            <li>تقوم الشركة بمعاينة العمل خلال 72 ساعة من استلام الشكوى.</li>
            <li>في حال ثبوت الخطأ، يتم إصلاح العيب مجاناً خلال مدة لا تتجاوز 14 يوم عمل.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">4. ضمان أعمال الصيانة</h2>
          <p>
            تقدم الشركة ضمان <strong>30 يوم</strong> على أعمال الصيانة العامة، و<strong>سنة كاملة</strong> على
            أعمال التشطيب الراقي، يشمل إصلاح أي عيب ناتج عن سوء التنفيذ دون مقابل.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">5. الحالات المستثناة</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>الأضرار الناتجة عن سوء الاستخدام أو الإهمال من قبل العميل.</li>
            <li>أي تعديلات يقوم بها طرف ثالث على الأعمال المنفذة.</li>
            <li>الكوارث الطبيعية والظروف القاهرة.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">6. آلية الاسترداد</h2>
          <p>
            تتم عملية الاسترداد خلال 7 إلى 14 يوم عمل بنفس وسيلة الدفع الأصلية بعد الموافقة على الطلب.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">7. التواصل</h2>
          <p>
            لتقديم طلب إلغاء أو استرداد:{' '}
            <a href="mailto:support@al-azab.co" className="text-primary font-semibold hover:underline">
              support@al-azab.co
            </a>{' '}
            أو الاتصال على: <a href="tel:+201004006620" className="text-primary font-semibold">201004006620+</a>
          </p>
        </section>
      </article>
    </PageLayout>
  );
};

export default RefundPolicyPage;
