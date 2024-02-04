function Footer() {
  return (
    <footer className="bg-[#414141] px-[150px] py-6 text-white">
      <h4 className="font-semibold text-[18px]">Fikiral</h4>
      <div className="flex justify-between items-center">
        <p className="text-3xl font-semibold ">
          Fikirlərini bölüş, yeniliklərə imza at.
        </p>
        <div className="flex gap-x-[75px]  mt-[50px]">
          <div className="space-y-2">
            <h6 className="text-sm font-semibold">Yararlı</h6>
            <p className="text-xs">Haqqımızda</p>
            <p className="text-xs">Məxfilik</p>
            <p className="text-xs">Yardım</p>
          </div>
          <div className="space-y-2">
            <h6 className="text-sm font-semibold">Araşdır</h6>
            <p className="text-xs">Ana səhifə</p>
            <p className="text-xs">Profil</p>
            <p className="text-xs">Arxiv</p>
          </div>
          <div className="space-y-2">
            <h6 className="text-sm font-semibold">Əlaqə</h6>
            <p className="text-xs">info@fikiral.az</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
