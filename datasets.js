var node_params = {
    social_eng: false,
    intrusion_detect: false,
    honeypot: false 
};

var bool_params = [" true", " false"];

var attacks = ["Worm", "DDoS.Smurf", "Botnet.Storm"];

var topologies = ["Line", "Star", "Complete", "Ring", "Mesh", "Hybrid"];

//Worm params
var worms = [
    { name: "W32.BORM", techniques: ["BUFF_OVERFLOW"]
    , packet_types: ["TCP"], ports_used: [135] },
    { name: "W32.BLASTER", techniques: ["BUFF_OVERFLOW"]
     , packet_types: ["TCP", "UDP"], ports_used: [135, 139, 4444] },
    { name: "W32.ILOVEYOU", techniques: ["SOCIAL_ENG"]
     , packet_types: ["TCP", "UDP"], ports_used: [22] }
    ];

//Data for pre set levels

var dataset1 = {
  nodes: [
      { name: "Manchester University", system_type: "W32", social_eng: " false"
               , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
       , status: "active", infected_with: "none", adjacent_to: [1, 2]},
      { name: "Leeds University", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
       , status: "active", infected_with: "none", adjacent_to: [2, 0]},
      { name: "Liverpool Univeristy", system_type: "W32", social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
       , status: "active", infected_with: "none", adjacent_to: [1, 0]},

    ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
	{ source: 1, target: 2 },
	{ source: 1, target: 0 },
	{ source: 2, target: 1 },
   ]
 };

var dataset2 = {
  nodes: [
    { name: "Manchester University", system_type: "W32", social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active", infected_with: "none", adjacent_to: [1, 6, 3]},
    { name: "Leeds University", system_type: "W32", social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active", infected_with: "none", adjacent_to: [2, 0]},
    { name: "Liverpool Univeristy", system_type: "W32", social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active", infected_with: "none", adjacent_to: [1, 6]},
    { name: "University of Bristol", system_type: "W32", social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active", infected_with: "none", adjacent_to: [0, 6]},
    { name: "Imperial College London", system_type: "W32", social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active", infected_with: "none", adjacent_to: [5, 6]},
    { name: "University of Edinburgh", system_type: "W32", social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active", infected_with: "none", adjacent_to: [4]},
    { name: "Univeristy College London", system_type: "W32"
            , social_eng: " false"
            , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active" , infected_with: "none"
            , adjacent_to: [0, 2, 3, 4]},
    ],
  edges: [
    { source: 0, target: 1 },
	{ source: 1, target: 2 },
	{ source: 1, target: 0 },
	{ source: 2, target: 1 },
	{ source: 3, target: 6 },
	{ source: 3, target: 0 },
	{ source: 4, target: 6 },
	{ source: 5, target: 4 },
	{ source: 6, target: 2 },
	{ source: 6, target: 0 },

   ]
 };

var dataset3 = {
  nodes: [
    { name: "Manchester University", system_type: "W32", social_eng: " false"
     , intrusion_detect: " false", honeypot: " false", software_uptodate: " false", status: "active"
             , infected_with: "none", adjacent_to: [1, 3, 6, 11, 14]},
    { name: "Leeds University", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
     , status: "active" , infected_with: "none", adjacent_to: [0, 2, 8]},
    { name: "Liverpool Univeristy", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
            , status: "active" , infected_with: "none"
            , adjacent_to: [1, 6, 11, 12, 14]},
    { name: "University of Bristol", system_type: "W32", social_eng: " false" 
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none", adjacent_to: [0, 6]},
    { name: "Imperial College London", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , infected_with: "none", adjacent_to: [5, 6, 7]},
    { name: "University of Edinburgh", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none", adjacent_to: [4, 10]},
    { name: "Univeristy College London", system_type: "W32"
             , social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none"
             , adjacent_to: [3, 4, 7, 10]},
    { name: "Univeristy of Nottingham", system_type: "W32"
             , social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active", infected_with: "none"
             , adjacent_to: [4, 6, 12, 13]},
    { name: "University of Sheffield", system_type: "W32", social_eng: " false" 
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active", infected_with: "none"
             , adjacent_to: [1, 9, 10]},
    { name: "University of York", system_type: "W32", social_eng: " false" 
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none", adjacent_to: [8, 10]},
    { name: "London School of Economics", system_type: "W32"
             , social_eng: " false" 
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none"
             , adjacent_to: [5, 6, 8, 9]},
    { name: "Oxford University", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active", infected_with: "none", adjacent_to: [0, 2]},
    { name: "Cambridge University", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none", adjacent_to: [2, 7]},
    { name: "Trinity College Dublin", system_type: "W32", social_eng: " false"
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none", adjacent_to: [7]},
    { name: "University of Glasgow", system_type: "W32", social_eng: " false" 
             , intrusion_detect: " false", honeypot: " false", software_uptodate: " false"
             , status: "active" , infected_with: "none", adjacent_to: [0, 2]},
    ],
  edges: [
    { source: 0, target: 1 },
	{ source: 1, target: 2 },
	{ source: 1, target: 0 },
	{ source: 2, target: 1 },
	{ source: 3, target: 6 },
	{ source: 3, target: 0 },
	{ source: 4, target: 6 },
	{ source: 5, target: 4 },
	{ source: 6, target: 2 },
	{ source: 6, target: 0 },
	{ source: 7, target: 4 },
	{ source: 7, target: 6 },
	{ source: 8, target: 10 },
	{ source: 8, target: 1 },
	{ source: 9, target: 8 },
	{ source: 10, target: 6 },
	{ source: 10, target: 5 },
	{ source: 10, target: 9 },
	{ source: 11, target: 2 },
	{ source: 11, target: 0 },
	{ source: 12, target: 7 },
	{ source: 12, target: 2 },
	{ source: 13, target: 7 },
	{ source: 14, target: 2 },
	{ source: 14, target: 0 },
   ]
 };

