import Image from "next/image";
import Link from "next/link";

import styles from "../../container.module.css";
import Layout from "../components/layout";

const ImageComp = () => (
  <Layout>
    <div
      className={`d-flex justify-content-center align-items-center bg-secondary ${styles.myContainer}`}
    >
      <Image
        src="/images/DSC400_001.JPG" // Route of the image file
        height={480} // Desired size with correct aspect ratio
        width={600} // Desired size with correct aspect ratio
        alt="Some Image www"
      />
      <br />
      <Link href={`/`}> Back </Link>
    </div>
  </Layout>
);

export default ImageComp;
