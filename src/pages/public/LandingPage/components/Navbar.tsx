export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-gray-500">

        <div className="flex items-center w-full justify-between ">

            <nav className="px-4 py-4 flex items-center gap-5 ml-7">
                <div className="text-2xl font-bold text-blue-600 flex gap-[0.17rem] items-center">
                    <img src="final_gc_logo_removebg.png" className="h-9 w-9 "/>
                    <span className="flex flex-col text-[0.9rem]">
                        <span className="font-bold text-vol-300">Github</span>
                        <span className="font-bold text-vol-950">Center</span>
                    </span>
                </div>
                <ul className="flex ml-6 space-x-6 text-cgray-dtext font-sans font-medium text-sm">
                <li><a href="#services" className="hover:text-vol-300">Services</a></li>
                <li><a href="#pricing" className="hover:text-vol-300">Pricing</a></li>
                <li><a href="#contact" className="hover:text-vol-300">Contact</a></li>
                <li><a href="#about" className="hover:text-vol-300">About</a></li>
                </ul>
            </nav>

            <div className="mr-4 flex items-center gap-3 ">
                <button className="text-sm hover:bg-gray-100 rounded-sm px-2 py-1 cursor-pointer font-medium"> Sign out</button>
                <button className="black-button text-xs">Dashboard</button>
            </div>

        </div>

    </header>
  );
}
