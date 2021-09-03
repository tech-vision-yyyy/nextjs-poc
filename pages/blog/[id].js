import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/client";

import MainHeader from "../../components/MainHeader";
import truncate from "../../lib/truncate";

export default function BlogPost() {
  const [session] = useSession();

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Blog Post</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">Blog Post</h1>
      <Link href="/blog">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        <div className="featured-section">
          <div className="border-2 border-gray-200 rounded-md p-3 mb-6">
            <div>
              <h2>4 Ways to Build a Successful AI Startup</h2>
              <span className="text-gray-400">MM-DD-YYYY | Technology</span>
              <div className="my-3 bg-gray-800 grid justify-items-center">
                <Image
                  src="https://images.ctfassets.net/hrltx12pl8hq/zpozZxV0PvBUevOlUkpEK/220a46578f42ba182231eb7d91051f61/04-technology_1218220324.jpg"
                  width="480"
                  height="270"
                  className="text-center"
                  layout="fixed"
                  alt="Technology"
                ></Image>
              </div>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vel rhoncus ligula. Phasellus ac aliquet ex, id dictum tellus.
                Aenean malesuada ac mi eu porttitor. Donec ac leo nisl. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Vivamus auctor neque id nisi ultricies
                vestibulum. Vestibulum nec bibendum est. Suspendisse potenti.
                Suspendisse quis justo lobortis, commodo lacus et, aliquam
                dolor. Quisque et tincidunt felis. Sed lacus tellus, egestas sed
                tempus at, pulvinar eu justo. Proin suscipit tempus tempus. Duis
                condimentum, erat eu ullamcorper luctus, lorem metus faucibus
                lorem, eu mattis velit elit quis eros. Aenean in molestie lacus.
                Praesent eleifend lectus sit amet risus efficitur, at iaculis
                diam suscipit. Mauris sed gravida nunc.
              </p>
              <p className="mb-4">
                Donec nec lorem ac sem placerat sagittis non a est. Donec quis
                sodales libero. Nunc feugiat felis vitae ex ornare rhoncus. In
                et velit elit. Fusce aliquet dapibus eleifend. Phasellus et
                pretium eros, eget tincidunt metus. Sed dignissim scelerisque
                lacinia. In hac habitasse platea dictumst.
              </p>
              <p className="mb-4">
                Suspendisse lobortis, felis vel suscipit pulvinar, massa lectus
                pellentesque ipsum, sit amet commodo sem nibh vel lacus. Quisque
                sit amet risus non erat laoreet porttitor. Morbi leo mauris,
                imperdiet et mattis a, molestie vel sapien. Mauris sit amet
                congue est. Nulla a consequat massa, ut auctor nibh. Integer
                eget ligula tincidunt, fringilla ex vitae, mattis massa.
                Praesent tincidunt mauris vel nisi bibendum, molestie ornare dui
                hendrerit. Integer suscipit at mi nec consectetur. Vestibulum
                non imperdiet felis. Quisque id pharetra urna. Morbi tempus
                aliquam lacus in placerat. Quisque placerat, odio et hendrerit
                semper, ligula tellus ultricies velit, nec mollis lorem eros sed
                nulla. Nam egestas, erat a sodales pharetra, risus tortor
                consequat ligula, vel tincidunt leo purus ut metus.
              </p>
              <p className="mb-4">
                Morbi eu rutrum mi, congue ultrices mauris. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Duis at aliquet diam. Nunc porta faucibus
                dignissim. In commodo, turpis a pulvinar tincidunt, lorem velit
                iaculis enim, commodo aliquet nibh eros ac purus. Nullam in est
                laoreet ante tincidunt vestibulum a luctus orci. Mauris at elit
                ac urna sollicitudin fringilla. Nullam quis semper dolor. Etiam
                commodo nisi id libero pharetra elementum. Etiam tempus nisl et
                tellus consequat hendrerit. Vivamus vitae tincidunt est, in
                laoreet enim. Ut pellentesque cursus lorem, sit amet rhoncus
                lacus pharetra ac. Donec consectetur risus sit amet risus mollis
                aliquam. Duis molestie purus vitae placerat pretium. Aliquam sit
                amet lorem eget dui dapibus ullamcorper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      "/blog/ckt06w8zk0k0n0b37wb6p4lxt",
      "/blog/ckt06vo5k0jgx0c19h4cfsxns",
      "/blog/ckt06urqw0hso0b70nvvms6wv",
    ],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: {},
    // Seconds after which a page re-generation can occur
    revalidate: 30,
  };
}

BlogPost.auth = true;
