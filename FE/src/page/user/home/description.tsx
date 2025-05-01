import PreRoomImg from "../../../assets/images/preroompic.png";
import MeetRoomImg from "../../../assets/images/meetingroompic.png";
import MentorRoomImg from "../../../assets/images/mentorroompic.png";
import IndiRoomImg from "../../../assets/images/indiroompic.png";
import TuhocImg from "../../../assets/images/tuhoc.png";
function Description() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5">
        <h1 className="text-3xl font-bold pt-10">Giới thiệu chung</h1>
        <h1 className="text-3xl font-bold pt-8 text-[#2563EB]">
          Thông tin các loại phòng
        </h1>

        <div className="flex flex-col lg:flex-row pt-10 gap-4">
          <div className="lg:basis-2/5 w-full aspect-[7/6] overflow-hidden">
            <img
              src={PreRoomImg}
              className="rounded-[2rem] w-[61%] mx-auto lg:w-full h-full object-contain lg:object-cover shadow-md hover:scale-105 transition duration-300 cursor-pointer"
              alt="phong-thuyet-trinh"
            />
          </div>

          <div className="flex flex-col lg:basis-3/5 w-full gap-5">
            <div className="w-full aspect-[6/3] overflow-hidden">
              <img
                src={MeetRoomImg}
                className="rounded-[2rem] w-full h-full object-cover shadow-md hover:scale-105 transition duration-300 cursor-pointer"
                alt="phong-thuyet-trinh"
              />
            </div>

            <div className="flex flex-row gap-5">
              <div className="w-1/2 aspect-[7/6] overflow-hidden">
                <img
                  src={MentorRoomImg}
                  className="rounded-[2rem] w-full h-full object-cover shadow-md hover:scale-105 transition duration-300 cursor-pointer"
                  alt="phong-thuyet-trinh"
                />
              </div>
              <div className="w-1/2 aspect-[7/6] overflow-hidden">
                <img
                  src={IndiRoomImg}
                  className="rounded-[2rem] w-full h-full object-cover shadow-md hover:scale-105 transition duration-300 cursor-pointer"
                  alt="phong-thuyet-trinh"
                />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold pt-16 text-[#2563EB]">
          Phòng tự học
        </h1>

        <div className="flex flex-col lg:flex-row mx-auto  py-8 gap-6">
          <div className="lg:basis-3/5 w-full flex items-center">
            <div className="border rounded-xl p-6 text-[#1e1e1e] leading-7 shadow-sm ">
              <p className="mx-auto text-2xl leading-10">
                " Không gian học tập hiện đại, linh hoạt, hỗ trợ học cá nhân,
                học nhóm và mentoring 1-1. Tích hợp công nghệ IoT, quản lý đặt
                chỗ thông minh qua web-app và mobile app. Sinh viên có thể đặt
                chỗ, check-in bằng QR, và sử dụng các tiện ích như màn hình
                trình chiếu, bảng trắng, điều hòa, đèn thông minh. Hệ thống tự
                động cập nhật trạng thái phòng, tối ưu hóa trải nghiệm học tập
                tại HCMUT."
              </p>
            </div>
          </div>

          <div className="lg:basis-2/5 w-full flex hover:scale-105 transition duration-300">
            <img
              src={TuhocImg}
              alt="khong-gian-hoc-tap"
              className="w-4/5 h-full rounded-2xl shadow-md lg:ml-auto mx-auto"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold pt-16  text-[#2563EB]">Vị trí</h1>

        <div className="flex flex-row border rounded-[2rem] pt-16 pb-16 mt-8 items-center justify-center">
          <div className="pr-20">
            <h3 className="text-center font-semibold mb-2 text-xl">Cơ sở 1</h3>
            <iframe
              className="mx-auto w-[90%] h-[250px] lg:w-[400px] lg:h-[300px]"
              width="400px"
              height="300px"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10.773349450000001,106.65963187043113+(Tr%C6%B0%E1%BB%9Dng%20%C4%90H%20B%C3%A1ch%20Khoa-CS1)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>

            <p className="mt-2 text-center font-semibold  ">
              Địa chỉ:{" "}
              <span className="font-normal">
                268 Đ. Lý Thường Kiệt, Phường 14, <br />
                Quận 10, Hồ Chí Minh, Việt Nam
              </span>
            </p>
          </div>

          <div className="pl-6">
            <h3 className="text-center font-semibold mb-2 text-xl ">Cơ sở 2</h3>
            <iframe
              className="mx-auto w-[90%] h-[250px] lg:w-[400px] lg:h-[300px]"
              width="400px"
              height="300px"
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=VRJ4+65C,%20Đông%20Hòa,%20Dĩ%20An,%20Bình%20Dương,%20Việt%20Nam+(Trường%20ĐH%20Bách%20Khoa%20TP.HCM-CS2)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
            ></iframe>

            <p className="mt-2 text-center font-semibold">
              Địa chỉ:{" "}
              <span className="font-normal">
                VRJ4+65C, Đông Hoà, Dĩ An, <br />
                Bình Dương, Việt Nam
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
