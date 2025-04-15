import { useState } from "react";
import LikeButton from "./like-button";

function Header({ title }) {
  return <h1>Title {title ? title : "Default"}</h1>;
}

export default function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  return (
    <div>
      <Header title="React" />
      <Header title="" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
