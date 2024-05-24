import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function doLogout() {
      try {
        const response = await axios.get("../api/users/logout");
        if (response.data.success) {
          router.push("/Login");
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    doLogout();
  }, [router]);

  return (
    <div className="form-group mb-3 pt-3">
      <Link href="/Login">Login</Link>
    </div>
  );
}
