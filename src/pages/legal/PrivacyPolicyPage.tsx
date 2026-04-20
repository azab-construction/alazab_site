import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageLayout title="سياسة الخصوصية">
      <article dir="rtl" className="prose prose-lg max-w-none text-foreground space-y-6 leading-relaxed">
        <p className="text-muted-foreground">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">1. مقدمة</h2>
          <p>
            تحترم شركة <strong>العزب للمقاولات والتشطيبات</strong> خصوصية زوار وعملاء موقعها الإلكتروني،
            وتلتزم بحماية بياناتهم الشخصية وفقاً لأعلى المعايير المعمول بها. توضح هذه السياسة كيفية جمع
            البيانات واستخدامها وحمايتها.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">2. البيانات التي نجمعها</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>الاسم الكامل ورقم الهاتف والبريد الإلكتروني عند تقديم طلب صيانة أو عرض سعر.</li>
            <li>عنوان الموقع أو العقار لتنفيذ الخدمة المطلوبة.</li>
            <li>الصور والمرفقات التي يتم رفعها لتوضيح طبيعة العمل.</li>
            <li>بيانات تقنية مثل عنوان IP ونوع المتصفح لأغراض تحسين الأداء.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">3. كيفية استخدام البيانات</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>تنفيذ طلبات الصيانة والتشطيب والتواصل مع العميل.</li>
            <li>إصدار الفواتير وعروض الأسعار.</li>
            <li>تحسين جودة الخدمات وتجربة المستخدم على الموقع.</li>
            <li>إرسال إشعارات تتعلق بحالة الطلب فقط.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">4. مشاركة البيانات</h2>
          <p>
            لا نقوم ببيع أو تأجير بياناتك لأي طرف ثالث. قد نشارك بعض البيانات مع فنيين معتمدين تابعين
            للشركة فقط لأغراض تنفيذ الخدمة، أو مع الجهات الرسمية إذا اقتضى القانون ذلك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">5. حماية البيانات</h2>
          <p>
            نستخدم تقنيات تشفير حديثة (HTTPS) وقواعد بيانات محمية بصلاحيات وصول صارمة (RLS) لضمان
            عدم وصول أي طرف غير مصرح له إلى بياناتك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">6. حقوقك</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>طلب الاطلاع على بياناتك الشخصية المخزنة.</li>
            <li>طلب تعديل أو حذف بياناتك في أي وقت.</li>
            <li>سحب الموافقة على معالجة البيانات.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">7. التواصل معنا</h2>
          <p>
            لأي استفسار يخص الخصوصية يرجى التواصل عبر:{' '}
            <a href="mailto:support@al-azab.co" className="text-primary font-semibold hover:underline">
              support@al-azab.co
            </a>
          </p>
        </section>
      </article>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
