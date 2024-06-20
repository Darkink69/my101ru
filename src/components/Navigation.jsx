import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import station from "../store/station";
import { Input, Space } from "antd";
import { StepBackwardOutlined } from "@ant-design/icons";

const { Search } = Input;

const Navigation = observer(() => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className="fixed flex z-10 h-[50px] w-full px-5 shadow-md bg-sky-500 text-black">
      <div className="flex items-center justify-evenly">
        <h1>101ru</h1>

        {/* <Search
          className="pl-4"
          placeholder="Поиск треков"
          onSearch={onSearch}
          style={{ width: 200 }}
        /> */}
        <p>{station.id}</p>
      </div>
    </div>
  );
});

export default Navigation;
