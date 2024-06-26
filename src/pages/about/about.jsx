function AboutPage() {
  return (
    <div className="sm:flex items-center max-w-screen-xl">
      <div className="sm:w-1/2 ">
        <h2 className="my-4 font-bold text-xl  sm:text-2xl px-3">Haqqımızda</h2>
        <article className="bg-white rounded-xl p-3 dark:text-black">
          Platforma sahibkarlara biznes ideyalarını paylaşmaq və investorlarla
          əlaqə qurmaq imkanı verir, eyni zamanda süni intellektin köməyi ilə
          innovativ fikirlər kəşf etmək və gələcəyin biznesini yaratmaq,
          vizyonunuzu reallaşdırmaq üçün istifadəçilərin xidmətindədir.
        </article>
        <div className="image object-center text-center">
          <img src="https://i.imgur.com/WbQnbas.png" />
        </div>
        <div className="text">
          <strong className="text-xl px-3">Sizə nə təklif edirik?</strong>
          <article className="bg-white rounded-xl p-3 dark:text-black mt-2">
            Saytımızda siz fikir mübadiləsi, layihələrin müzakirəsi və
            tərəfdaşlar tapmaq üçün geniş funksiyalar tapa bilərsiniz. Biz fikir
            əlavə etmək, şərh vermək və müzakirə etmək üçün rahat interfeys,
            həmçinin həmfikir insanların əməkdaşlıq etmək imkanını təklif
            edirik. Sahibkarlığın daim inkişaf edən mənzərəsini seyr edərkən bu
            kəşfiyyat və əməkdaşlıq səyahətində bizə qoşulun. Gəlin fikir
            mübadiləsi edək, fərziyyələrə meydan oxuyaq və təkcə biznesimizi
            deyil, həm də gələcəyimizi formalaşdıran ideyaları həyata keçirdək.
            Biznes ideyaları müzakirə etmək, layihələr üzərində əməkdaşlıq etmək
            və ya sadəcə olaraq fikirləri bölüşmək üçün saytımızda fikir
            paylaşmaqdan çəkinməyin. Gəlin birlikdə, baxışları reallığa çevirmək
            və innovasiyaların sərhəd tanımadığı bir dünya yaratmaq üçün
            bir-birimizə güc verək.
          </article>
        </div>
      </div>
      <div className="sm:w-1/2  space-y-5">
        <div>
          <strong className="text-xl px-3"> Missiyamız</strong>
          <article className="bg-white rounded-xl p-3 mt-2 dark:text-black">
            Bizim missiyamız biznes ideyalarının mübadiləsi prosesini
            cəmiyyətimizin bütün üzvləri üçün mümkün qədər rahat, effektiv və
            ruhlandırıcı etməkdir.
          </article>
        </div>
        <div>
          <strong className="text-xl px-3"> Məqsədimiz</strong>
          <article className="bg-white rounded-xl p-3 dark:text-black mt-2">
            Biz bu saytı dünyanın müxtəlif yerlərindən olan istər təcrübəli
            sahibkar, istərsə də yeni başlayanların öz biznes ideyalarını
            sərbəst ifadə edə bildikləri, layihələrini həyata keçirməkdə
            bir-birlərini ruhlandırmaq və dəstək tapa biləcəkləri virtual məkan
            yaratmaq məqsədi ilə açdıq. Əsas məqsədimiz isə hər kəsin öz
            ideyalarını uğurlu biznesə çevirmək üçün lazımi resursları tapa
            biləcəyi bir cəmiyyət yaratmaqdır.
          </article>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
