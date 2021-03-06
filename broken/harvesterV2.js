var harvesterV2 = {
  main: function(creep, sources, source) {
    if(creep.carry.energy < creep.carryCapacity) {
      if(creep.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[source], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } // IF
    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_EXTENSION ||
                          structure.structureType == STRUCTURE_SPAWN ||
                          structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
              }
      }); // TARGETS
      if(targets.length > 0) {
          if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
      } // if targets.length
    } // ELSE

  }, // MAIN
  spawn: function(spawn_name, length) {
      var newName = 'Harvester' + Game.time;
      Game.spawns[spawn_name].spawnCreep([WORK,CARRY,MOVE], newName, // TODO 'Spawn1' HARDCODED
        {memory: {role: 'harvester', source: (Math.floor(Math.random() * length))}});
      } // loop
};









module.exports = harvesterV2;
