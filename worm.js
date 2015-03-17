//Initial outbreak node
var spawn;

//Worm xy coords
var xyCoords = [];

//Current Infections 
var infections = [];

//Newly marked infections
var newMarkedInfections = [];

//Indexes of nodes to infect
var infected = []; 

//Nodes acting as honeypots
var honeypots = [];

var smurfData = {};

var numInfections = 0;
var botnetMin; //minimum number of nots req for storm botnet to incapacitate node

//create worms from the infected nodes
function createWorm() 
{

  //Create an SVG element for the worm
  var worm = svg.selectAll(".worm")
     .data(xyCoords)
     .enter()
     .append("circle")
     .attr("class", "worm")
     .attr("cx", function(d) {
         return d.sourceX })
     .attr("cy", function(d) { 
         return d.sourceY})
     .attr("r", 4)
     .style("fill", "black")
}

//Move the worms from source to target
function moveWorm(dataset) 
{

  stageEnded = false;
  d3.selectAll(".worm")
    .transition()
    .duration(4000)
    .attr("cx", function(d) {
        return d.targetX } )
    .attr("cy", function(d) { 
        return d.targetY } )
    .each("end", function(d) { //listen for end of event
        stageEnded = true;
    });
   $('.worm').fadeOut(5000); //fade out the worm
   
 }


// Get nodes infected with W32.STORM
function stormInfections()
{
  var stormNode = 0;
   
  for(var i = 0; i < gnodes.data().length; i++)
    if(gnodes.data()[i].infected_with == "W32.STORM")
      stormNode++;
  
  return stormNode;

}
//Get source (infected nodes) and target (nodes to be infected) coords
//Funciton skipping ahead and infecting before worm transmitted//
function updateInfections(worm)
{

  var adjLength, node;
  honeypots = [];
  stopSimulation = true;
  infections = []; //nodes to infect
   
 if(worm != "W32.STORM")
     newMarkedInfections = []; //mark the newly infected nodes to avoid transmitting worms from newly infected nodes within loop
    
  //Find all nodes reachable from infected ones
  //Update the infection array with these node params
  for(var i = 0; i < gnodes.data().length; i++)
  {
      if(gnodes.data()[i].infected_with != "none"
          && gnodes.data()[i].honeypot == " false") 
          //Get indexes of already infected nodes
          newMarkedInfections.push(i);
  }
    
  /*For each node in graph, check if in adjacency list of
    any of the infected nodes
    if so then mark it as infected and get worm coords
    
    for each infected node
    check if nodes adjacent are not infected
    infect them if so*/
    
  //Storm botnet does not follow normal propagation
  if(worm == "W32.STORM" && stormInfections() >= botnetMin) 
  {
      for(var j = 0; j < newMarkedInfections.length; j++)
      {
          /*For all of the infected nodes, find a node adjacent to one
            if can infect it, then infect it from all the other nodes
            incapacitate it but also infect it
            continue until all nodes incapacitated or infected
            console.log("Botnet loop",newMarkedInfections);*/

          adjLength = gnodes.data()[newMarkedInfections[j]]
            .adjacent_to.length;
          for(var i = 0; i < adjLength; i++)
          {
            node = gnodes.data()[newMarkedInfections[j]]
              .adjacent_to[i];
                  if(gnodes.data()[node].infected_with == "none" 
                     && can_infect(gnodes.data()[node], worm)) {
                    stopSimulation = false;
                    gnodes.data()[node].infected_with = worm;
                    gnodes.data()[node].status = "incapacitated";
                    for(var k = 0; k < newMarkedInfections.length; k++)
                    {
                      //console.log(infections);
                      if(gnodes.data()[newMarkedInfections[k]].status 
                         == "active")
                        infections.push({x: gnodes.data()[node].x,
                                         y: gnodes.data()[node].y,
                                         infectedByx: 
                                         gnodes.data()[newMarkedInfections[k]].x,
                                         infectedByy: 
                                         gnodes.data()[newMarkedInfections[k]].y,
                                        });
                    }
                    console.log(infections);
                    return;
                  }
                    
          }
             
      }
  }
  else {
    for(var j = 0; j < newMarkedInfections.length; j++)
    {
      //Check for honeypots
      if((honeypots = honeypot_adjacent(gnodes
                      .data()[newMarkedInfections[j]])).length > 0) {
          $("#commentary").fadeOut(function() {
            $(this).text("Honeypot adjacent!").fadeIn(2000);
            $(this).text("Honeypot adjacent!").fadeOut(2000);
          });
          for(var i = 0; i < honeypots.length; i++) 
          {
              stopSimulation = false;
              gnodes.data()[honeypots[i]].infected_with = worm;
              console.log(gnodes.data()[honeypots[i]].infected_with);
              infections.push({x: gnodes.data()[honeypots[i]].x,
                               y: gnodes.data()[honeypots[i]].y,
                               infectedByx: 
                                   gnodes.data()[newMarkedInfections[j]].x,
                               infectedByy: 
                                   gnodes.data()[newMarkedInfections[j]].y,
                               });
          }
          honeypots = [];
      }
      else {
        gnodes.data()[newMarkedInfections[j]]
              .adjacent_to.forEach(function(element, index) {
                  if(gnodes.data()[element].infected_with == "none" 
                     && can_infect(gnodes.data()[element], worm)) {
                    stopSimulation = false;
                    gnodes.data()[element].infected_with = worm;
                    infections.push({x: gnodes.data()[element].x,
                                     y: gnodes.data()[element].y,
                                     infectedByx: 
                                     gnodes.data()[newMarkedInfections[j]].x,
                                     infectedByy: 
                                     gnodes.data()[newMarkedInfections[j]].y,
                                    });
                  }
              });
      }
    }
  }
}
                                   
                                 
//Get coords for where the worm needs to transmit between
//Infections needs to store node id's of new infections
function getWormCoords()
{
  xyCoords = [];
  for(var i = 0; i < infections.length; i++)
  {
      xyCoords.push({id: i, targetX: infections[i].x
                   , targetY: infections[i].y
                   , sourceX: infections[i].infectedByx
                   , sourceY: infections[i].infectedByy});
  }
}

//Check that the node can be infected
function can_infect(node, worm)
{
    
  if(worm == "W32.BLASTER")
  {
      if(node.intrusion_detect == " true")
        return false;
      else
        return true;
  }
  else if(worm == "W32.BORM")
  {
      if(node.software_uptodate == " true")
        return false;
      else
        return true;
  }
  else if(worm == "W32.ILOVEYOU")
  {
      if(node.social_eng == " true")
          return false;
      else
          return true;
  }
  else
    return true;
}


//Check if the node has a honeypot adjacent
function honeypot_adjacent(node)
{
  var adjacent_node;
  var honeypots = [];
    
  for(var i = 0; i < node.adjacent_to.length; i++)
  {
      adjacent_node = node.adjacent_to[i];
      if(gnodes.data()[adjacent_node].honeypot == " true")
        honeypots.push(adjacent_node);
  }
  return honeypots;
}

