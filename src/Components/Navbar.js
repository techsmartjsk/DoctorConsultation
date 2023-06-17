import Logo from '../assets/logo.png'

export default function Navbar(){
    return(
        <nav className="bg-[#30D5C8] m-4 rounded-full p-4">
            <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className='rounded-full h-[50px]' />
                <span className="text-[#055875] ml-2 text-2xl">First Aid</span>
            </div>
            <div className="flex items-center space-x-12">
                <input
                type="text"
                placeholder="Search"
                className="p-2 border text-sm rounded-full w-[300px] border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <a href="/about" className="text-white">About Us</a>
                <div className="flex gap-4">
                    <button className="bg-white rounded-full hover:bg-[#30D5C8] hover:text-white text-[#30D5C8] px-4 py-2">
                        Signup
                    </button>
                    <button className="bg-[#055875] rounded-full hover:bg-white hover:text-[#055875] text-white px-4 py-2">
                        Login
                    </button>
                </div>
            </div>
            </div>
        </nav>
    )
}