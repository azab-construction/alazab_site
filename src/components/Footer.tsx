
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-construction-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">ع</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">العزب</h3>
                <p className="text-xs text-construction-light">للمقاولات والتشطيبات</p>
              </div>
            </div>
            <p className="text-construction-light mb-4 leading-relaxed">
              شركة رائدة في مجال المقاولات والتشطيبات، نقدم خدمات متكاملة بأعلى معايير الجودة والاحترافية.
            </p>
            <div className="text-sm text-construction-light">
              <p>تأسست منذ أكثر من 20 عاماً</p>
              <p>500+ مشروع منجز</p>
              <p>100+ عميل راضي</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-construction-light hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-construction-light hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-construction-light hover:text-white transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-construction-light hover:text-white transition-colors">
                  مشاريعنا
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-construction-light hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link to="/ceo" className="text-construction-light hover:text-white transition-colors">
                  محمد عزب - المدير التنفيذي
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2 text-construction-light">
              <li>• تشطيب راقي</li>
              <li>• هوية العلامة التجارية</li>
              <li>• أوبر فيكس</li>
              <li>• التوريدات العمومية</li>
              <li>• الاستشارات الهندسية</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
            <div className="space-y-3 text-construction-light">
              <div>
                <p className="font-medium text-white">المقر الرئيسي - القاهرة</p>
                <p className="text-sm">مصر، القاهرة، المعادي، ش 500 متفرع من ش الجزائر</p>
                <p className="text-sm">هاتف: 201004006620+</p>
              </div>
              
              <div>
                <p className="font-medium text-white">فرع جدة - السعودية</p>
                <p className="text-sm">المملكة العربية السعودية، جدة، حي الصفا</p>
                <p className="text-sm">هاتف: 966547330897+</p>
              </div>

              <div>
                <p className="font-medium text-white">فرع الدقهلية - مصر</p>
                <p className="text-sm">مصر، الدقهلية، مدينة نبروه، ش المحطة</p>
                <p className="text-sm">هاتف: 201014536600+</p>
              </div>
              
              <div className="pt-2">
                <p className="text-sm">
                  البريد الإلكتروني: <a href="mailto:support@al-azab.co" className="hover:text-white">support@al-azab.co</a>
                </p>
                <p className="text-sm">
                  الموقع الإلكتروني: <a href="https://al-azab.co" target="_blank" rel="noopener noreferrer" className="hover:text-white">al-azab.co</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-construction-light/30 my-8" />

        {/* Copyright */}
        <div className="text-center text-construction-light text-sm">
          <p className="mb-2">
            جميع الحقوق محفوظة © 2024 العزب للمقاولات والتشطيبات
          </p>
          <p className="text-xs leading-relaxed">
            العزب للإنشاءات - علامة تجارية مسجلة D-U-N-S No: 849203826
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
