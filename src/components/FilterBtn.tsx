'use client';
import { useState } from 'react';
import { Tag } from "@prisma/client";
import TopicList from './TopicList';

export interface Props {
  tags: Tag[];
  setSelectedTag: Function;
}

export default function FilterBtn(props: Props) {
  function selectedTagChange(e: any) {
    props.setSelectedTag(e.target.value)
  }

  return (
    <select onChange={selectedTagChange} className="border-4 border-leaf-200 bg-inherit rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold">
      <option className="text-sm" value={0}>Filter by</option>
      {
        props.tags.map(tag => {
          return (<option className="text-sm" value={tag.tag_id} key={tag.tag_id}>{tag.tag}</option>);
        })
      }
    </select>
  );
}