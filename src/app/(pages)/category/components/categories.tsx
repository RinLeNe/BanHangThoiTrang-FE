"use client";
import { DataNode } from "antd/es/tree";
import Tree from "antd/es/tree/Tree";
import { useState } from "react";

const AppCategory: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    "1",
    "1-1",
  ]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(["1"]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };
  const treeData: DataNode[] = [
    {
      title: "Giới tính",
      key: "1",
      children: [
        {
          title: "Nam",
          key: "1-1",
          //   children: [
          //     { title: "0-0-0-0", key: "0-0-0-0" },
          //     { title: "0-0-0-1", key: "0-0-0-1" },
          //     { title: "0-0-0-2", key: "0-0-0-2" },
          //   ],
        },
        {
          title: "Nữ",
          key: "1-2",
        },
      ],
    },
    {
      title: "Danh mục",
      key: "2",
      children: [
        {
          title: "Áo",
          key: "2-1",
          children: [
            {
              title: "Áo Thun",
              key: "2-1-1",
            },
            {
              title: "Áo Sơ Mi",
              key: "2-1-2",
            },
            {
              title: "Áo Polo",
              key: "2-1-3",
            },
            {
              title: "Áo Len",
              key: "2-1-4",
            },
            {
              title: "Áo Khoác",
              key: "2-1-5",
            },
            {
              title: "Áo Dài",
              key: "2-1-6",
            },
            {
              title: "Áo Kiểu",
              key: "2-1-7",
            },
          ],
        },
        {
          title: "Quần",
          key: "2-2",
          children: [
            {
              title: "Quần Baggy",
              key: "2-2-1",
            },
            {
              title: "Quần Jeans",
              key: "2-2-2",
            },
            {
              title: "Quần Kaki",
              key: "2-2-3",
            },
            {
              title: "Quần Short",
              key: "2-2-4",
            },
            {
              title: "Quần Tây",
              key: "2-2-5",
            },
            {
              title: "Quần Váy",
              key: "2-2-6",
            },
          ],
        },
      ],
    },
    {
      title: "Giá",
      key: "3",
    },
  ];
  return (
    <>
      <Tree
        style={{fontSize:"16px"}}
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        //@ts-ignore
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </>
  );
};
export default AppCategory;
