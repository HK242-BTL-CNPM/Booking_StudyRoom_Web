import BannerImg from "../../../assets/images/Banner_Home.png";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <>
      <div className="relative h-full w-full">
        <img
          src={BannerImg}
          className="object-cover w-full h-full" // Đảm bảo ảnh bao phủ toàn bộ container
          alt="Banner"
        />
        <div className="absolute left-0 top-[73%] w-full px-4">
          <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-4">
            <div className="md:basis-1/2 w-full">
              <Link to="../book">
                <button className="button1 w-full md:w-auto">
                  Đặt phòng ngay!
                </button>
              </Link>
            </div>

            <div className="flex flex-row md:basis-1/2 w-full">
              {/* <div className="flex items-center w-full relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm phòng học..."
                  className="w-full p-2 pr-10 border rounded"
                />
                <div className="absolute right-8 flex items-center">
                  <button
                    type="submit"
                    className="absolute flex items-center text-gray-600 hover:text-black"
                  >
                    <IoIosSearch size={20} />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
