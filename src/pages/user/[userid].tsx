import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function User() {
  const router = useRouter();
  const { userid } = router.query;

  const { data: user, isLoading } = api.users.getUser.useQuery(Number(userid));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Image
        src={user?.imageURL ?? ""}
        alt="user-image"
        width={200}
        height={200}
      />
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
