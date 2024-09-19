import { Checkbox } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

const ResponsiveCard = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  return (
    <Fragment>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {data.map((item, index) => (
          <div className="border rounded-[10px] min-w-30" key={index}>
            <div className="flex items-center justify-between border-b p-2">
              <div>
                <Checkbox />
              </div>
              <div className="flex items-center gap-3">
                <RiDragMove2Fill className="text-black/60" />
                <BsThreeDots className="text-black/60" />
              </div>
            </div>
            <div className="py-2 flex flex-col items-center justify-center">
              <div className="w-full p-2 xl:p-4">
                <img src={item.image} alt="image" className="w-full" />
              </div>
              <h2 className="font-semibold text-center text-[12px] md:text-[16px]">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
};
export default ResponsiveCard;
