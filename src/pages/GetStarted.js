import GetStartedNav from "../common/GetStartedNav";
import GetStartedHero from "../components/GetStartedPage/Hero";
import TrendingOnMedium from "../components/GetStartedPage/TrendingOnMedium";
import Post from "../components/Post";

export default function GetStarted(){
    return(
             <div className="">
         <GetStartedNav/>
         <GetStartedHero/>
         <TrendingOnMedium/>
        </div>
    )
}