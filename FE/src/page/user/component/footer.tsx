import { Link } from "react-router-dom";
import StudySpaceLogo from "../../../assets/images/StudySpace_logo.png";
import {
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";

function Footer() {
  return (
    <>
      <hr className="border-t border-gray-300 opacity-50 mt-12 mb-6" />
      <div className="w-full px-6 md:px-12 lg:px-20 pb-0">
        {/* Logo + title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <Link to="../home">
            <img
              src={StudySpaceLogo}
              alt="StudySpace Logo"
              className="h-[60px] w-[60px]"
            />
          </Link>
          <div>
            <div className="text-gray-800 text-[16px] leading-[1.5] font-bold">
              STUDYSPACE
            </div>
            <div className="text-gray-500 text-[10px] leading-[1] italic font-medium">
              “Học tập hoàn hảo”
            </div>
          </div>
        </div>

        {/* Footer content */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-6">
          {/* Contact */}
          <div className="flex-1 min-w-[250px] space-y-2">
            <div className="flex items-start">
              <AiOutlineEnvironment className="mt-1" />
              <p className="pl-2 text-sm">
                268 Đ. Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
              </p>
            </div>
            <div className="flex items-center">
              <AiOutlinePhone />
              <p className="pl-2 text-sm">0987 654 321</p>
            </div>
            <div className="flex items-center">
              <AiOutlineMail />
              <p className="pl-2 text-sm">abc@gmail.com</p>
            </div>
          </div>

          {/* Menu */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="font-bold text-base mb-2">Về chúng tôi</h2>
            <div className="flex flex-col space-y-1">
              <Link className="text-[#666B72] font-medium pl-1" to="../">
                Trang chủ
              </Link>
              <Link className="text-[#666B72] font-medium pl-1" to="../book">
                Đặt phòng
              </Link>
              <Link className="text-[#666B72] font-medium pl-1" to="../history">
                Lịch sử đặt phòng
              </Link>
              <Link className="text-[#666B72] font-medium pl-1" to="../status">
                Trạng thái phòng
              </Link>
              <Link className="text-[#666B72] font-medium pl-1" to="../report">
                Báo cáo sự cố
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="font-bold text-base mb-2">Hỗ trợ</h2>
            <div className="flex flex-col space-y-1">
              <Link className="text-[#666B72] font-medium pl-1" to="">
                FAQs
              </Link>
              <Link className="text-[#666B72] font-medium pl-1" to="">
                Chính sách
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="font-bold text-base mb-2">Theo dõi chúng tôi</h2>
            <div className="flex gap-4 mt-2">
              {/* <Link to="../"> */}
              <AiOutlineFacebook size={32} />
              {/* </Link> */}
              {/* <Link to="../book"> */}
              <AiOutlineInstagram size={32} />
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom blue bar */}
      <div
        className="w-full mt-10"
        style={{
          backgroundColor: "#1e40af",
          height: "20px",
          marginTop: "25px",
        }}
      ></div>
    </>
  );
}

export default Footer;
