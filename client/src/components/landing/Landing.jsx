import Destinations from "./Destinations/Destinations"
import Features from "./Features/Features"
import Footer from "./Footer/Footer"
import Hero from "./Hero/Hero"
import Navbar from "./Navbar/Navbar"
import Steps from "./Steps/Steps"
import SubscribeSection from "./SubscribeSection/SubscribeSection"

const Landing = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    <Navbar/>
    <Hero/>
    <Features/>
    <Destinations/>
    <Steps/>
    <SubscribeSection/>
    <Footer/>
    </div>
  )
}

export default Landing
