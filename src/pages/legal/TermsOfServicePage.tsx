import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

const TermsOfServicePage: React.FC = () => {
  return (
    <PageLayout title="الشروط والأحكام">
      <article dir="rtl" className="prose prose-lg max-w-none text-foreground space-y-6 leading-relaxed">
        <p className="text-muted-foreground">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">1. قبول الشروط</h2>
          <p>
            باستخدامك لموقع شركة <strong>العزب للمقاولات والتشطيبات</strong> أو أي من خدماتها، فإنك
            توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي بند، يرجى عدم استخدام
            الموقع أو طلب الخدمات.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">2. الخدمات المقدمة</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>أعمال التشطيبات الراقية والديكورات الداخلية.</li>
            <li>خدمات الصيانة العامة (سباكة، كهرباء، تكييف، نجارة، دهانات).</li>
            <li>هوية العلامة التجارية والتصميم المعماري.</li>
            <li>التوريدات العمومية ومواد البناء.</li>
            <li>خدمة UberFix للصيانة السريعة.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">3. عروض الأسعار والطلبات</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>جميع عروض الأسعار صالحة لمدة 14 يوماً من تاريخ الإصدار ما لم يُذكر خلاف ذلك.</li>
            <li>تأكيد الطلب يستلزم دفع دفعة مقدمة وفقاً للاتفاق.</li>
            <li>الأسعار المعروضة على الموقع استرشادية وقد تختلف حسب الموقع وحجم العمل.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">4. التزامات الشركة</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>تنفيذ الأعمال وفق المواصفات والمدة الزمنية المتفق عليها.</li>
            <li>استخدام مواد ذات جودة معتمدة من موردين موثوقين.</li>
            <li>توفير ضمان على أعمال التشطيب والصيانة وفق طبيعة العمل.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">5. التزامات العميل</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>تقديم بيانات صحيحة عند طلب الخدمة.</li>
            <li>توفير الوصول الآمن لموقع العمل في المواعيد المتفق عليها.</li>
            <li>سداد المستحقات في المواعيد المحددة بالعقد.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">6. الملكية الفكرية</h2>
          <p>
            جميع المحتويات على الموقع من تصاميم وصور وشعارات ونصوص هي ملكية خاصة لشركة العزب،
            ولا يجوز نسخها أو إعادة استخدامها بدون إذن كتابي مسبق.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">7. تعديل الشروط</h2>
          <p>
            تحتفظ الشركة بحق تعديل هذه الشروط في أي وقت، ويسري التعديل فور نشره على الموقع.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-construction-primary mb-3">8. القانون الحاكم</h2>
          <p>
            تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتختص محاكم القاهرة بالفصل في أي نزاع
            قد ينشأ عن تطبيقها.
          </p>
        </section>
      </article>
    </PageLayout>
  );
};

export default TermsOfServicePage;
