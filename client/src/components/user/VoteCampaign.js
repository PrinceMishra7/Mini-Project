import React, { useEffect, useState } from "react";
import { getUserVotingCampaign, makevote } from "../config";
import { useNavigate } from "react-router-dom";
import VerifiedBadge from "../../images/pngwing.com.png";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
const VoteCampaign = () => {
  let navigate = useNavigate();
  const [campaign, setcampaign] = useState(null);
  useEffect(() => {
    getUserVotingCampaign().then((res) => setcampaign(res));
  }, []);

  return (
    <div>
    <Navbar/>
      {/* {campaign?campaign.map((c)=><div>
            <div>Name: {c[0]}</div>
            <div>Description: {c[1]}</div>
            <div>Receipent: {c[2]}</div>
            <div>Goal: {Number(c[3])}</div>
            <div>
                <button onClick={()=>makevote(Number(c[10]),1)}>Approve</button>
                <button onClick={()=>makevote(Number(c[10]),0)}>Reject</button>
            </div>
            </div>):null} */}

      <div className="flex">
        <Sidebar active="3" />
        <div class="container px-5 my-5 ">
          {campaign
            ? campaign.map(
                (c) => (
                  <div class=" outline outline-offset-2 outline-green-500 relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2">
                    <div class="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                      <div class="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom">
                        <img src={c[13][1]} className="w-full h-full" />
                      </div>
                    </div>

                    <div class="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                      <div class="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
                        <div className="flex grid grid-cols-2">
                          <h3 class="hidden md:block font-bold text-2xl text-gray-700">
                            {c[0]}
                          </h3>
                          {c[5] ? (
                            <img
                              className="py-1 "
                              src={VerifiedBadge}
                              width={20}
                              height={20}
                            />
                          ) : null}
                        </div>
                        <h4 class="hidden md:block text-md text-gray-400">
                          By {c[15]}
                        </h4>
                        <p class="text-gray-600 text-justify">{c[1]}</p>
                        <div className="flex justify-between">
                          <h3 class="hidden md:block font-bold text-lg text-gray-700">
                            Votes:{" "}
                          </h3>
                          <h3 class="hidden md:block font-bold text-lg text-gray-700">
                            {(Number(c[14]) / c[12].length) * 100}%
                          </h3>
                        </div>
                        <div className="flex justify-between">
                          <h3 class="hidden md:block font-bold text-lg text-gray-700">
                            Contributors:{" "}
                          </h3>
                          <h3 class="hidden md:block font-bold text-lg text-gray-700">
                            {c[9].length}
                          </h3>
                        </div>
                        <div class="flex justify-between mb-1">
                          <span class="text-base font-medium text-black">
                            {Number(c[4])} ETH/ {Number(c[3])} ETH
                          </span>
                          <span class="text-sm font-medium text-black">
                            {((Number(c[4]) / Number(c[3])) * 100).toFixed(2)}%
                          </span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            class="bg-blue-600 h-2.5 rounded-full"
                            style={{
                              width:
                                ((Number(c[4]) / Number(c[3])) * 100).toFixed(
                                  2
                                ) + "%",
                            }}
                          ></div>
                        </div>
                        <div class="flex justify-end mt-6">
                        <div>
                          <button class="bg-green-500 hover:bg-green-700 text-white w-32 font-bold py-2 px-4 mr-2 rounded-full" onClick={()=>makevote(Number(c[10]),1)} >
                            In Favour
                          </button>
                          <button class="bg-red-500 hover:bg-red-700 text-white w-32 font-bold py-2 px-4 mr-2 rounded-full" onClick={()=>makevote(Number(c[10]),0)} >
                            Against
                          </button>
                        </div>
                          <button
                            class="px-6 py-2 leading-5 text-white font-bold transition-colors duration-200 mr-2 transform bg-green-900 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-600"
                            onClick={() =>
                              navigate("/user/donate/" + Number(c[8]))
                            }
                          >
                            View More
                          </button>
                        </div>
                        
                      </div>
                    </div>
                  
                  </div>
                )
                // <div>
                //   <div>Name: {c[0]}</div>
                //   <div>Description: {c[1]}</div>
                //   <div>Receipent: {c[2]}</div>
                //   <div>Goal: {Number(c[3])}</div>
                //   <div>Amount Raised: {Number(c[4])}</div>
                //   <div>Contributors: </div>
                //   <div>
                //     <input type='number' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                //     <button onClick={() => donatetocampaign(Number(c[10]), amount)}>Donate</button>
                //   </div>
                // </div>
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default VoteCampaign;
