var harvesters = {
  spawn: (spawn_name) => {
    var name = 'harvester' + Game.time // TODO switch to UUID-Lib
    var components = [WORK,CARRY,MOVE]
    Game.spawns[spawn_name].spawnCreep(components, name, {memory: {role: 'harvester'}})
    for (var i = 0; i < Memory.colonies.length; i++) {
      for (var j = 0; j < Memory.colonies[i].spawns.length; j++) {
        if (Memory.colonies[i].spawns[j].name === spawn_name) {
          let creep = []
          creep.name = name
          creep.level = 1
          creep.role = 'harvester'
          creep.push(Memory.colonies[i].creeps)
        }
      }
    }

  },
  run: (creep, room_name) => {
      if(creep.carry.energy < creep.carryCapacity) {
          // TODO Pass in room name!
            //var sources = Memory.rooms.room_name.sources
            var sources = creep.room.find(FIND_SOURCES);

            //if(creep.harvest(Memory.rooms.room_name.sources[0]) == ERR_NOT_IN_RANGE) {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(Memory.rooms.room_name.sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        } // if creep has room for energy
        else {

            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } // if targets.length
        } //else
    }
}

module.exports = harvesters
