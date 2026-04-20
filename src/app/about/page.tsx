import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.author.name} — ${SITE.description}`,
};

export default function AboutPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">About</h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          Hi, I&apos;m <strong>{SITE.author.name}</strong>.
        </p>

        <h2>블로그 작성 이유</h2>

        <h3>1. 나도 누군가에게 공감이 갈만한 글을 작성하고 싶다. (작성할 실력을 쌓고 싶다)</h3>
        <p>
          나는 현재 AI agent 개발을 하고 있다. AI가 글을 너무 잘 쓴다.
          하지만 이번에 사내 블로그나 이력서 작성을 AI한테 맡겨 보았는데 맘에 들지 않았다.
          이유는 너무 AI가 쓴 것 같았다.
          요즘 AI 양산형 블로그들을 심심치 않게 본다.
          그런 글들은 글에서 소울이 느껴지지 않아 글에 제대로 공감하기 어렵다.
          반면에 직접 쓴 글이라는 느낌을 받으면 뭔가 모를 따뜻함이 느껴진다.
        </p>

        <h3>2. 글쓰기 능력 / 지식의 저장</h3>
        <p>
          남들이 보는 것을 인지하고 글을 작성하는 것과 그렇지 않은 글은 많이 다르다.
          글을 쓰기 위한 준비부터 단어선택, 문장구조까지 볼 사람을 생각하기에
          글의 구조나 내용에 대한 디테일을 생각하면서 작성한다.
          그렇기에 남이 보는 글을 작성하는 것은 나의 글쓰기 실력은 물론이고
          지식을 정리하는 사고능력에도 도움이 많이 될 것이라 생각한다.
        </p>

        <h2>Contact</h2>
        <p>
          Feel free to reach out at{" "}
          <a href={`mailto:${SITE.author.email}`}>{SITE.author.email}</a>.
        </p>
      </div>
    </>
  );
}
