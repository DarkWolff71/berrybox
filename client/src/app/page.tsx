"use client";

import { Input } from "@/components/input";
import SparklesFullPageWrapper from "@/components/sparklesFullPageWrapper";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  let [title, setTitle] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);

  let [content, setContent] = useState<string>("");
  let [id, setId] = useState<number>();

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setLoading(true);
    e.preventDefault();
    if (!id) return;
    try {
      let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        params: {
          id,
        },
      });

      let parsedData = JSON.parse(response.data.data);

      setTitle(parsedData.title);
      setContent(parsedData.content);
    } catch (e) {
      console.log("Failed to fetch data:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SparklesFullPageWrapper>
      <div className="flex justify-center items-center mt-10 w-screen space-x-5 ">
        <div className="font-semibold	text-white">
          {"Choose a number between 1 and 100"}
        </div>
        <div className="">
          <Input
            type="number"
            max={100}
            min={1}
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
          ></Input>
        </div>
        <Button onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>
      </div>
      {title && content ? (
        <div className="space-y-5 px-6 mt-16">
          <div className="rounded-md text-white font-bold text-xl bg-black flex items-center justify-center">
            {title}
          </div>
          <div className="rounded-lg text-white border-slate-600 border-2 bg-black p-4">
            {content}
          </div>
        </div>
      ) : null}
    </SparklesFullPageWrapper>
  );
}
