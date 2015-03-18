//Star and smurf follow different simulation rules
var smurf = false;
var star = false;

//Check if the user has selected a level
var selected = false;

//Check if the layout has converged
var converged = false;

var stopSimulation = false;

//To keep track of whether to spawn next worm
var stageEnded = false; 


function start(dataset, worm) 
{
  var i = 0;
  dfs_max_reachability();
  /*Due to the single threaded nature of javascript each run of the simulation 
    must be offset by a period in order to replicate staged propagation*/
  while(i++ < dataset.nodes.length) 
  {            
     window.setTimeout(function() {
       if(stopSimulation) {
        d3.selectAll("svg").remove();
        d3.selectAll(".worm").remove();
        generate_graph(dataset);
         return;
       }
       runSimulation(dataset, worm);
     }, 500 + i * 3500);
      
     window.setTimeout(function() {
        d3.selectAll("svg").remove();
        d3.selectAll(".worm").remove();
        generate_graph(dataset);
       if(stopSimulation) {
         return;
       }
     }, 4000 + i * 3500);
  }                      
}

//Infect a random node
function spawnWorm(worm)
{
    var candidateNodes = [];
    for(var i = 0; i < gnodes.data().length; i++)
    {
        if(can_infect(gnodes.data()[i], worm) 
           && gnodes.data()[i].name != "Central Hub") 
              candidateNodes.push(i);
    }
    
    return candidateNodes[Math.floor((Math.random() 
                                      * (candidateNodes.length)))];
}


function runSimulation(dataset, worm)
{
   var i = 0;
   
   //Wait for the layout to converge
   settleLayout();

   //Get new infections & coordinates
   updateInfections(worm);
   getWormCoords();

   //Special edge case for DDoS.Smurf
   if(smurf && xyCoords.length == 0){
      updateSmurf();
      return;
   }
   createWorm();
   moveWorm(dataset);

}


//"Speed up" the layout convergence by ticking over graph
function settleLayout()
{
  var safety = 0;
  while(force.alpha() != 0) 
  {
     force.tick();
     if(safety++ > 500) 
        break;
  }
}

//Simulation for W32.STORM and botnet
function start_storm_simulation(dataset)
{
 
  spawn = spawnWorm("W32.STORM");
  //gnodes.data()[spawn].infected_with = "W32.STORM";
  window.setTimeout(function() {
      $("#commentary").fadeOut(function() {
          console.log(gnodes.data()[spawn].name);
        $(this).text("Node: " + (spawn)
                     + " infected with W32.STORM!").fadeIn(2000);
        $(this).text("Node: " + (spawn)
                     + " infected with W32.STORM!").fadeOut(2000);
      });
  }, 2000);
  //botnetMin = 4;
  console.log(dataset);
  start(dataset, "W32.STORM");
  gnodes.data()[spawn].infected_with = "W32.STORM";
}


//Simulation for W32.SLAMMER and DDoS.Smurf
function start_smurf_simulation(dataset)
{
  spawn = spawnWorm("W32.SLAMMER");
  smurfData = dataset;//duplicate(dataset);
  console.log("start_smurf(): smurfdata, ", smurfData);
  //infect a random node
  gnodes.data()[spawn].infected_with = "W32.SLAMMER";
  window.setTimeout(function() {
        $("#commentary").fadeOut(function() {
            console.log(gnodes.data()[spawn].name);
          $(this).text("Node: " + (spawn - 1)
                       + " infected with W32.SLAMMER!").fadeIn(2000);
          $(this).text("Node: " + (spawn - 1)
                       + " infected with W32.SLAMMER!").fadeOut(2000);
        });
    }, 2000);
  console.log("start_smurf(): spawn node ", gnodes.data()[spawn]);
  start(smurfData, "W32.SLAMMER"); 
}



function updateSmurf()
{
  gnodes.data()[0].infected_with = "none"; //reset so can propgate backwards
    for(var i = 0; i < gnodes.data().length; i++) {
      if(gnodes.data()[i].infected_with == "W32.SLAMMER" && i != spawn)
        infections.push({x: gnodes.data()[0].x,
                         y: gnodes.data()[0].y,
                         infectedByx: 
                           gnodes.data()[i].x,
                         infectedByy: 
                           gnodes.data()[i].y,
                         });
    }
    getWormCoords();
    createWorm();
   // console.log("updateSmurf(): xyCoords1", xyCoords);
    moveWorm();
    settleLayout();
    window.setTimeout(function() {
        d3.selectAll("svg").remove();
        d3.selectAll(".worm").remove();
        generate_graph(smurfData);
        //settleLayout();
     }, 3500);
    settleLayout();
    window.setTimeout(function() {
     xyCoords = []
     xyCoords.push({id: 0, targetX: gnodes.data()[spawn].x
                     , targetY: gnodes.data()[spawn].y
                     , sourceX: gnodes.data()[0].x
                     , sourceY: gnodes.data()[0].y});
    createWorm();
   // console.log("updateSmurf(): xyCoords2", xyCoords); 
    moveWorm();
    }, 7000);
    
    window.setTimeout(function() {
        d3.selectAll("svg").remove();
        d3.selectAll(".worm").remove();
        stopSimulation = true;
        gnodes.data()[spawn].infected_with 
               = "W32.SLAMMER";
        gnodes.data()[spawn].status = "incapacitated";
        generate_graph(smurfData);
        return;
     }, 10500);
}

