import Background from "../assets/events-background.png";
import EventCard from "./EventCard";
import ActionButtonVariant from "./ActionButtonVariant";
import Divider from '../assets/divider.png';
import Skull from "../assets/skull.png";
import StarL from "../assets/starLeft.png";
import StarR from "../assets/starRight.png";
import razz from "../assets/events/Razz.png";
import bob from "../assets/events/bob.png";
import hunkaar from "../assets/events/hunkaar.png";
import vogue from "../assets/events/vogue.png";
import afreen from "../assets/events/afreen.png";
import rangshala from "../assets/events/rangshala.png";

const Events = () => {
    return ( 
        <div className=" w-full relative min-h-screen bg-cover bg-no-repeat bg-center p-0 m-0 flex flex-col items-center justify-center"
            style={{backgroundImage:"url("+Background+")"}}
        >
            <div className="absolute top-[-5rem] left-[50%] z-10">
                <img src={Skull} alt="skull" className="relative left-[-50%]" />
            </div>
            <img src={Divider} className="w-full absolute top-0" alt="divider" />

            <div className=" w-full flex justify-center">
                <div className="flex flex-col justify-start mt-28 mr-[72px] h-[80px] w-[41px]">
                    <img src={StarL} alt="star" />
                </div>
                <h1 className=" mt-32 mb-16 font-grobold font-medium text-6xl tracking-wide text-[#29009C]">Events</h1>
                <div className="flex flex-col justify-center mt-32 ml-16 h-[80px] w-[41px]">
                    <img src={StarR} alt="star" />
                </div>
            </div>
            
            <div className="w-full mx-auto flex flex-wrap justify-center gap-10 p-0 m-0 mb-14">
                <EventCard name={"Razzmattaz"} date={"9 Feb"} color="#FFF500" 
                text="A group dance competition" 
                image={razz}/>
                <EventCard name={"Battle of Bands"} date={"9 Feb"} color="#FF6B00"
                text="A competition between dexterous bands" 
                image={bob}/>
                <EventCard name={"Hunkaar"} date={"9 Feb"}
                text="The Nukkad Natak exhibit" 
                image={hunkaar}/>
            </div>
            <div className=" w-full mx-auto flex flex-wrap justify-center gap-10 mb-20">
                <EventCard name={"Vogue"} date={"10 Feb"} color="#FFF500"
                text="Ultimate showcase of glamor via fashion walks"
                image={vogue}
                />
                <EventCard name={"Afreen"} date={"8 Feb"} color="#FF6B00"
                text="The Shayari Night where emotions are expressed in verses."
                image={afreen}/>
                <EventCard name={"Rangshala"} date={"10 Feb"}
                text="A profound display of emotions via drama and stage shows."
                image={rangshala}/>
            </div>
            <div className=" mx-auto mb-52">
                <ActionButtonVariant title={"View More"}/>
            </div>
        </div>
     );
}
 
export default Events;