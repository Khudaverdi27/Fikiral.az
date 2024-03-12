function EditPassword() {
  return (
    <Col span={10} className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex relative space-x-7 mb-10 items-center ">
          <figure className="size-24 mt-2 rounded-full editImage">
            {selectedImage || user.image ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                className="img-cover rounded-full "
                alt="user"
              />
            ) : (
              <span className="size-full text-5xl bg-gray-300  rounded-full border text-indigo-500 flex  justify-center items-center pb-2">
                {user?.userResponse?.userName?.charAt(0).toLowerCase()}
              </span>
            )}
            {(selectedImage || user.image) && (
              <button
                type="button"
                onClick={clearFileInput}
                className="editImage-overlay "
              >
                Sil
              </button>
            )}
          </figure>

          <button
            type="button"
            className="relative  border font-[500] text-base border-indigo-500 text-indigo-500 py-2 px-4 rounded-xl"
          >
            Şəkil yüklə
            <input
              ref={inputRef}
              onChange={(e) => handleFileUpload(e)}
              className=" right-1 opacity-0  rounded-xl  absolute w-full bg-slate-950"
              type="file"
            />
          </button>
        </div>

        <Input
          required={true}
          label={"İstifadəçi adı"}
          placeholder={"İstifadəçi adı"}
          type={"text"}
          maxLength={15}
          registerName={"userName"}
          patterns={{
            value: /\s*/,
            message: "Zəhmət olmasa boşluqlardan istifadə etməyin",
          }}
          onBlur={(e) => getUserName(e.target.value)}
          checkLoading={authCheckUserNameLoading}
        />
        <Input
          value={emailValue}
          label={"E-poçt"}
          placeholder={"E-poçt daxil edin"}
          type={"email"}
          maxLength={45}
          registerName={"gmail"}
          patterns={{
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}(?:\.[a-zA-Z]{2,})?$/,
            message: "Yazdığınız mail düzgün formatda deyil!",
          }}
          onBlur={(e) => getEmailValue(e.target.value)}
          checkLoading={authCheckLoading}
        />
        {emailValue && (
          <Input
            required={true}
            label={"Şifrə"}
            placeholder={"Şifrəni daxil edin"}
            type={"password"}
            maxLength={20}
            minLength={{
              value: 8,
              message: "Min 8 max 20 simvol",
            }}
            registerName={"password"}
            showUnShow={true}
          />
        )}

        <div className="mt-5">
          <p className="mb-2 text-base text-[#4C4B4E]">Maraqlarınızı seçin</p>
          <DropdownMenu
            loading={loading}
            dropName={
              <p className="text-[#4C4B4E] loginInput flex justify-between !font-normal !w-[434px] !py-[9px] ">
                <span> Kateqoriya</span>
                <FaAngleDown className="mt-1 text-gray-400" />
              </p>
            }
            dropDownItems={category}
            classes={"w-[314px] !top-[155px] max-h-[424px] overflow-x-hidden "}
          />
        </div>
        <div className=" !mt-16 flex justify-evenly">
          <Link
            to={"/home"}
            className=" whitespace-nowrap  text-indigo-500 py-2 px-4 rounded-xl 
  hover:outline outline-indigo-500 outline-[0.2px]"
          >
            Ləğv et
          </Link>
          <button
            type="submit"
            className=" border   bg-indigo-500 text-white py-2 px-4 rounded-xl"
          >
            Yadda saxla
          </button>
        </div>
      </form>
    </Col>
  );
}

export default EditPassword;
