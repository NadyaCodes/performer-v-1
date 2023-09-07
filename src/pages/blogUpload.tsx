import { useEffectOnce } from "@component/components/AddProgramResult/helpers";
import { api } from "@component/utils/api";
import { NextPage } from "next";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { tryingHardBlogObject } from "@component/data/InitialBlogs";

export type BlogObj = {
  author: string;
  slug: string;
  title: string;
  body: string;
  image: string;
};

//#H2#: h2
//#H3#: bold
//####: divider
// const newBody = `#H2#Who am I? \nWhen you're at theatre school, your identity and “type” is constantly scrutinized. This isn't always a BAD thing. Theatre school is a fantastic time to focus on finding your identity because you will never find a more sheltered environment to play with such a variety of styles. The complexity is more because the student/teacher dynamic traditionally favours the teacher as the authority. An artist's identity is more personal, however, and examining facts and trends isn't necessarily the best way to find it. While it’s certainly worth experimenting with whatever your faculty members recommend, your opinion matters too. A LOT. Theatre school may be the perfect place to play with your identity, but finding it might take a little more soul searching than just doing what you're told. \nI know you might be saying, “I just want to work, and if these professionals know what I need to do to get a job, that’s clearly what I need to do”. Blindly following recommendations will only get you so far, though. You may not have a solid identity when you enter theatre school, but you certainly know more about yourself than your teachers do. They weren't raised in the same environment, nor can they hear your innermost thoughts and opinions. Their suggestions are worth exploring, but don’t automatically adopt them without question. They are only right if they feel right for you.\n#H3#A faculty member’s recommendations are coming from a place of objectivity and human bias. Teachers don't have omnipotent wisdom. Only you can be the ultimate authority when it comes to your identity. \nEssentially, a teacher's job is to use their expertise to recommend what they would do in your situation. I will repeat that: they are using their expertise to RECOMMEND what THEY would do in your situation. A recommendation is not a solid fact that leads to greatness. They are also not you and they are making these recommendations based on their experience, not yours. Their job is to help you discover your inner artist, not dictate your only path to success.\n#H3#They are the industry professional, but you are the YOU professional.\nIt is your career, and it is imperative that whatever direction you go in is comfortable and inspiring for YOU. \nHOWEVER...\n#H2#What if they don't understand me? Is my theatre school experience a waste? \nIf there is a discrepancy between how your mentors see you and how you see yourself, don’t automatically throw out everything they say. Use that knowledge to figure out WHY they thought those things. You can still progress towards finding your identity in a theatre school that doesn't understand you. \nIf they have misconceptions about you, it means that you're likely giving off  unclear signals. These could be a blend of your skillset, physical attributes and personality. Either that, or they’re just stuck in the industry’s traditional bias rut that we’re all hopefully trying to move beyond. \nThe best thing for you to do is pinpoint what these signals are so you can understand them. Once you see them, you'll be able to do something about them, whether that means changing your habits or simply voicing your concerns. Your faculty aren't the only people who'll assume these things about you. These impressions will become recurring themes until you address them. \n#H2#My theatre school misunderstood my identity and here's what it looked like for me: \nMy work ethic as always been a key component of my identity. Though you may think you can't go wrong with a good work ethic, I only recently realized how much of an impact it had on my theatre school experience. \nSomewhere along the line in my academic life, I learned that the harder I worked at something, the sooner it would go away. While this is logical, I've learned that it sends complicated signals since it's not what people normally do. When someone works hard at something, one assumes they enjoy it (or struggles with it...but that wasn't the case here). So, while my brain said, “I'll work really hard on this so that it will go away sooner and we can move on to the stuff I really want to do”, my teachers saw, “wow, she’s working really hard at this, she must really enjoy it…I’ll give her more of THAT”. \nI totally could've gotten more out of the experience if I spoke to someone with words instead of working harder at home every night. Imagine how different that experience would've been if I had spent those years working on things that inspired me and pushed me in a direction I wanted to go! \n#H2#Sooo...how can my theatre school help me find my identity? \nIt’s always worth taking a mentor’s suggestions. You might turn out to have a surprise affinity for something new! It’s also totally fine if you try it and realize it’s not for you, though...EVEN IF YOU’RE GOOD AT IT. Not everyone enjoys the things they're naturally good at. Though you can achieve a certain standard with strictly talent, skill and hard work, chances are you'll fizzle out without a passionate drive. There’s a certain calibre that can only happen when an artist loves what they do. Other people will have the skillset AND the love behind it, and those are the ones who will flourish. \nIf your faculty has an idea, try it out wholeheartedly, even if it seems outlandish. You won't know what it feels like if you don't legitimately try. If it's not a good fit, your next step is to figure out why you were perceived to be that way in the first place. If one person thought you fit into a certain box, chances are, other people will think that, too. Once you understand why, you'll be able to steer things in a more suitable direction. \nIf you're on a long, frustrating search to find your identity as a performer, know that it’s all a part of the process. Sometimes the only way to discover what works is to rule out a bunch of things that don’t. All this means is you will appreciate home that much more once you find it! \n####\nIf you're LOOKING for a theatre school in Canada, you came to the right place! ActSingDanceRepeat.com is the only one-stop-shop that lists all of the options available to you. Whether you're an actor, singer, dancer or all of the above, you're sure to find your perfect post-secondary program. Start exploring the site today!`;

type BlogUploadProps = {
  admin: boolean;
};

const BlogUpload: NextPage<BlogUploadProps> = ({ admin }) => {
  const [newPost, setNewPost] = useState<null | BlogObj>(null);

  const { mutate: createPost } = api.post.add.useMutation({
    async onSuccess(data) {
      console.log("Created Post: ", data.title);
      setNewPost(data);
    },
    onError(error) {
      console.log("create Post error: ", error);
    },
  });

  const addPost = (blogObj: BlogObj) => {
    return createPost(blogObj);
  };

  useEffectOnce(() => {
    addPost(tryingHardBlogObject);
  });
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {admin ? (
        <div className="flex flex-col">
          <div>New Post:</div>
          <div>{newPost?.title}</div>
          <div>{newPost?.author}</div>
          <div>{newPost?.slug}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: newPost?.body.replace(/\n/g, "<br>") || "",
            }}
          />

          <div dangerouslySetInnerHTML={{ __html: newPost?.image || "" }} />
        </div>
      ) : (
        <div>
          <div>You are not authorized to view this page</div>
        </div>
      )}
      <Link href="/">
        <button className="m-5 rounded-full border-2 border-cyan-900 p-3">
          Home
        </button>
      </Link>
    </div>
  );
};

export default BlogUpload;

export const getServerSideProps: GetServerSideProps<BlogUploadProps> = async (
  context
) => {
  const session = await getSession(context);

  const admin = session?.user?.id === process.env.ADMIN_USER_ID;

  return {
    props: {
      admin,
    },
  };
};
