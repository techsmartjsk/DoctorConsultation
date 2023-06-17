import HeroImage from '../assets/Hero.svg'
export default function Hero(){
    return(
        <div>
            <div className='flex gap-10 items-center mx-20'>
                <div className='w-[50%]'>
                    <img src={HeroImage}></img>
                </div>
                <div className='w-[50%] flex flex-col gap-10'>
                    <h1 className='text-5xl font-bold'>First Aid Consulation App</h1>
                    <h3 className='text-2xl'>Fast, reliable healthcare support at your fingertips.</h3>
                </div>
            </div>
        </div>
    )
}