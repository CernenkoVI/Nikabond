import Link from "next/link";
import MyAccountComponent from "@/app/components/mypage/MyAccountComponent";
import MyActorsComponent from "@/app/components/mypage/MyActorsComponent";
import MyCollectionsComponent from "@/app/components/mypage/MyCollectionsComponent";
import MyProjectsComponent from "@/app/components/mypage/MyProjectsComponent";
import MyRolesComponent from "@/app/components/mypage/MyRolesComponent";

const MyPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">

            <MyAccountComponent />

            <MyProjectsComponent />

            <MyActorsComponent />

            <MyCollectionsComponent />

            <MyRolesComponent />

            <Link href="/inbox/1">
                <h1 className="my-2 mb-2 text-xl cursor-pointer select-none w-[200px] rounded-xl bg-lime-100 p-2">Inbox</h1>
            </Link>


        </main>
    )
}

export default MyPage;