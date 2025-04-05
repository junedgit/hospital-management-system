import { NavLink } from "react-router-dom";
import { useMenu } from "../Context/MenuProvider";
import Menu from "./Menu";

const SideNav = () => {
  const { toggleMenu } = useMenu();

  return (
    <div className="flex h-full">
      <div className="bg-[#06413C] w-20 px-2 flex flex-col justify-between text-white">
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="logo">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive && "font-extrabold text-[#0D8E83]"
              }
            >
              <img
                className="w-12 h-10 object-cover"
                src="/images/logo.svg"
                alt=""
              />
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              className="w-8 h-8 object-cover"
              src="images/sheild.svg"
              alt=""
            />
            <NavLink
              to={"new-patient-registration"}
              onClick={() => toggleMenu("reception")}
              className={({ isActive }) =>
                isActive && "font-extrabold text-[#0D8E83]"
              }
            >
              <img
                className="w-8 h-8 object-cover"
                src="images/person-add.svg"
                alt=""
              />
            </NavLink>
            <NavLink
              to={"op-queue"}
              onClick={() => toggleMenu("doctors")}
              className={({ isActive }) =>
                isActive && "font-extrabold text-[#0D8E83]"
              }
            >
              <img
                className="w-8 h-8 object-cover"
                src="images/stethoscope.svg"
                alt=""
              />
            </NavLink>
            <NavLink
              to={""}
              onClick={() => toggleMenu("op-queue")}
              className={({ isActive }) =>
                isActive && "font-extrabold text-[#0D8E83]"
              }
            >
              <img
                className="w-8 h-8 object-cover"
                src="images/biotech.svg"
                alt=""
              />
            </NavLink>
            <NavLink
              to={"/"}
              onClick={() => toggleMenu("op-queue")}
              className={({ isActive }) =>
                isActive && "font-extrabold text-[#0D8E83]"
              }
            >
              <img
                className="w-8 h-8 object-cover"
                src="images/home_storage.svg"
                alt=""
              />
            </NavLink>
            <NavLink
              to={"op-assessment"}
              onClick={() => toggleMenu("nurse")}
              className={({ isActive }) =>
                isActive && "font-extrabold text-[#0D8E83]"
              }
            >
              <img
                className="w-8 h-8 object-cover"
                src="images/cap.svg"
                alt=""
              />
            </NavLink>
            <NavLink
              to={"/"}
              onClick={() => toggleMenu("op-queue")}
              className={({ isActive }) =>
                isActive && "font-extrabold text-[#0D8E83]"
              }
            >
              <img
                className="w-8 h-8 object-cover"
                src="images/receipt.svg"
                alt=""
              />
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col items-center mb-6 gap-4 cursor-pointer">
          <NavLink
            to={"/"}
            onClick={() => toggleMenu("op-queue")}
            className={({ isActive }) =>
              isActive && "font-extrabold text-[#0D8E83]"
            }
          >
            <img
              className="w-8 h-8 object-cover"
              src="/images/settings.svg"
              alt=""
            />
          </NavLink>
          <NavLink
            to={"/"}
            onClick={() => toggleMenu("op-queue")}
            className={({ isActive }) =>
              isActive && "font-extrabold text-[#0D8E83]"
            }
          >
            <img
              className="w-8 h-8 object-cover"
              src="/images/log-out.svg"
              alt=""
            />
          </NavLink>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default SideNav;
