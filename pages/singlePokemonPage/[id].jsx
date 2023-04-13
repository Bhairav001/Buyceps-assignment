import { useRouter } from "next/router";
import React from "react";

const Page = ({ el }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return (
    <div>
      <div
        style={{
          border: "1px solid teal",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p>This is Pokemon -{id}</p>
        <img src={el.img_url} alt="" />
        <p>{el.number}</p>
        <h2>{el.name}</h2>
        <button
          style={{
            backgroundColor: "teal",
            border: "none",
            color: "white",
            textAlign: "center",
            padding: "10px 15px",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "15px",
          }}
        >
          {el.type}
        </button>
        <button
          style={{
            backgroundColor: "blue",
            border: "none",
            color: "white",
            textAlign: "center",
            padding: "10px 15px",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "15px",
          }}
        >
          {el.version}
        </button>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch("https://fluffy-tick-dirndl.cyclic.app/pokemon");
  let data = await response.json();

  return {
    paths: data.map((el) => ({ params: { id: el.id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const response = await fetch(
    `https://fluffy-tick-dirndl.cyclic.app/pokemon/${context.params.id}`
  );
  let data = await response.json();
  return {
    props: { el: data },
  };
}

export default Page;
