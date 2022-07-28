import Image from "next/image";
import { useRouter } from "next/router";

const myLoader = ({ src }) => {
  return `${src}`;
};

const MyImage = (props) => {
  const { src, alt } = props;
  const router = useRouter();
  const path = router.asPath;
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          paddingBottom: "50%",
        }}
      >
        <Image
          loader={myLoader}
          src={
            path.startsWith("/blog/")
              ? `https://raw.githubusercontent.com/codinasion/codinasion-blog/master${path}/${src}`
              : `${src}`
          }
          alt={`${alt}`}
          title={`${alt}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </>
  );
};

export default MyImage;
