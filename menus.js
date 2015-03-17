//vars to hold dropdown menu data
var networkSelectMenu;
var socialEngSelectMenu;
var intrustionDetectMenu;
var softwareMenu;
var honeypotSelectMenu;
var wormSelectMenu;
var wormBtn;
var nodeTextBox;
var topologySelectMenu;
var infectionMethodMenu;
var attackSelectMenu;
var botnetMinMenu;



function generate_dropdown(dataset, div_location)
{
  // dataset = duplicate(dataset);
  //if the user has not set any levels
 // if(!selected) {
    $(document).ready(function() {
        
      wormSelectMenu = $("<select />");
      $("<option />", {value: -1, 
                       text: "Select worm"})
                       .appendTo(wormSelectMenu);
      
      //create option for each node
      for(var val in worms)
      {
       $("<option />", {value: val, 
                        text: worms[val].name})
                        .appendTo(wormSelectMenu);
      }
      wormSelectMenu.appendTo("#" + div_location);
      wormSelectMenu.on("change", function(e) {
      worm = this.options[e.target.selectedIndex].text;
          //create release button
      wormbtn = $("<button/>", {text: "Release Worm", 
                           id: "wormbtn",
                           click: function () {          
                            spawn = spawnWorm(worm);
                            //infect a random node
                            gnodes.data()[spawn].infected_with = worm;
                            window.setTimeout(function() {
                              $("#commentary").fadeOut(function() {
                                $(this).text((gnodes.data()[spawn].name) 
                                   .concat(" infected with ") + worm).fadeIn(2000);
                                $(this).text((gnodes.data()[spawn].name) 
                                   .concat(" infected with ") + worm).fadeOut(2000);
                              });
                            }, 2000);
                            start(dataset, worm);
                            $("#wormbtn").hide();
                            $("#" + div_location).empty();
                        }
                 }).appendTo("#" + div_location);
       })
       $("<br />").appendTo("#" + div_location);
      //create dropdowns for networks
      networkSelectMenu = $("<select />");
      $("<option />", {value: -1, 
                       text: "Please Select Network"})
                       .appendTo(networkSelectMenu);
      
      //create option for each node
      for(var val in dataset.nodes)
      {
       if(dataset.nodes[val].name != "Central Hub")
         $("<option />", {value: val, 
                          text: dataset.nodes[val].name})
                          .appendTo(networkSelectMenu);
      }
      networkSelectMenu.appendTo("#" + div_location);
        
      //generate the next dropdown
      networkSelectMenu.on('change', function(e) {
       // console.log(this.options[e.target.selectedIndex].text);
        
        socialEngSelectMenu = $("<select />");
        $("<option />", {value: -1, 
                         text: "Enable Social Engineering training"})
                         .appendTo(socialEngSelectMenu);
        for(var val in bool_params)  
        {
        $("<option />", {value: val, 
                         text: bool_params[val]})
                         .appendTo(socialEngSelectMenu);
        }

        socialEngSelectMenu.appendTo("#" + div_location);
       // console.log(socialEngSelectMenu.val());
        socialEngSelectMenu.on("change", function(f) {
            //if not the "Please select" option which is -1
            if(socialEngSelectMenu.val() >= 0) {
              dataset.nodes[e.target.selectedIndex - 1].social_eng
                           = bool_params[f.target.selectedIndex - 1];
                
              //create honeypot select menu
              honeypotSelectMenu = $("<select />");
              $("<option />", {value: -1, 
                                text: "Enable honeypot"})
                                .appendTo(honeypotSelectMenu);
              for(var val in bool_params)  
              {
                $("<option />", {value: val, 
                                  text: bool_params[val]})
                                  .appendTo(honeypotSelectMenu);
              }
              honeypotSelectMenu.appendTo("#" + div_location);
              honeypotSelectMenu.on("change", function(g) {
                    if(honeypotSelectMenu.val() >= 0) {
                      dataset.nodes[e.target.selectedIndex - 1].honeypot
                             = bool_params[g.target.selectedIndex - 1];
                          
                               
                    //create honeypot select menu
                     intrusionDetectMenu = $("<select />");
                     $("<option />", {value: -1, 
                                       text: "Enable intrusion detection"})
                                       .appendTo(intrusionDetectMenu);  


                     for(var val in bool_params)  
                     {
                      $("<option />", {value: val, 
                                       text: bool_params[val]})
                                       .appendTo(intrusionDetectMenu);
                     }         
                     intrusionDetectMenu.appendTo("#" + div_location);
                     intrusionDetectMenu.on("change", function(h) {
                       if(intrusionDetectMenu.val() >= 0) {
                        dataset.nodes[e.target.selectedIndex - 1]
                               .intrusion_detect
                             = bool_params[h.target.selectedIndex - 1];

                     softwareMenu = $("<select />");
                     $("<option />", {value: -1, 
                                       text: "Software up to date?"})
                                       .appendTo(softwareMenu);  
                     for(var val in bool_params)  
                     {
                      $("<option />", {value: val, 
                                       text: bool_params[val]})
                                       .appendTo(softwareMenu);
                     }  
                     softwareMenu.appendTo("#" + div_location);
                     softwareMenu.on("change", function(i) {
                     if(softwareMenu.val() >= 0) {
                        dataset.nodes[e.target.selectedIndex - 1]
                         .software_uptodate
                             = bool_params[i.target.selectedIndex - 1]; 

                        intrusionDetectMenu.remove();
                        softwareMenu.remove();
                        socialEngSelectMenu.remove();
                        honeypotSelectMenu.remove();
                        //refresh graph
                        d3.selectAll("svg").remove();
                        generate_graph(dataset); 
                     } });
                    }
              })
          }           
              });
               //refresh the graph
               d3.selectAll("svg").remove();
               generate_graph(dataset);
        }
      })
    })
    })
}

function generate_custom()
{
    var type, graph_data, num_nodes;
    
    $(document).ready(function(){
    $("#divLevelCustom").empty();
	nodeTextBox = $(document.createElement('div'))
	     .attr("id", 'nodeTextBoxDiv');
 
	nodeTextBox.after().html('<label>Number of nodes' + ' : </label>' +
	      '<input type="text" name="textbox' + 
	      '" id="textbox' + '" value="" >');
 
	nodeTextBox.appendTo("#divLevelCustom");
    });
    
    topologySelectMenu = $("<select />");
      $("<option />", {value: -1, 
                       text: "Select network topology"})
                       .appendTo(topologySelectMenu);
      
      //create option for each node
      for(var val in topologies)
      {
       $("<option />", {value: val, 
                        text: topologies[val]})
                        .appendTo(topologySelectMenu);
      }
      topologySelectMenu.appendTo("#divLevelCustom");
      topologySelectMenu.on("change", function(e) {
          type = this.options[e.target.selectedIndex].text; 
          numNodes = parseInt($("#textbox").val());
          graph_data = generate_graph_data(numNodes, type);
          attackSelectMenu = $("<select />");
           $("<option />", {value: -1, 
                            text: "Select worm/attack method"})
                            .appendTo(attackSelectMenu);
      
           //create option for each node
           for(var val in attacks)
           {
             if(type != "Star" && attacks[val] == "DDoS.Smurf")
               continue;
             else if(type == "Star" && (attacks[val] == "Botnet.Storm" || attacks[val] == "Worm"))
               continue;
             else 
             $("<option />", {value: val, 
                             text: attacks[val]})
                             .appendTo(attackSelectMenu); 
           }
           attackSelectMenu.appendTo("#divLevelCustom");
           attackSelectMenu.on("change", function(f) {
           if(this.options[f.target.selectedIndex].text == "DDoS.Smurf") {
               smurf = true;
               //run normal simulation first
               //keep track of infected nodes
               //run backwards to remove initial spawned node
               //remove edge between spawn and hub to indicate incapacity
             //generate_dropdown(graph_data, "divLevelCustom")
               console.log("Smurf Graph data", graph_data);
               $("#commentary").fadeOut(function() {
                 $(this).text("Smurf DDoS attack running on " + type 
                              + " network with " + numNodes 
                              + " nodes").fadeIn(2000);
                 $(this).text("Smurf DDoS attack running on " + type 
                              + " network with " + numNodes 
                              + " nodes").fadeOut(2000);
                });
               generate_graph(graph_data);
               start_smurf_simulation(graph_data);
           }
           else if(this.options[f.target.selectedIndex].text 
                   == "Botnet.Storm") {
           botnetMinMenu = $("<select />");
           $("<option />", {value: -1, 
                            text: "Select minimum nodes required" 
                                   + " for node incapacitation"})
                            .appendTo(botnetMinMenu);
            for(var i = 1; i < numNodes; i++)
            {
             $("<option />", {value: i, 
                             text: i})
                             .appendTo(botnetMinMenu);
             }
             botnetMinMenu.appendTo("#divLevelCustom");
             botnetMinMenu.on("change", function(g) {
             botnetMin = parseInt(this.options[g.target.selectedIndex].text)
             $("#commentary").fadeOut(function() {
               $(this).text("Storm botnet running on " + type 
                            + " network with " + numNodes 
                            + " nodes" + " incapacitation minimum " 
                            + botnetMin.toString()).fadeIn(2000);
               $(this).text("Storm botnet running on " + type 
                            + " network with " + " incapacitation minimum " 
                            + botnetMin.toString()).fadeOut(2000);
              });
               generate_graph(graph_data);
                 start_storm_simulation(graph_data); });
           }
           else 
           {
             $("#commentary").fadeOut(function() {
               $(this).text(type + " Network generated with " 
                                 + numNodes + " nodes").fadeIn(2000);
               $(this).text(type + " Network generated with " 
                                 + numNodes + " nodes").fadeOut(2000);
            });
             generate_dropdown(graph_data, "divLevelCustom")
             generate_graph(graph_data);
           } 
         });
      });
}


