//Variable to hold the layout itself
var force;

//Particle parameters
var chargeVal = -500;
var linkDist = 200;

//Variables to hold graph data
var labels;
var edges;
var nodes;

//Grouping for nodes
var gnodes;

//Var for svg elements
var svg;

//Width and height for screen
var w = 850;
var h = 650;


//Dfs counter and max tracker
var counter = 0;
var max = 0;

//Nodes visited for DFS
var visited = [];

//Graph diameter (longest path between any two nodes)
var diameter;

//Graph generator
function generate_graph(dataset)
{
  //var copy = duplicate(dataset);
  
  //Create the force directed layout
  //Edge distance and charge depenedent on graph size
  force = d3.layout.force()
    .nodes(dataset.nodes)
    .links(dataset.edges)
    .size([w, h])
    .linkDistance([linkDist])
    .charge([chargeVal])
    .start()
    .on("end", function() {
      converged = true;
  });
         
  //Create an SVG element
  svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
			
//Create edges as svg lines
  edges = svg.selectAll("line")
    .data(dataset.edges)
    .enter()
    .append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);
 
//Create a group of svg elements for nodes
  gnodes = svg.selectAll("g.gnode")
    .data(dataset.nodes)
    .enter()
    .append("g")
    .classed("gnode", true)

    
//Add a circle to the node   
  nodes = gnodes.append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function(d) {
      console.log(d.infected_with.slice(d.length - 13, d.length));
      if(d.name != "Central Hub") {
          console.log(d.status);
        if(d.status == "incapacitated")
            return "red";
        else {
          if(d.infected_with == "W32.BORM") 
              return "brown";
          else if(d.infected_with == "W32.BLASTER")
              return "purple";
          else if(d.infected_with == "W32.ILOVEYOU")
              return "orange";
          else if(d.infected_with == "W32.SLAMMER")
              return "blue";
          else if(d.infected_with == "W32.STORM")
              return "violet";
          else if(d.infected_with.slice(d.length - 13, d.length) 
                  == "Incapacitated")
              return red;
          else 
            return "green";
        }
      }
      else
          return "green";
    })
    .on("mouseover", function(d) {
      if(d.name != "Central Hub") {
        d3.select(labels[0][d.index])
        .style("visibility", "visible");
        d3.select(labels[0][d.index].nextSibling)
        .style("visibility", "visible");
        d3.select(labels[0][d.index].nextSibling.nextSibling)
        .style("visibility", "visible");
        d3.select(labels[0][d.index].nextSibling.nextSibling.nextSibling)
        .style("visibility", "visible");
        d3.select(labels[0][d.index].nextSibling.nextSibling.nextSibling.nextSibling)
        .style("visibility", "visible");
        d3.select(labels[0][d.index].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling)
        .style("visibility", "visible");
      }
        else {
         d3.select(labels[0][d.index])
        .style("visibility", "visible");
        }     
    })
    .on("mouseout", function(d) {
     d3.select(labels[0][d.index])
       .style("visibility", "hidden");
      d3.select(labels[0][d.index].nextSibling)
      .style("visibility", "hidden");
      d3.select(labels[0][d.index].nextSibling.nextSibling)
      .style("visibility", "hidden");
      d3.select(labels[0][d.index].nextSibling.nextSibling.nextSibling)
      .style("visibility", "hidden");
      d3.select(labels[0][d.index].nextSibling.nextSibling.nextSibling.nextSibling)
        .style("visibility", "hidden");
      d3.select(labels[0][d.index].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling)
        .style("visibility", "hidden");
    })
    
    .call(force.drag);

  
  //Create labels for the node group
  labels = gnodes.append("text")
    .text(function(d) { 
        return ("Network: " + d.name ); 
    })
    .attr("class","nodetext")
    .attr("dx", 0)
    .attr("dy", ".35em")
    .style("font-size","5px")
    
    //Anchor the text a few units below the centre of node for each label
    .attr("text-anchor", "middle")
    .attr("transform","translate(0, 24)")
    .transition()
    .duration(300)
    .style("font-size","12px")
    .attr("font-family", "Verdana")
    .attr("font-size", "11px")
    .style("visibility", "hidden"); //hide under hover over the node 
    
  gnodes.append("text")
    .text(function(d) { 
        return ("Social Engineering Training: " + d.social_eng); 
    })
    .attr("class","nodetext")
    .attr("dx", 0)
    .attr("dy", ".35em")
    .style("font-size","5px")
    .attr("text-anchor", "middle")
    .attr("transform","translate(0, 36)")
    .transition()
    .duration(300)
    .style("font-size","12px")
    .attr("font-family", "Verdana")
    .attr("font-size", "11px")
    .style("visibility", "hidden"); //hide under hover over the node 
    
  gnodes.append("text")
    .text(function(d) { 
        return ("Honeypot: " + d.honeypot); 
    })
    .attr("class","nodetext")
    .attr("dx", 0)
    .attr("dy", ".35em")
    .style("font-size","5px")
    .attr("text-anchor", "middle")
    .attr("transform","translate(0, 48)")
    .transition()
    .duration(300)
    .style("font-size","12px")
    .attr("font-family", "Verdana")
    .attr("font-size", "11px")
    .style("visibility", "hidden"); //hide under hover over the node 
    
  gnodes.append("text")
    .text(function(d) { 
        return ("Intrusion detection: " + d.intrusion_detect); 
    })
    .attr("class","nodetext")
    .attr("dx", 0)
    .attr("dy", ".35em")
    .style("font-size","5px")
    .attr("text-anchor", "middle")
    .attr("transform","translate(0, 60)")

    .transition()
    .duration(300)
    .style("font-size","12px")
    .attr("font-family", "Verdana")
    .attr("font-size", "11px")
    .style("visibility", "hidden"); //hide under hover over the node

  gnodes.append("text")
    .text(function(d) { 
        return ("Software up to date: " + d.software_uptodate); 
    })
    .attr("class","nodetext")
    .attr("dx", 0)
    .attr("dy", ".35em")
    .style("font-size","5px")
    .attr("text-anchor", "middle")
    .attr("transform","translate(0, 72)")
    .transition()
    .duration(300)
    .style("font-size","12px")
    .attr("font-family", "Verdana")
    .attr("font-size", "11px")
    .style("visibility", "hidden"); //hide under hover over the node

  gnodes.append("text")
    .text(function(d) { 
        return ("Infected with: " + d.infected_with); 
    })
    .attr("class","nodetext")
    .attr("dx", 0)
    .attr("dy", ".35em")
    .style("font-size","5px")
    .attr("text-anchor", "middle")
    .attr("transform","translate(0, 84)")
    .transition()
    .duration(300)
    .style("font-size","12px")
    .attr("font-family", "Verdana")
    .attr("font-size", "11px")
    .style("visibility", "hidden"); //hide under hover over the node

  //Called everytime the simulation ticks over
  force.on("tick", function() {
    edges.attr("x1", function(d) { return d.source.x; })
         .attr("y1", function(d) { return d.source.y; })
	     .attr("x2", function(d) { return d.target.x; })
	     .attr("y2", function(d) { return d.target.y; });

  gnodes.attr("transform", function(d) { 
      return 'translate(' + [d.x, d.y] + ')';         
     })
  });
}

function dfs_auxillary(nodes, u, n)
{
  visited[u] = "y";

  for(var i = 0; i < nodes[u].adjacent_to.length; i++)
  {
      if(visited[nodes[u].adjacent_to[i]] == "n") {
          n++;
          dfs_auxillary(nodes, nodes[u].adjacent_to[i], n);
       }
      else
      {
         if(n > counter) 
           counter = n;
         n = 0;
      }
  }
}

//Depth first search functions for calculation diameter
function dfs_max_reachability()
{
  counter = 0;
  max = 0;

    
  for(var j = 0; j < gnodes.data().length; j++) {
   for(var i = 0; i < gnodes.data().length; i++)
      visited[i] = "n";
    dfs_auxillary(gnodes.data(), j, 0);
    if(counter > max)
        max = counter;
    counter = 0;
  }  
  console.log(max);
}


//Generates a network of specified number of nodes and type
//E.g a Star network with 23 nodes
function generate_graph_data(num_nodes, type)
{

  var i, j, dataset = {
      nodes :[],
      edges :[]
  }

  if(type == "Line")
  {
    for(i = 0; i < num_nodes; i++)
    {
        dataset.nodes.push({name: "node " + i, system_type: "W32"
                           , social_eng: "false"
                           , intrusion_detect: " false"
                           , honeypot: " false"
                           , software_uptodate: " false"
                           , infected_with: "none"
                           , adjacent_to: []});
       if(i == 0)
         dataset.nodes[i].adjacent_to.push(i+1);
       else if(i == num_nodes - 1)
         dataset.nodes[i].adjacent_to.push(i-1);
       else
         dataset.nodes[i].adjacent_to.push(i-1, i+1);
    }
       
    for(j = 0; j <  num_nodes - 1; j++)
      dataset.edges.push({ source: j, target: j + 1 });
  }
  else if(type == "Star")
  {
    dataset.nodes.push({name: "Central Hub", system_type: "NA"
                           , social_eng: "false"
                           , intrusion_detect: " false"
                           , honeypot: " false"
                           , software_uptodate: " false"
                           , status: "active"
                           , infected_with: "none"
                           , adjacent_to: []});
       
    for(i = 0 ; i < num_nodes; i++)
    {
        dataset.nodes.push({name: "node " + i, system_type: "W32"
                           , social_eng: "false"
                           , intrusion_detect: " false"
                           , honeypot: " false"
                           , software_uptodate: " false"
                           , status: "active"
                           , infected_with: "none"
                           , adjacent_to: []});
    }
    for(i = 1; i < num_nodes + 1; i++)
        dataset.nodes[0].adjacent_to.push(i);
    for(j = 1; j <  num_nodes + 1; j++)
    {
      dataset.nodes[j].adjacent_to.push(0);
      dataset.edges.push({ source: j, target: 0 });
    }
      //console.log("gen_graph_data(): dataset ", dataset);
  }
  else if(type == "Mesh")
  {
    var randLength;
    var randNode;
        
    for(i = 0 ; i < num_nodes; i++)
    {
        dataset.nodes.push({name: "node " + i, system_type: "W32"
                           , social_eng: "false"
                           , intrusion_detect: " false"
                           , honeypot: " false"
                           , software_uptodate: " false"
                           , status: "active"
                           , infected_with: "none"
                           , adjacent_to: []});
    }
    for(j = 0; j < num_nodes; j++)
    {
        /* Making number of adjacent nodes proportional to the square root of the number
        of nodes seems to scale well */
        randLength = Math.floor((Math.random() 
                                    * (Math.sqrt(num_nodes))) + 1); //cant be 0
        for(var k = 0; k < randLength; k++)
        {
            randNode = Math.floor((Math.random() 
                                    * (num_nodes)));
       //     console.log("Node:", randNode);
            dataset.nodes[j].adjacent_to.push(randNode);
            dataset.nodes[randNode].adjacent_to.push(j);

            dataset.edges.push({ source: randNode, target: j });
            dataset.edges.push({ source: j, target: randNode });
        }
          
    }
      console.log(dataset);
  }
  else if(type == "Ring")
  {
    for(i = 0; i < num_nodes; i++)
    {
        dataset.nodes.push({name: "node " + i, system_type: "W32"
                           , social_eng: "false"
                           , intrusion_detect: " false"
                           , honeypot: " false"
                           , software_uptodate: " false"
                           , status: "active"
                           , infected_with: "none"
                           , adjacent_to: []});
       if(i == 0)
         dataset.nodes[i].adjacent_to.push(i+1, num_nodes - 1);
       else if(i == num_nodes - 1)
         dataset.nodes[i].adjacent_to.push(i-1, 0);
       else
         dataset.nodes[i].adjacent_to.push(i-1, i+1);
    }
        
    for(j = 0; j <  num_nodes - 1; j++)
      dataset.edges.push({ source: j, target: j + 1 });
    dataset.edges.push({ source: j, target: 0 });
  }
  else if(type == "Complete")
  {
    for(i = 0; i < num_nodes; i++)
    {
        dataset.nodes.push({name: "node " + i, system_type: "W32"
                           , social_eng: "false"
                           , intrusion_detect: " false"
                           , honeypot: " false"
                           , software_uptodate: " false"
                           , status: "active"
                           , infected_with: "none"
                           , adjacent_to: []});    
    }
    //n(n-1)/2 nodes in complete graph
    for(j = 0; j < num_nodes; j++)
    {
        for(i = 0; i < num_nodes; i++)
        {
          if(i != j)
          {
              dataset.nodes[j].adjacent_to.push(i);
              dataset.edges.push({source: j, target: i});
          }
        }
    }
  }  
  return dataset;
}

