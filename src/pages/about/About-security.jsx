import { Helmet } from "react-helmet";

function AboutSecurity() {
  return (
    <main>
      <Helmet>
        <title>Fikiral / Gizlilik Siyasəti</title>
      </Helmet>
      <section>
        <h1 className="text-indigo-500 font-bold text-xl text-center">
          Gizlilik Siyasəti
        </h1>
        <article className="text-sm pt-5">
          Fikiral veb saytı istifadəsi zamanı toplanan şəxsi məlumatların
          gizliliyinə əhəmiyyət verir. Bu gizlilik siyasəti, Fikiral veb
          saytının istifadəsi zamanı topladığımız şəxsi məlumatları əhatə edir.
          Zəhmət olmasa, bu gizlilik siyasətini diqqətlə oxuyun ki, şəxsi
          məlumatlarınızın necə istifadə edildiyini və qorunduğunu anlayasınız.
        </article>
      </section>
      <section className="pl-5 pt-5 space-y-2">
        <h3 className="text-primaryBlack font-semibold text-sm">
          Toplanan Məlumatlar və İstifadəsi
        </h3>
        <article className="text-sm">
          Fikiral, veb saytı ziyarət etdiyiniz zaman müəyyən məlumatları toplaya
          bilər. Bu məlumatlar, ziyarət etdiyiniz səhifələrin adları, IP
          ünvanınız, brauzer növünüz və digər statistik məlumatlar uyğun olaraq
          veb sayt ilə əlaqənizin növünə əsasən şəxsi məlumatlarınız ola bilər.
          Bu məlumatlar, veb saytının təkmilləşdirilməsi, məzmunun
          fərdiləşdirilməsi və istifadəçi təcrübəsinin yaxşılaşdırılması məqsədi
          ilə istifadə edilə bilər.
        </article>
        <h3 className="text-primaryBlack font-semibold text-sm">Cookies</h3>
        <article className="text-sm">
          Fikiral, cookies vasitəsilə məlumatları toplaya və saxlaya
          bilər.Cookies ziyarət etdiyiniz veb saytlar tərəfindən brauzerinizə
          göndərilən kiçik mətn fayllarıdır. Bu fayllar, sizin tərəfdaşlıq və
          referanslarınızı yadda saxlamaq, veb saytı performansını analiz etmək
          və reklamları məqsədə uyğunlaşdırmaq kimi müxtəlif məqsədlər üçün
          istifadə oluna bilər. Lakin, rədd etmək və ya bununla bağlı
          xəbərdarlıq almağı seçməklə, bəzi veb sayt xüsusiyyətlərinin düzgün
          işləməyəcəyini diqqətə alın.
        </article>
        <h3 className="text-primaryBlack font-semibold text-sm">
          Digər Veb Sayt Linkləri
        </h3>
        <article className="text-sm">
          Fikiral veb saytında başqa veb saytlarına keçid linkləri ola bilər. Bu
          xarici veb saytların məzmunu və gizlilik siyasətləri ilə əlaqəli heç
          bir nəzarətimiz yoxdur və bu veb saytlarının siyasətləri Fikiral'in
          nəzarəti altında deyil. Sizə tövsiyə edirik ki, bu linklərə keçid
          etmədən əvvəl bu veb saytlarının gizlilik siyasətini oxuyun.
        </article>
        <h3 className="text-primaryBlack font-semibold text-sm">
          Gizlilik Siyasətində Dəyişikliklər
        </h3>
        <article className="text-sm">
          Fikiral gizlilik siyasətini tələb olunduqda yeniləmə hüququnu qoruyur.
          Bu səhifədə hər hansı bir dəyişiklik dərc edildiyində, biz bu səhifəni
          dəyişdiririk və yenilənmiş bir versiyasını təqdim edirik. Beləliklə,
          bu səhifəni daimi olaraq nəzərdən keçirmənizi tövsiyə edirik.
        </article>
      </section>
    </main>
  );
}

export default AboutSecurity;
