import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href="/">
            <div className="cursor-pointer p-1 h-[68px] min-w-[68px] flex flex-row items-center justify-between">

                <Image
                    src='/logo.png'
                    alt='Nikabond Logo'
                    width={85}
                    height={85}
                    priority
                />

                <div className="pr-1 py-1 flex flex-row items-center justify-between">

                    <div className="p-2 hidden lg:block pl-0">
                        <div className="pt-4 text-xl font-bold">
                            <p>W.T.F.M.I.</p>
                        </div>
                        <div className="pb-4 text-l font-semibold">
                            <p>Casting</p>
                        </div>
                    </div>
                </div>

            </div>
        </Link>

    )
}

export default Logo;